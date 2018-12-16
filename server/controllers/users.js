const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (exception) {
    console.warn({ ...exception });
    if (exception.name === 'ValidationError') {
      const errorMessages = Object.keys(exception.errors).map(
        field => exception.errors[field].message
      );
      return response.status(422).json({ errors: errorMessages });
    }
    return response
      .status(500)
      .json({ error: 'Something went wrong when creating a user.' });
  }
});

userRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json(users);
  } catch (exception) {
    console.warn(exception);
    return response
      .status(500)
      .json({ error: 'Something went wrong when fetching all users.' });
  }
});

module.exports = userRouter;
