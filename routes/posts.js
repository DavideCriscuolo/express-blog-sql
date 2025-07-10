const posts = require("./../data/posts");
const express = require("express");
const router = express.Router();

const postsController = require("./../controllers/posts");

//index

router.get("/", postsController.index);

//show

router.get("/:id", postsController.show);

//Create
router.post("/", postsController.store);

//Update
router.put("/:id", postsController.update);

// router.patch("/:id", postsController.upadteFull);
//Deleate

router.delete("/:id", postsController.destroy);

module.exports = router;
