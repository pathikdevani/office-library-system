
const Issues = require('./issues.model');

class UsersRequest {
  static getAllIssues() {
    return Issues.find({});
  }

  static getIssueById(issueId) {
    return Issues.findOne({ _id: issueId });
  }

  static insertIssue(issueDetail) {
    return Issues.create(issueDetail);
  }

  static updateById(id, updateData) {
    return Issues.findOneAndUpdate({
      _id: id,
    }, updateData);
  }
}


module.exports = UsersRequest;
