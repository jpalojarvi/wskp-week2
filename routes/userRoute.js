'use strict';
// userRoute
const express = require('express');
const { user_list_get, user_get } = require('../controllers/userController');
const { users } = require('../models/userModel');
const router = express.Router();

router.get('/', user_list_get);
  
router.get('/:id', user_get);
  
router.post('/', (req, res) => {
    res.send('From this endpoint you can add users.');
  });
  
router.put('/', (req, res) => {
    res.send('From this endpoint you can modify users.');
  });
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete users.');
  });

module.exports =  router