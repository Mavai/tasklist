const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const user = await User.findOne({ username: body.username });
    const passWordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passWordCorrect)) {
      return response
        .status(401)
        .json({ error: 'Invalid username or password.' });
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);
    response.status(200).json({ token });
  } catch (exception) {
    console.warn(exception);
  }
});

module.exports = loginRouter;
