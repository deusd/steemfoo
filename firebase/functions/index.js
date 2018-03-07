const functions = require("firebase-functions")
const steem = require("steem")

exports.getLatestPosts = functions.https.onRequest((request, response) => {
  response.send("Hello from getLatestPosts!")
})

exports.getTrendingPosts = functions.https.onRequest((request, response) => {
  response.send("Hello from getTrendingPosts!")
})

exports.getHotPosts = functions.https.onRequest((request, response) => {
  response.send("Hello from getHotPosts!")
})
