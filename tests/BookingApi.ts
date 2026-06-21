import { APIRequestContext, expect } from "@playwright/test";

export class BookingApi {

    private readonly request: APIRequestContext;
    private readonly bookingUrl = "https://restful-booker.herokuapp.com/booking";
    private readonly authUrl = "https://restful-booker.herokuapp.com/auth";
    private readonly authData = {
        "username": "admin",
        "password": "password123"
    }
    private token = "";

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async auth(): Promise<void> {
        const response = await this.request.post(this.authUrl, { data: this.authData });
        expect(response.status()).toBe(200);
        this.token = (await response.json()).token;
    }

    async getBooking(id: number): Promise<Booking> {
        const response = await this.request.get(`${this.bookingUrl}/${id}`);
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async createBooking(data: Booking): Promise<{ bookingid: number, booking: Booking }> {
        const response = await this.request.post(this.bookingUrl, { data });
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async updateBooking(id: number, data: Booking): Promise<Booking> {
        if (!this.token) {
            throw new Error("Please call auth() first");
        }
        const response = await this.request.put(`${this.bookingUrl}/${id}`, {
            data, headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${this.token}`,
            }
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }
}