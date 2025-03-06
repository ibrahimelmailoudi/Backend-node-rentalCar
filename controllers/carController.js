import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await prisma.car.findUnique({ where: { id } });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching car' });
  }
};

export const createCar = async (req, res) => {
  try {
    const newCar = await prisma.car.create({
      data: req.body,
    });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Error creating car' });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await prisma.car.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: 'Error updating car' });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.car.delete({ where: { id } });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting car' });
  }
};


// Function to get top cars
export const getTopCars = async (req, res) => {
    try {
      // Retrieve top cars from the database using Prisma
      const topCars = await prisma.car.findMany({ where: { isTop: true } });
      res.json(topCars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching top cars' });
    }
  };
  
  // Function to get recommended cars
  export const getRecommendedCars = async (req, res) => {
    try {
      // Retrieve recommended cars from the database using Prisma
      const recommendedCars = await prisma.car.findMany({ where: { isRecommended: true } });
      res.json(recommendedCars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recommended cars' });
    }
  };
  