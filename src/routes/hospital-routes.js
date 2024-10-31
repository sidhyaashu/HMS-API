import express from 'express';
import  findNearbyHospitals  from '../controllers/hospital-locator-controller.js';

const router = express.Router();

router.get('/nearby', findNearbyHospitals);

export default router;
