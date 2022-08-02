const {
  fetchTopics,
  selectArticlesById,
  updateArticlesById,
} = require("../models/topics-models");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticlesById = (req, res, next) => {
  const id = req.params.article_id;
  selectArticlesById(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticlesById = (req, res, next) => {
  const id = req.params.article_id;
  const newVotes = req.body.inc_votes;
  updateArticlesById(newVotes, id)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
