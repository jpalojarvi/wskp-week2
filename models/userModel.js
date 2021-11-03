'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute('SELECT user_id, name, email, role FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    httpError('Database error', 500);
  }
};

const getUser = async (id, next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.execute('SELECT user_id, name, email, role FROM wop_user WHERE user_id= ?', [id]);
    return rows;
  } catch (e) {
    console.error('getUser error', e.message);
    httpError('Database error', 500);
  }
};

module.exports = {
  getAllUsers,
  getUser
};
