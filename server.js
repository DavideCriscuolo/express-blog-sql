const express = require("express");
const app = express();
const port = 3030;
const PostsRouter = require("./routes/posts");
const notFound = require("./middleware/notFound");
const errorApp = require("./middleware/errorApp");

app.use(express.json());
app.use("/posts", PostsRouter);
app.use(errorApp);
app.use(notFound);

app.listen(port, () => {
  console.log(`Il server è in ascolto`);
});
