const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const { resourceError, serverError } = require('../utils/error');
const registrationValidator = require('../validator/auth/registrationValidator');
const logInValidator = require('../validator/auth/logInvalidator');
const User = require('../model/User');


exports.userRegistrationPostController = async (req, res) => {
  const { name, email, password, profession } = req.body;

  const validation = registrationValidator({ name, email, password, profession })

  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }
  try {
    const user = await User.findOne({ email })

    if (!user) {
      bcrypt.hash(password, 12, async (err, hash) => {
        if (err) {
          return serverError(res, err)
        }

        let registerUser = new User({
          name,
          email,
          password: hash,
          profession,
          todo_work: []
        })

        await registerUser.save()
        res.status(200).json({
          msg: "User created successfully",
          registerUser
        })
      })
    } else {
      resourceError(res, "Email already exist")
    }

  } catch (error) {
    serverError(res, error)
  }
}

exports.userlogInPostController = async (req, res) => {
  const { email, password } = req.body;
  const validation = logInValidator({ email, password })

  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }
  
  try {
    const user = await User.findOne({email})

    if(!user) {
      resourceError(res, "User not found")
    }else {
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) {
          return serverError(res, err)
        }
        if(!result) {
          return resourceError(res, "Incorrect password")
        }

        const token = jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
          todo_work: user.todo_work
        }, config.get("secret"), { expiresIn: "10h" })

        res.status(200).json({
          Message: "Login successfully",
          token: `Bearer ${token}`
        })
      })
    }

  } catch (error) {
    serverError(res, error)
  }
}