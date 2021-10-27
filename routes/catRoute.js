'use strict';
// catRoute
const express = require('express');
const { cat_list_get } = require('../controllers/catController');
const { cats } = require('../models/catModel');
const router = express.Router();

router.get('/', cat_list_get);
  
router.get('/:id', (req, res) => {
    res.send('You requested a cat whose id is ' + req.params.id);
  });
  
router.post('/', (req, res) => {
    res.send('From this endpoint you can add cats.');
  });
  
router.put('/', (req, res) => {
    res.send('From this endpoint you can modify cats.');
  });
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete cats.');
  });

const cat_get = (req, res) => {
    // lähetä yksi kissa
    req.json({});
};

// TODO tee funktio, joka palauttaa yhden kissan id:n perusteella
const getCat = () => {
    return 'Yks katti';
}

module.exports =  router