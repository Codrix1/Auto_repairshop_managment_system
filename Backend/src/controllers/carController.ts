import { Request, Response } from 'express';
import Car from '../models/Car';
import Customer from '../models/Customer';


// Create a new car (linked to a customer)
export const createCar = async (req: Request, res: Response) => {
  try {
    const {
      customer,
      car
    } = req.body;

    // Validate customer
    const newCustomer = await Customer.findOne({$or:[{name:customer.name}, {phone:customer.phoneNumber}].filter(Boolean)});
    if (!customer) {
        const newCustomer = Customer.create(
        {
            name:customer.name,
            phone: customer.phone,
        })
    }
    

    const newCar = await Car.create({
      customerId:customer.id,
      customerName: customer.name,
      phone: customer.phone,
      carType: car.carType,
      carModel: car.carModel,
      carNumber: car.licensePlate,
      carColor: car.carColor,
      mileage: car.mileage,
      entryDate: Date.now(),
    });

    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create car', details: err });
  }
};

// Get all cars (with customer info optionally populated)
export const getAllCars = async (_req: Request, res: Response) => {
  try {
    const cars = await Car.find().populate('customerId', 'name phone email');
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars', details: err });
  }
};

// Get single car by ID
export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id).populate('customerId', 'name phone email');
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
      req.body.customerName = customer.name;
      req.body.phone = customer.phone;
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
