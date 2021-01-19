const express = require('express');
const router = express.Router()
const User = require('../models/User') 


router.get('/', async (req, res) => {
  try 
  {    const users = await User.find();
       res.json(users);
  }catch(err) {
      res.json({message: err});
  }
});

router.post('/', async (req, res) => {
  try 
  {    
      console.log(req.body.user.username)
      const exists = await User.findOne({username:req.body.user.username});

      const user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: req.body.user.password,
        wins: req.body.user.wins
      })

      if(!exists){
        user.save()
        .then(data => {res.json(data)})
        .catch(err => {res.json({message: err})})}
      else
        throw "User Exists"
      
  }catch(err) {
      console.log('UPA U CATHC', err)
      res.json({message: err});
  }
});

module.exports = router;