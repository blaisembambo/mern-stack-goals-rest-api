const express = require('express')
const { getMe, registerUser, loginUser } = require('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/signup", registerUser);
router.post('/login', loginUser);
router.get("/me", protect,getMe);

module.exports = router