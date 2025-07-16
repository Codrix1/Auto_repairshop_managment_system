import { Request, Response } from 'express';
import Car from '../models/Car';
import Customer from '../models/Customer';


// Create a new car (linked to a customer)
export const createCar = async (req: Request, res: Response) => {
  try {
    const { customer, car } = req.body;

    // Error validation for required fields
    if (
      !customer ||
      !customer.name ||
      !customer.phone
    ) {
      return res.status(400).json({ error: "Customer name and phone are required." });
    }

    if (
      !car ||
      typeof car !== "object" ||
      !car.carName ||
      !car.carModel ||
      !car.licensePlate ||
      !car.carColor ||
      car.mileage === undefined
    ) {
      return res.status(400).json({
        error:
          "Car details are required: carName, carModel, licensePlate, carColor, and mileage.",
      });
    }

    // Validate mileage is a number
    if (typeof car.mileage !== "number" || isNaN(car.mileage)) {
      return res.status(400).json({ error: "Mileage must be a valid number." });
    }

    // Validate customer
    let existingCustomer = await Customer.findOne({
      $or: [
        { customerName: customer.name },
        { customerPhone: customer.phone },
      ].filter(Boolean),
    });

    if (!existingCustomer) {
      existingCustomer = await Customer.create({
        customerName: customer.name,
        customerPhone: customer.phone,
      });
    }
    const newCar = await Car.create({
      customerId: existingCustomer._id,
      carName: car.carName,
      carModel: car.carModel,
      licensePlate: car.licensePlate,
      carColor: car.carColor,
      mileage: car.mileage,
      entryDate: Date.now(),
    });

    res.status(201).json(newCar);
  } catch (err: any) {
    res.status(400).json({ error: "Failed to create car", message: err.message });
    return;
  }
};

// Get all cars
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find().populate('customerId', 'customerName customerPhone');
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars', details: err });
  }
};

// Get all cars for a customer
export const getAllCarsForCustomer = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find({customerId: req.params.customerid}).populate('customerId', 'customerName customerPhone');
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars', details: err });
  }
};

// Get single car by ID
export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id).populate('customerId', 'customerName customerPhone');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car', details: err });
  }
};

// Update car
export const updateCar = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.body;

    // Optional: validate new customerId if provided
    if (customerId) {
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      req.body.customerName = customer.customerName;
      req.body.phone = customer.customerPhone;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update car', details: err });
  }
};

// Delete car
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete car', details: err });
  }
};
