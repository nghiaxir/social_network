const router = require("express").Router();
const auth = require("../middleware/auth");
const userControll = require("../controllers/userControll");

router.get("/search", auth, userControll.searchUser);

router.get("/user/:id", auth, userControll.getUser);

router.patch("/user", auth, userControll.updateUser);

router.patch("/user/:id/follow", auth, userControll.follow);

router.patch("/user/:id/unfollow", auth, userControll.unfollow);

module.exports = router;
