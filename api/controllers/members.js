const Member = require("../models/member");
const mongoose = require("mongoose");

exports.GetAllMembers = (req, res, next) => {
  Member.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.CreateMember = (req, res, next) => {
  const member = new Member({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    designation: req.body.designation,
    image: req.file.path,
    abbr: req.body.abbr,
    featured: req.body.featured,
    description: req.body.description,
  });
  member
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /members",
        createdMember: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getMember_one = (req, res, next) => {
  id = req.params.memberId;
  Member.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.MemberUpdate = (req, res, next) => {
  const id = req.params.memberId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Member.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Member updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/members/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteMemberId = (req, res, next) => {
  const id = req.params.memberId;
  Member.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteAll = (req, res, next) => {
  Member.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
