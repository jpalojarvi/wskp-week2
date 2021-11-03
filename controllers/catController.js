'use strict';
// catController
const catModel = require('../models/catModel');
const { httpError } = require('../utils/errors');

// const { get } = require('../routes/catRoute');

// const cats = catModel.cats;
const {getAllCats , getCat} = catModel;

const cat_list_get = async (req, res, next) => {
  try { 
    const cats = await getAllCats(next);
    if(cats.length > 0) {
    res.json(cats);
    } else {
      next('No cats found', 404);
    }
  } catch (e) {
    console.log('cat_list_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_get = async (req, res, next) => {
  try {
  const vastaus = await getCat(req.params.id, next);
  if (vastaus.length > 0) {
  res.json(vastaus);
  } else {
    next(httpError('No cat found', 404));
    }
  } catch (e) {
    console.log('cat_get error', e.message);
    next(httpError('internal server error', 500));
  }
}

const cat_post = (req, res) => {
  console.log(req.body, req.file);
  res.send('From this endpoint you can add cats.');
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};