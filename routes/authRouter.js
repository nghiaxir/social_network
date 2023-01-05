const router = require('express').Router()
const authCtrl = require('../controllers/authControll')

router.post('/register', authCtrl.register)

// router.post('/notify', authCtrl.login)

// router.post('/discover', authCtrl.login)

// router.post('/login', authCtrl.login)

router.post('/login', authCtrl.login)

router.post('/logout', authCtrl.logout)

router.post('/refresh_token', authCtrl.generateAccessToken)

module.exports = router