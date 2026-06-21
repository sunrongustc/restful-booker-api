import { APIRequestContext, APIResponse, expect } from "@playwright/test";

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

    setToken(token: string): void {
        this.token = token;
    }

    async auth(): Promise<string> {
        const response = await this.request.post(this.authUrl, { data: this.authData });
        await expect(response).toBeOK();
        return (await response.json()).token;
    }

    async getBooking(id: number): Promise<APIResponse> {
        return await this.request.get(`${this.bookingUrl}/${id}`);
    }

    async createBooking(data: Booking): Promise<APIResponse> {
        return await this.request.post(this.bookingUrl, { data });
    }

    async updateBooking(id: number, data: Booking): Promise<APIResponse> {
        return await this.request.put(`${this.bookingUrl}/${id}`, {
            data, headers: {
                "Cookie": `token=${this.token}`,
            }
        });
    }

    async deleteBooking(id: number): Promise<APIResponse> {
        return await this.request.delete(`${this.bookingUrl}/${id}`, {
            headers: {
                "Cookie": `token=${this.token}`,
            }
        });
    }
}