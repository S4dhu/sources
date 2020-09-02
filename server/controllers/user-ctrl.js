const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const regex = new RegExp(["^", username, "$"].join(""), "i");
    let user = await User.findOne({ username: regex }) || await User.findOne({ email: regex })
    if (!user)
      return res.status(400).json({
        message: "Incorrect username or password"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect username or password"
      });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
  );
} catch (e) {
  console.error(e);
  res.status(500).json({
    message: "Server Error"
  });
}
}

const signup = async (req, res) => {
const {
  username,
  email,
  password
} = req.body;
try {
  let user = await User.findOne({ username })
  if (user) {
    return res.status(400).json({
      type: 'username',
      message: "Username already exists"
    });
  }
  let userEmail = await User.findOne({ email })
  if (userEmail) {
    return res.status(400).json({
      type: 'email',
      message: "Email already exists"
    })
  }

  user = new User({
    username,
    email,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    "randomString", {
      expiresIn: 10000
    },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({
        token
      });
    }
  );
} catch (err) {
  console.log(err.message);
  res.status(500).send("Error in Saving");
}
}

const getById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

module.exports = {
    signin,
    signup,
    getById,
};