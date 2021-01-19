const express = require('express');
const router = express.Router()
const User = require('../models/User') 


router.patch('/', async (req, res) => {
  try 
  {   
      const updatedUser = await User.updateOne({username:req.body.user.username}, {wins:req.body.user.wins})

      if(updatedUser) {
        res.json(updatedUser);
      }
      else 
        throw "Wrong Password or Username"

  }catch(err) {
      res.status(500).send(err);
  }
});

module.exports = router;

