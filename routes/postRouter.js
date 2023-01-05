const router = require('express').Router();
const postControll = require('../controllers/postControll')
const auth = require('../middleware/auth')

router.route('/posts').post(auth, postControll.createPost)

module.exports = router