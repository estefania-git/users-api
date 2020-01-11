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
    zip = "e"
  } = req.body;

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
  });

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

router.put("/updateUserById/:id", (req, res, next) => {
  const _id = req.params.id;
  const new_user = req.body.user;
  const new_address = req.body.address;

  // HELPER FUNCTIONS
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
  }

  // USER DATA
  if (!isEmpty(new_user)) {
    clean(new_user);
    console.log(new_user);
    User.findByIdAndUpdate(_id, { ...new_user })
      .then(user => {
        console.log("entro");
        res.status(201).json({ user, message: "USER UPDATED" });
      })
      .catch(error => {
        console.log("entro");
        res.status(405).json({
          message: `There was an error while creating USER: ${error}`
        });
      });
  }

  // ADDRESS DATA
  if (!isEmpty(new_address)) {
    clean(new_address);
    console.log(new_address);
    Address.findByIdAndUpdate(_id, { ...new_address })
      .then(address => {
        console.log("entro");
        res.status(201).json({ address, message: "ADDRESS UPDATED" });
      })
      .catch(error => {
        console.log("entro");
        res.status(405).json({
          message: `There was an error while creating ADDRESS: ${error}`
        });
      });
  }

  // const user_keys = ["name", "email", "birthDate"];
  // const address_keys = ["street", "state", "city", "country", "zip"];
  // { name: 'algo'}

  // User.findById(_id).then(user => {
  //   Object.keys(new_user).forEach(key => {
  //     if (user_keys.includes()) {
  //     }

  //     if (key in address_keys) {
  //       Address.findByIdAndUpdate(user.address, address_key)
  //         .then(user => {
  //           return res
  //             .status(201)
  //             .json(user)
  //             .stringify({
  //               message: "ADDRESS UPDATED"
  //             });
  //         })
  //         .catch(error => {
  //           return res.status(405).json({
  //             message: `There was an error while updating ADDRESS: ${error}`
  //           });
  //         });
  //     }
  //   });
  // });
});

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
