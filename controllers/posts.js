const posts = require("./../data/posts");
const connection = require("./../db/connection");

const index = (req, res) => {
  const sql = "SELECT * FROM `posts`";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(result);
    res.json(result);
  });
};
const show = (req, res) => {
  const id = Number(req.params.id);

  const sql = "SELECT * FROM `posts` WHERE id = ?;";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        err: err.message,
      });
    }
    if (!results.length > 0) {
      return res.status(404).json({
        err: "post non trovato",
      });
    }
    console.log(results);
    return res.json(results[0]);
  });
};

const destroy = (req, res) => {
  const id = Number(req.params.id);

  const sql = "DELETE FROM `posts` WHERE id = ?;";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err.message,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        err: "post non trovato",
      });
    }
    console.log("il post è stato eliminato correttamente");
    return res.status(204).json(results);
  });
};

const store = (req, res) => {
  const { title, content, image } = req.body;
  const sql =
    "INSERT INTO `posts` (`title`, `content`, `image`) VALUES (?,?,?)";

  connection.query(sql, [title, content, image], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);
    return res.status(201).json(results);
  });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { title, content, image } = req.body;
  const sql =
    "UPDATE `posts` SET `title` = ? , `content` = ? , `image` = ?  WHERE `id` = ? ;";

  connection.query(sql, [title, content, image, id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err.message,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        err: "risorsa non trovata",
      });
    }
    console.log(results);
    return res.status(201).json(results);
  });
};
const upadteFull = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({
      error: "Post non trovato",
    });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;
  res.json(posts);
  console.log(posts);
};

module.exports = {
  show,
  destroy,
  store,
  update,
  index,
};
