const express = require('express')
const route = express.Router()

const { createBlog } = require("../controller/postcontroller")
const { auth } = require("../middleware/auth")

route.post('/create-post',auth,createBlog)

module.exports = route;