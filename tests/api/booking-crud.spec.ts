import { test, expect } from '@playwright/test';
import { MYBOOK, MYBOOK_FOR_UPDATE } from '../../data/booking.data';
import { BookingApi } from '../../api/BookingApi';

test('GET API', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  const bookingid = 1;
  const data = await bookingApi.getBooking(bookingid);

  expect(data.firstname).toBeTruthy();
  expect(typeof data.firstname).toBe("string");
  expect(data.lastname).toBeTruthy();
  expect(typeof data.lastname).toBe("string");
});


test('POST API', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  const dataFromPost = await bookingApi.createBooking(MYBOOK);

  expect(dataFromPost.booking).toMatchObject(MYBOOK);
  expect(dataFromPost.bookingid).toBeTruthy();
  expect(typeof dataFromPost.bookingid).toBe("number");

  const bookingid = dataFromPost.bookingid;
  const dataFromGet = await bookingApi.getBooking(bookingid);
  expect(dataFromGet.firstname).toBe(MYBOOK.firstname);
  expect(dataFromGet.lastname).toBe(MYBOOK.lastname);
});


test('UPDATE API', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  await bookingApi.auth();
 
  const dataFromPost = await bookingApi.createBooking(MYBOOK);
  expect(dataFromPost.booking).toMatchObject(MYBOOK);
  expect(dataFromPost.bookingid).toBeTruthy();
  expect(typeof dataFromPost.bookingid).toBe("number");

  const bookingid = dataFromPost.bookingid;

  const dataFromPut = await bookingApi.updateBooking(bookingid,MYBOOK_FOR_UPDATE);
  expect(dataFromPut).toMatchObject(MYBOOK_FOR_UPDATE);

  const dataFromGet = await bookingApi.getBooking(bookingid);
  expect(dataFromGet).toMatchObject(MYBOOK_FOR_UPDATE);
});

test.only('DELETE API', async ({ request }) => {
  const bookingApi = new BookingApi(request);
  await bookingApi.auth();
 
  const dataFromPost = await bookingApi.createBooking(MYBOOK);
  expect(dataFromPost.booking).toMatchObject(MYBOOK);
  expect(dataFromPost.bookingid).toBeTruthy();
  expect(typeof dataFromPost.bookingid).toBe("number");

  const bookingid = dataFromPost.bookingid;
  const dataFromDelete = await bookingApi.deleteBooking(bookingid);
  expect(dataFromDelete).toBe("Created");

  const statusCode = await bookingApi.getBookingStatusCode(bookingid);
  expect(statusCode).toBe(404);
});