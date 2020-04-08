const Promotion = require("../models/promotion");
const mongoose = require("mongoose");

exports.Promotions_get_all = (req, res, next) => {
  Promotion.find()
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
exports.CreatePromotion = (req, res, next) => {
  const promotion = new Promotion({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category: req.body.category,
    label: req.body.label,
    image: req.file.path,
    price: req.body.price,
    featured: req.body.featured,
    description: req.body.description,
  });
  promotion
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /promotions",
        createdPromotion: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getPromotion_one = (req, res, next) => {
  id = req.params.promotionId;
  Promotion.findById(id)
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

exports.PromotionUpdate = (req, res, next) => {
  const id = req.params.promotionId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Promotion.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Promotion updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/promotions/" + id,
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

exports.deletePromotion = (req, res, next) => {
  const id = req.params.promotionId;
  Promotion.remove({ _id: id })
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
  Promotion.deleteMany()
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
