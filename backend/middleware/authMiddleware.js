const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
     
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded) {
               const user = await User.findById(decoded.id);
               if (user) {
                    req.user = {
                         id: user._id,
                         name: user.name,
                         email: user.email
                    };
               } else {
                    res.status(401);
                    throw new Error("not authorized");
               }
          } else {
               res.status(401);
               throw new Error("not authorized");
          }
     } else {
          res.status(401);
          throw new Error("not authorized no token");
     }
          
     
     next()

})

module.exports = protect