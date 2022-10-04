const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

//1.Register user data
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, age, profession } = req.body;

  if (!name || !age || !profession) {
    res.status(422).json("Please fill the data");
  }

  try {
    const preuser = await users.findOne({ name: name });
    // console.log(preuser);

    if (preuser) {
      res.status(422).json("This Employee is already present");
    } else {
      const adduser = new users({
        name,
        age,
        profession,
      });

      await adduser.save();
      res.status(201).json(adduser);
      // console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

//2.Get user data

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    // console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//3.Get individual user information

router.get("/getuser/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    // console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//4.Update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//5.Delete user

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({ _id: id });

    // console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
