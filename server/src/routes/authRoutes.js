// const express = require('express');
import express from 'express'
// const { register, login } = require('../controllers/authController');
// const {register,login}

import { register,login, getUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/get" , getUsers)
export default router;
