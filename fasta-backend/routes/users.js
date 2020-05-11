const express = require("express");

const router = express.Router();
const User = require("../models/index.js");
const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");


router.post('/', (req, res)=>{
  const { fullname, email, password, phonenumber} = req.body;

  //validation
  if(!fullname ||!email || !password || !phonenumber) {
      return res.status(400).json({msg: 'please enter all field'});       
  }

//check for exixting user
User.findOne({ email})
  .then(user => {
      if(user) return res.status(400).json({msg: 'User already exists'});

      const newUser = new User({
          fullname,
          email,
          password,
          phonenumber
          
      });
      // create salt hash
      bcrypt.genSalt(10, (err, salt) =>{
          bcrypt.hash(newUser.password, salt, (err, hash) =>{
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                  .then(user =>{
                      res.json({
                          user:{
                              id:user.id,
                              fullname:user.fullname,
                              email:user.email,
                              phonenumber : user.phonenumber
                          }
                      });
                  });
          })
      })
  })
})


module.exports = router;
