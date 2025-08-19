import express from 'express';
import { createBooking, getMyBookings } from '../controllers/booking.controller';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();



router.post('/', verifyToken, createBooking);
router.get("/my-bookings", verifyToken, getMyBookings);


export default router;
