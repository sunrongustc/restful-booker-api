import { test, expect } from '@playwright/test';
import { BookingApi } from '../../api/BookingApi';
import { MYBOOK, MYBOOK_FOR_UPDATE } from '../../data/booking.data';


test.describe('Booking API - Negative', () => {

    test('@negative @regression get an non-existent booking', async ({ request }) => {
        const bookingApi = new BookingApi(request);
        // -1 will never be a valid bookingid
        const bookingid = -1;
        const responseFromGet = await bookingApi.getBooking(bookingid);
        expect(responseFromGet.status()).toBe(404);
    });

    test('@negative @regression delete a booking twice', async ({ request }) => {
        const bookingApi = new BookingApi(request);
        const token = await bookingApi.auth();
        bookingApi.setToken(token);

        const responseFromCreate = await bookingApi.createBooking(MYBOOK);
        await expect(responseFromCreate).toBeOK();
        const dataFromCreate = await responseFromCreate.json();

        const bookingid = dataFromCreate.bookingid;
        expect(bookingid).toEqual(expect.any(Number));
        expect(dataFromCreate.booking).toMatchObject(MYBOOK);

        const responseFromDelete_1 = await bookingApi.deleteBooking(bookingid);
        await expect(responseFromDelete_1).toBeOK();

        //Verify the booking is deleted before testing further operations
        const responseFromGet = await bookingApi.getBooking(bookingid);
        expect(responseFromGet.status()).toBe(404);

        const responseFromDelete_2 = await bookingApi.deleteBooking(bookingid);
        expect(responseFromDelete_2.status()).toBe(405);
    });

    test('@negative @regression update a deleted booking', async ({ request }) => {
        const bookingApi = new BookingApi(request);
        const token = await bookingApi.auth();
        bookingApi.setToken(token);

        const responseFromCreate = await bookingApi.createBooking(MYBOOK);
        await expect(responseFromCreate).toBeOK();
        const dataFromCreate = await responseFromCreate.json();

        const bookingid = dataFromCreate.bookingid;
        expect(bookingid).toEqual(expect.any(Number));
        expect(dataFromCreate.booking).toMatchObject(MYBOOK);

        const responseFromDelete = await bookingApi.deleteBooking(bookingid);
        await expect(responseFromDelete).toBeOK();
        //Verify the booking is deleted before testing further operations
        const responseFromGet = await bookingApi.getBooking(bookingid);
        expect(responseFromGet.status()).toBe(404);

        const responseFromUpdate = await bookingApi.updateBooking(bookingid, MYBOOK_FOR_UPDATE);
        expect(responseFromUpdate.status()).toBe(405);
    });
})