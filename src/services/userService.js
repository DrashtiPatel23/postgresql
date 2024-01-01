const db = require("../db/index");
class userService {
  async createUser(data) {
    console.log("data", data);
    const result = await db.query(
      "INSERT INTO users (name, email,password) VALUES ($1, $2,$3)",
      [data.name, data.email, data.password]
    );
    return result;
  }

  async getUserByEmail(data) {
    console.log("data", data);
    const result = await db.query("select * from users where email=$1", [
      data.email,
    ]);
    return result;
  }

  async getUser() {
    const result = await db.query("select * from users");
    return result;
  }

  async getUserById(id) {
    const result = await db.query("select * from users where ID=$1",[id]);
    return result;
  }

  async updateUser(data,id) {
    console.log("data", data);
    const result = await db.query(
      "update users set name=$1,email=$2 where id=$3",
      [data.name, data.email, id]
    );
    return result;
  }

  async deleteUser(id) {
    const result = await db.query(" delete from users where ID=$1",[id]);
    return result;
  }
}

module.exports = new userService();
