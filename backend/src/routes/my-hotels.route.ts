import express from 'express';
import { getMyHotels, createHotel, getHotel, updateHotel, deleteHotel } from '../controllers/my-hotels.controller';
import { validateHotel } from '../validations/my-hotels.validation';
import verifyToken from '../middlewares/verifyToken';
import upload from '../middlewares/multer';

const router = express.Router();



// Route to get all hotels for the authenticated user
router.get('/', verifyToken, getMyHotels);
// Route to get a specific hotel by ID for the authenticated user
router.get('/:id', verifyToken, getHotel);
// Route to create a new hotel for the authenticated user
router.post('/', verifyToken, upload.array('images', 6), validateHotel, createHotel);
// Route to update a hotel by ID for the authenticated user
router.put('/:id', verifyToken, upload.array('images', 6), updateHotel);
// Route to delete a hotel by ID for the authenticated user
router.delete('/:id', verifyToken, deleteHotel);


export default router;
