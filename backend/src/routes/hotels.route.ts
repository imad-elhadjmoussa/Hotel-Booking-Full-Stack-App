import express from 'express';

const router = express.Router();

import { getHotelById, getHotels, getSearchedHotels } from '../controllers/hotels.controller';

router.get('/search', getSearchedHotels);
router.get('/:id', getHotelById);
router.get('/', getHotels);

export default router;
