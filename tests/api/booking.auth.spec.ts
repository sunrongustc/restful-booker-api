import { test, expect } from '@playwright/test';
import { BookingApi } from '../../api/BookingApi';
import { MYBOOK, MYBOOK_FOR_UPDATE } from '../../data/booking.data';


test('update without authentication', async ({ request }) => {
    const bookingApi = new BookingApi(request);

    const responseFromCreate = await bookingApi.createBooking(MYBOOK);
    await expect(responseFromCreate).toBeOK();

    const dataFromCreate = await responseFromCreate.json();
    const bookingid = dataFromCreate.bookingid;
    expect(bookingid).toEqual(expect.any(Number));

    const responseFromUpdate = await bookingApi.updateBooking(bookingid, MYBOOK_FOR_UPDATE);
    expect(responseFromUpdate.status()).toBe(403);
});


test('delete without authentication', async ({ request }) => {
    const bookingApi = new BookingApi(request);
    const responseFromCreate = await bookingApi.createBooking(MYBOOK);
    await expect(responseFromCreate).toBeOK();

    const dataFromCreate = await responseFromCreate.json();
    const bookingid = dataFromCreate.bookingid;
    expect(bookingid).toEqual(expect.any(Number));

    const responseFromDelete = await bookingApi.deleteBooking(bookingid);
    expect(responseFromDelete.status()).toBe(403);
});