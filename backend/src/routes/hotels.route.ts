import express from 'express';

const router = express.Router();

import { getSearchedHotels } from '../controllers/hotels.controller';

router.get('/search', getSearchedHotels);

export default router;
