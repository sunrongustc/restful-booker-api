import { Booking } from "../types/Booking"

  export const MYBOOK:Booking = {
    firstname: 'Tina',
    lastname: 'Sun',
    totalprice: 234,
    depositpaid: true,
    bookingdates: { checkin: '2026-06-10', checkout: '2026-06-17' }
  } 

    export const MYBOOK_FOR_UPDATE:Booking = {
    firstname: 'Max',
    lastname: 'Sun',
    totalprice: 999,
    depositpaid: true,
    bookingdates: { checkin: '2026-06-10', checkout: '2026-06-17' }
  } 

