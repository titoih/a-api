const cors = require('cors')

var whitelist = ['http://localhost:3000','http://192.168.20.179:3000' ];

module.exports = cors({
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})


// const cors = require('cors')

// module.exports = cors({
//   credentials: true,
//   origin: process.env.ALLOW_ORIGINS || 'http://localhost:3000'
// })