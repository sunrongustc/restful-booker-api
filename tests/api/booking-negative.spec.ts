import { test, expect } from '@playwright/test';
import { BookingApi } from '../../api/BookingApi';
import { MYBOOK, MYBOOK_FOR_UPDATE } from '../../data/booking.data';

test('non-existent booking', async ({ request }) => {
    const bookingApi = new BookingApi(request);
    const bookingid = 9999999;
    const statusCode = await bookingApi.getBookingStatusCode(bookingid);
    expect(statusCode).toBe(404);
});

test('delete booking twice', async ({ request }) => {
    const bookingApi = new BookingApi(request);
    await bookingApi.auth();

    const dataFromCreate = await bookingApi.createBooking(MYBOOK);
    const bookingid = dataFromCreate.bookingid;
    expect(typeof bookingid).toBe("number");
    expect(dataFromCreate.booking).toMatchObject(MYBOOK);

    expect(await bookingApi.deleteBooking(bookingid)).toBe("Created");
    expect(await bookingApi.deleteBookingStatusCode(bookingid)).toBe(405);
});

test('update booking that was deleted ', async ({ request }) => {
    const bookingApi = new BookingApi(request);
    await bookingApi.auth();

    const dataFromCreate = await bookingApi.createBooking(MYBOOK);
    const bookingid = dataFromCreate.bookingid;
    expect(typeof bookingid).toBe("number");
    expect(dataFromCreate.booking).toMatchObject(MYBOOK);
    expect(await bookingApi.deleteBooking(bookingid)).toBe("Created");

    expect(await bookingApi.updateBookingStatusCode(bookingid, MYBOOK_FOR_UPDATE)).toBe(405);
});

test.only('update without login', async ({ request }) => {
    const bookingApi = new BookingApi(request);
    await bookingApi.auth();

    const dataFromCreate = await bookingApi.createBooking(MYBOOK);
    const bookingid = dataFromCreate.bookingid;
    expect(typeof bookingid).toBe("number");
    expect(dataFromCreate.booking).toMatchObject(MYBOOK);
    expect(await bookingApi.deleteBooking(bookingid)).toBe("Created");

    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        data: MYBOOK_FOR_UPDATE, headers: {}
    });
    expect(updateResponse.status()).toBe(403);
});