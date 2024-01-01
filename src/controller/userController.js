const userService = require("../services/userService");
const APIResponse = require("../../helper/APIResponse");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

class userController {
  async createUser(req) {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      let userData = await userService.createUser(req.body);
      console.log("userData", userData);
      return APIResponse.successCreateResponse("Registration Successfully");
    } catch (error) {
      var resobj = APIResponse.resObj(error.message);
      return APIResponse.failResponse("Exception", {}, resobj);
    }
  }

  async loginUser(req) {
    try {
      console.log("req.body", req.body);
      let userData = await userService.getUserByEmail(req.body);
      console.log("userData", userData);
      console.log("userData.1", userData.rows.length);
      if (userData.rows.length == 0) {
        console.log("if");
        return APIResponse.successGetResponse("Invalid email");
      } else {
        console.log("else");
        console.log("userData", userData.rows[0].password);
        var comparePassword = await bcrypt.compare(
          req.body.password,
          userData.rows[0].password
        );
        console.log("comparePassword", comparePassword);
        if (!comparePassword) {
          return APIResponse.successGetResponse("Invalid password");
        } else {
          console.log("process.env", userData.rows);
          const token = jwt.sign({ userData: userData }, process.env.secretKey);
          console.log("token", token);
          userData.rows[0].token = token;
          console.log("userData.rows", userData.rows);
          return APIResponse.successGetResponse(
            "Login Successfully",
            userData.rows[0],
            []
          );
        }
      }
    } catch (error) {
      var resobj = APIResponse.resObj(error.message);
      return APIResponse.failResponse("Exception", {}, resobj);
    }
  }

  async getUser(req) {
    try {
      let userData = await userService.getUser();
      console.log("userData", userData);
      return APIResponse.successGetResponse(
        "User Data Get Successfully",
        userData.rows,
        []
      );
    } catch (error) {
      var resobj = APIResponse.resObj(error.message);
      return APIResponse.failResponse("Exception", {}, resobj);
    }
  }

  async getUserById(req) {
    try {
      let userData = await userService.getUserById(req.params.id);
      console.log("userData", userData);
      return APIResponse.successGetResponse(
        "User Data Get Successfully",
        userData.rows[0],
        []
      );
    } catch (error) {
      var resobj = APIResponse.resObj(error.message);
      return APIResponse.failResponse("Exception", {}, resobj);
    }
  }

  async updateUser(req) {
    try {
      let userData = await userService.updateUser(req.body,req.params.id);
      console.log("userData", userData);
      return APIResponse.successCreateResponse("User Updated Successfully");
    } catch (error) {
      var resobj = APIResponse.resObj(error.message);
      return APIResponse.failResponse("Exception", {}, resobj);
    }
  }

  async deleteUser(req) {
    try {
      let userData = await userService.deleteUser(req.params.id);
      console.log("userData", userData);
      return APIResponse.successCreateResponse("User Deleted Successfully");
    } catch (error) {
      var resobj = APIResponse.resObj(error.message);
      return APIResponse.failResponse("Exception", {}, resobj);
    }
  }
}

module.exports = new userController();
