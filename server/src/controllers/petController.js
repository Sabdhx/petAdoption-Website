// const Pet = require('../models/Pet');
import Pet from "../models/Pet.js";

export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pets' });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pet' });
  }
};

export const createPet = async (req, res) => {
  const { name, breed, age, description, image, adoptionStatus } = req.body;

  try {
    const pet = new Pet({ name, breed, age, description, image, adoptionStatus });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Error creating pet' });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Error updating pet' });
  }
};


export const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting pet' });
  }
};
