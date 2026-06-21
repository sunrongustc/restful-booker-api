import { test, expect } from '@playwright/test';
import { MYBOOK, MYBOOK_FOR_UPDATE } from '../../data/booking.data';
import { BookingApi } from '../../api/BookingApi';

test('get a booking', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  const bookingid = 1;

  const response = await bookingApi.getBooking(bookingid);
  expect(response).toBeOK();

  const data = await response.json()

  expect(data).toMatchObject({
    firstname: expect.any(String),
    lastname: expect.any(String)
  })
});


test('create a booking', async ({ request }) => {
  const bookingApi = new BookingApi(request);

  const responseFromCreate = await bookingApi.createBooking(MYBOOK);
  await expect(responseFromCreate).toBeOK();

  const dataFromCreate = await responseFromCreate.json();
  expect(dataFromCreate.bookingid).toEqual(expect.any(Number));
  expect(dataFromCreate.booking).toMatchObject(MYBOOK);

  const bookingid = dataFromCreate.bookingid;
  const responseFromGet = await bookingApi.getBooking(bookingid);
  await expect(responseFromGet).toBeOK();

  const dataFromGet = await responseFromGet.json();
  expect(dataFromGet).toMatchObject(MYBOOK);
});


test('update a booking', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  const token = await bookingApi.auth();
  bookingApi.setToken(token);

  const responseFromCreate = await bookingApi.createBooking(MYBOOK);
  await expect(responseFromCreate).toBeOK();

  const dataFromCreate = await responseFromCreate.json();
  expect(dataFromCreate.booking).toMatchObject(MYBOOK);
  expect(dataFromCreate.bookingid).toEqual(expect.any(Number));

  const bookingid = dataFromCreate.bookingid;
  const responseFromUpdate = await bookingApi.updateBooking(bookingid, MYBOOK_FOR_UPDATE);
  await expect(responseFromUpdate).toBeOK();

  const dataFromUpdate = await responseFromUpdate.json();
  expect(dataFromUpdate).toMatchObject(MYBOOK_FOR_UPDATE);

  const responseFromGet = await bookingApi.getBooking(bookingid);
  await expect(responseFromGet).toBeOK();

  const dataFromGet = await responseFromGet.json();
  expect(dataFromGet).toMatchObject(MYBOOK_FOR_UPDATE);
});


test('delete a booking', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  const token = await bookingApi.auth();
  bookingApi.setToken(token);

  const responseFromCreate = await bookingApi.createBooking(MYBOOK);
  await expect(responseFromCreate).toBeOK();

  const dataFromCreate = await responseFromCreate.json();
  expect(dataFromCreate.booking).toMatchObject(MYBOOK);
  expect(dataFromCreate.bookingid).toEqual(expect.any(Number));

  const bookingid = dataFromCreate.bookingid;
  const responseFromDelete = await bookingApi.deleteBooking(bookingid);
  await expect(responseFromDelete).toBeOK();

  const responseFromGet = await bookingApi.getBooking(bookingid);
  expect(responseFromGet.status()).toBe(404);
});