import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationsByUserId,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController.js';

const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.get('/reservations/:userId', getReservationsByUserId);
router.put('/reservations/:reservationId', updateReservation);  // Use reservationId
router.delete('/reservations/:reservationId', deleteReservation);  // Use reservationId

export default router;
