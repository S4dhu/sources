const express = require('express')
const auth = require('../helpers/auth')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/signin', UserCtrl.signin)
router.post('/signup', UserCtrl.signup)
router.get('/getUser', auth, UserCtrl.getById)

module.exports = router