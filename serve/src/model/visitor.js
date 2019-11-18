// 访客信息
module.exports = class extends think.Model {
  async save(visitor) {
    const oldData = await this.where({ ip: visitor.ip }).find();
    if (!oldData.id) {
      // insert
      visitor.num = 1;
      visitor.first_time = (new Date()).getTime() / 1000;
      visitor.update_time = visitor.first_time;
      const id = await this.add(visitor);
      return id;
    } else {
      this.updateVisitor({...oldData, ...visitor});
    }
  }

  updateVisitor(visitor) {
    // update
    const date = (new Date()).getTime();
    let id;
    if (date - (visitor.update_time * 1000) > 2000) {
      ++visitor.num;
      visitor.update_time = date / 1000;
      id = this.update(visitor);
    }
    return id;
  }
};
