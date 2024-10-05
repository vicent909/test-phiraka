class User {
  constructor(id, username, password, createdTime) {
    this.id = id,
    (this.username = username),
      (this.password = password),
      (this.createdTime = createdTime);
  }

  get stringDate() {
    let date = this.createdTime.toISOString().split("T")[0];
    return date;
  }
}

class Factory {
  static async createUser(data) {
    return data.map((e) => {
        return new User(e.id, e.username, e.password, e.createdTime);
    })
  }
}

module.exports = Factory;
