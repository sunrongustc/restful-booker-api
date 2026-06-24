import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { Booking } from "../types/Booking";

export class BookingApi {

    private readonly bookingUrl = `${process.env.BASE_URL}/booking`;
    private readonly authUrl = `${process.env.BASE_URL}/auth`;
    private readonly authData = {
        "username": process.env.BOOKING_USER ?? "admin",
        "password": process.env.BOOKING_PASSWORD ?? "password123"
    }

    //Token must be set via setToken() after calling auth()
    //Token used by updateBooking & deleteBooking  
    private token = "";

    constructor(private request: APIRequestContext) {
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