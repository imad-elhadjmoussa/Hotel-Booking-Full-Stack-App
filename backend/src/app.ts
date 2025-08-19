import express from 'express';
import connectDB from './lib/connectionDb';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
// Import routes
import usersRoute from './routes/users.route';
import authRoute from './routes/auth.route';
import myHotelsRoute from './routes/my-hotels.route';
import hotelsRoute from './routes/hotels.route';
import bookingRoute from './routes/booking.route';


const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist/")));

// Use routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/my-hotels', myHotelsRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/bookings', bookingRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
    connectDB();
});
