const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//get User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Register New User
// @access  Public

router.post('/', (req, res) => {
  const { email, password } = req.body;

  //simple validation if data present
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }
  //check if user already exist

      User.findOne({email})
        .then(user => {
          if(!user) return res.status(400).json({msg : "User DOESNT EXIST"});
          
          
          //Compare password and hash
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) return res.status(403).json({msg:"Invalid credentials"});
              jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: 7200},
                (err,token) => {
                  if (err) throw err;
                  res.json({
                    msg : "Successfully sign in here are your details",
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      password: user.password
                    }
                  }
                  )
                }
              )
              
            })
        })
});
//jwt sign give object of id, getjwstsecret, onbject of expiresin,callback witherr and token arrow function print error. res.json(token, object of user with id name and email)

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router