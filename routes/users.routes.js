const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const User = require("../models/User.model");

const read = (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      messaage: 'Invalid user id'
    });
  }
  User.findById(userId)
    .exec((err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'User not found: ' + err.message
        });
      }
      if (!user) {
        return res.status(400).json({
          message: 'Invalid user id: ' + userId
        });
      }
     
      let usr = {};
      usr._id = user._id;  
      usr.name = user.name;
      usr.email = user.email;
      usr.birthDates = user.birthDate;
      usr.address = user.address;
      return res.status(200).json(usr); 
    });
}

// router.get("/:id", (req, res, next) => {
//   res.json({ mensaje: "estoy en users" });
// });

router.get("/getusers", (req, res, next) => {
  // const { id, name, email, birthDate, address } = req.body;
  User.find()
    .then(user => {
      console.log(user.data)
      return res.status(200).json(user).stringify({
        message: 'OK'
     
      });
      
    })
    .then(user => {
      return res.user.data.json()
    })
    .catch(error => {
      return res.status(500).json({
        message: "Something went wrong"
      });
    });
});

router.post("/createUsers", (req, res, next) => {
  const { id, name, email, birthDate, address } = req.body;

  const newUser = new User({
    id,
    name,
    email,
    birthDate,
    address
  });

  newUser
    .save()
    .then(user => {
      return res.status(201).json({
        message: "CREATED"
      });
    })
    .catch(error => {
      return res.status(405).json({
        message: "Invalid input"
      });
    });
});

router.get("/getusersById/:id", (req, res, next) => {
  const { id } = req.params;
  User
    .findById(id)
    .then(user => {
      return res.status(200).json( {
        message: "OK"
      });
    })
    .catch(error =>
      res.status(400).json({
        message: "Invalid user id"
      })
    )
    .catch(error =>
      res.status(404).json({
        message: "User not found"
      })
    );
});

router.put("/updateUsersById/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then(() => {
      return res.status(200).json({
        message: "OK"
      });
    })
    .catch(error =>
      res.status(400).json({
        message: "Invalid user id"
      })
    )
    .catch(error =>
      res.status(404).json({
        message: "User not found"
      })
    );
});

router.delete("/deleteUsersById/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() =>
      res.status(200).json({
        message: "OK"
      })
    )
    .catch(error =>
      res.status(400).json({
        message: "Invalid user id"
      })
    )
    .catch(error =>
      res.status(404).json({
        message: "User not found"
      })
    );
});

module.exports = router;
