const express = require('express');
const router = express.Router()
const User = require('../models/User') 


router.get('/', async (req, res) => {
    try 
    {    
        let users = null;
        users = await User.findOne({username:req.body.user.username});

        if(users) {
          res.json(users.wins);
        }
        else 
          throw "Can't find user"
  
    }catch(err) {
        res.status(500).send(err);
    }
});
  




module.exports = router;

