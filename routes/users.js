const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/User");
const Address = require("../models/Address");

router.get("/getUsers", (req, res, next) => {
  User.find()
    .populate("address")
    .then(user => {
      console.log(user.data);
      return res
        .status(200)
        .json(user)
        .stringify({
          message: "OK"
        });
    })
    .catch(error => {
      return res.status(500).json({
        message: "Something went wrong"
      });
    });
});

router.post("/createUser", (req, res, next) => {
  const {
    _id = 2,
    name = "Manuela",
    email = "manuela@hotmail.com",
    birthDate = new Date(1995, 08, 22),
    street = "a",
    state = "b",
    city = "c",
    country = "d",
    zip = "e"} = req.body;

  const newUser = new User({
    _id,
    name,
    email,
    birthDate,
    address: _id
  });

  newUser
    .save()
    .then(user => {
      return res
        .status(201)
        .json(user)
        .stringify({
          message: "USER CREATED"
        });
    })
    .catch(error => {
      return res.status(405).json({
        message: `There was an error while creating USER: ${error}`
      });
    });


  const newAddress = new Address({
    _id,
    street,
    state,
    city,
    country,
    zip
  })

  newAddress
    .save()
    .then(address => {
      return res
        .status(201)
        .json(address)
        .stringify({
          message: "ADDRESS CREATED"
        });
    })
    .catch(error => {
      return res.status(405).json({
        message: `There was an error while creating ADDRESS: ${error}`
      });
    });
});

router.get("/getuserById/:id", (req, res, next) => {
  const _id = req.params.id;
  User.findById(_id)
    .populate("address")
    .then(user => {
      return res
        .status(200)
        .json(user)
        .stringify({
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

// router.put("/updateUserById/:id", (req, res, next) => { 
//   const _id = req.params.id;
//   const new_user = req.body.user

//   const user_keys = ['name', 'email', 'birthDate']
//   const address_keys = ['street', 'state', 'city', 'country', 'zip']

  
//   function retrieveAddressId(id, callback) {
//     User.find(id, {'_id': 0, 'address': 1}, function(err, users) {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, users[0]);
//       }
//     });
//   };

//   retrieveAddressId(_id, function(err, user) {
//     if (err) {
//       console.log(err);
//     }
  
//     console.log(`holaaaaaaa ${user}`)
//   });

//   // let a = async User.findById(_id)
//   //   .select('address')
//   //   .exec(function(err, order) {
//   //     return order.address
//   //   });

//   // console.log(`holaaaaa ${a}`)


//   Object.keys(new_user).forEach( key => {
//     if (key in user_keys) {
//       User.findByIdAndUpdate(_id, key)
//       .then(user => {
//         return res
//           .status(201)
//           .json(user)
//           .stringify({
//             message: "USER UPDATED"
//           });
//       })
//       .catch(error => {
//         return res.status(405).json({
//           message: `There was an error while creating USER: ${error}`
//         })
//       });
//     }

//     if (key in address_keys) {
//       Address.findByIdAndUpdate(_address_id, key)
//       .then(user => {
//         return res
//           .status(201)
//           .json(user)
//           .stringify({
//             message: "ADDRESS UPDATED"
//           })
//       })
//       .catch(error => {
//         return res.status(405).json({
//           message: `There was an error while updating ADDRESS: ${error}`
//         });
//       })
//     }
//   })
// })

router.delete("/deleteUserById/:id", (req, res, next) => {
  const _id = req.params.id;
  User.findByIdAndDelete(_id)
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
