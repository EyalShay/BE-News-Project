const db = require("../connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkUser = (author) => {
  return db
    .query(`SELECT * FROM users WHERE username=$1`, [author])
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkArticleExists = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found!" });
      }
      return rows;
    });
};

exports.checkTopic = (topic_name) => {
  return db
    .query(`SELECT * FROM topics WHERE slug=$1`, [topic_name])
    .then(({ rows }) => {
      if (rows.length > 0) {
        return rows;
      }
      return topic_name;
    });
};

exports.checkComment = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id=$1`, [id])
    .then(({ rows }) => {
      return rows;
    });
};
