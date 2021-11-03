'use strict';
// userController
const userModel = require('../models/userModel');
const { httpError } = require('../utils/errors'); 

// const { get } = require('../routes/userRoute');

// const users = userModel.users;
const {getAllUsers , getUser} = userModel;

const user_list_get = async (req, res, next) => {
  try {
      // remove password from users
    const users = await getAllUsers(next);
    if (users.length > 0) {
      res.json(users);
    } else {
      next('No cats found', 404);
    }
  } catch (e) {
    console.log('user_list_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const user_get = async (req, res, next) => {
  try {
  const vastaus = await getUser(req.params.id, next);
  if (vastaus.length > 0) {
  res.json(vastaus);
  } else {
    next(httpError('No user found', 404));
  }
  } catch (e) {
    console.log('cat_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const user_post = (req, res) => {
  console.log(req.body);
  res.send('From this endpoint you can add users.');
};

module.exports = {
  user_list_get,
  user_get,
  user_post
};