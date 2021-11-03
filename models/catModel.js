'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getAllCats = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    httpError('Database error', 500);
  }
};

const getCat = async (id, next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id= ?', [id]);
    return rows;
  } catch (e) {
    console.error('getCat error', e.message);
    httpError('Database error', 500);
  }
};

module.exports = {
  getAllCats,
  getCat
};