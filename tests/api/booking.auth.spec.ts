import { test, expect } from '@playwright/test';
import { BookingApi } from '../../api/BookingApi';
import { MYBOOK, MYBOOK_FOR_UPDATE } from '../../data/booking.data';


test.describe('Booking API - Authentication', () => {

    test('@negative @regression update without authentication', async ({ request }) => {
        const bookingApi = new BookingApi(request);
        //Intentionally not set token to verify 403 response
        const responseFromCreate = await bookingApi.createBooking(MYBOOK);
        await expect(responseFromCreate).toBeOK();
        const dataFromCreate = await responseFromCreate.json();

        const bookingid = dataFromCreate.bookingid;
        expect(bookingid).toEqual(expect.any(Number));

        const responseFromUpdate = await bookingApi.updateBooking(bookingid, MYBOOK_FOR_UPDATE);
        expect(responseFromUpdate.status()).toBe(403);
    });


    test('@negative @regression delete without authentication', async ({ request }) => {
        const bookingApi = new BookingApi(request);
        //Intentionally not set token to verify 403 response
        const responseFromCreate = await bookingApi.createBooking(MYBOOK);
        await expect(responseFromCreate).toBeOK();
        const dataFromCreate = await responseFromCreate.json();

        const bookingid = dataFromCreate.bookingid;
        expect(bookingid).toEqual(expect.any(Number));

        const responseFromDelete = await bookingApi.deleteBooking(bookingid);
        expect(responseFromDelete.status()).toBe(403);
    });

})