const posts = require("./../data/posts");
const connection = require("./../db/connection");

const show = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post non trovato" });
  }
};

const destroy = (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((post) => {
    if (post.id === id) {
      return true;
    }
  });

  if (index !== -1) {
    posts.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Post non trovato" });
  }
  console.log(posts);
};

const store = (req, res) => {
  console.log(req.body);
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
  console.log(posts);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({
      error: "Post non trovato",
    });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  res.json(posts);
  console.log(posts);
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

module.exports = {
  show,
  destroy,
  store,
  update,
  index,
};
