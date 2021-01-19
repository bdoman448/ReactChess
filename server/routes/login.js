const express = require('express');
const router = express.Router()
const User = require('../models/User') 

router.get('/', async (req, res) => {
  try 
  {    
      let users = null;
      users = await User.findOne({username:req.body.user.username});

      console.log(users)
      if(users && users.password === req.body.user.password) {
        res.json(users);
      }
      else 
        throw "Wrong Password or Username"

  }catch(err) {
      res.status(500).send(err);
  }
});


module.exports = router;

