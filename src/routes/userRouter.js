const express = require("express");
const router = express();
const bcrypt = require("bcryptjs");
const userController = require("../controller/userController");
router.post("", async (req, res) => {
  try {
    var ctrlResponse = await userController.createUser(req);
    console.log("ctrlResponse", ctrlResponse);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("req.body", req.body);
    var ctrlResponse = await userController.loginUser(req);
    console.log("ctrlResponse", ctrlResponse);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

router.get("", async (req, res) => {
  try {
    var ctrlResponse = await userController.getUser();
    console.log("ctrlResponse", ctrlResponse);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    var ctrlResponse = await userController.getUserById(req);
    console.log("ctrlResponse", ctrlResponse);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    var ctrlResponse = await userController.updateUser(req);
    console.log("ctrlResponse", ctrlResponse);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var ctrlResponse = await userController.deleteUser(req);
    console.log("ctrlResponse", ctrlResponse);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
