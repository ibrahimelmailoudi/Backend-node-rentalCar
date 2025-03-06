import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createReservation = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate, totalAmount } = req.body;

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        carId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'Pending',
        totalAmount,
      },
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await prisma.reservation.findMany({
      where: { userId },
    });

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: 'Reservations not found' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;  // Use reservationId
    const { status, startDate, endDate, totalAmount } = req.body;

    const reservation = await prisma.reservation.update({
      where: { id: reservationId },  // Use reservationId
      data: { status, startDate: new Date(startDate), endDate: new Date(endDate), totalAmount },
    });

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;  // Use reservationId

    await prisma.reservation.delete({
      where: { id: reservationId },  // Use reservationId
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
