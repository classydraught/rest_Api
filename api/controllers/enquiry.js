const Enquiry = require("../models/enquiry");
const mongoose = require("mongoose");

exports.GetAllEnquiry = (req, res, next) => {
  Enquiry.find()
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

exports.CreateEnquiry = (req, res, next) => {
  const enquiry = new Enquiry({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    agree: req.body.agree,
    contactType: req.body.contactType,
    message: req.body.message,
    date: req.body.date,
    phone: req.body.phone,
  });
  enquiry
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /enquiry",
        createdEnquiry: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getEnquiry_one = (req, res, next) => {
  id = req.params.enquiryId;
  Enquiry.findById(id)
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

exports.EnquiryUpdate = (req, res, next) => {
  const id = req.params.enquiryId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Enquiry.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "enquiry updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/enquiry/" + id,
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

exports.deleteEnquiry = (req, res, next) => {
  const id = req.params.enquiryId;
  Enquiry.remove({ _id: id })
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
  Enquiry.deleteMany()
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
