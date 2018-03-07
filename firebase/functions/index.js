const functions = require("firebase-functions");
const steem = require("steem");

steem.api.setOptions({ url: "https://api.steemit.com" });

const postTypes = {
  LATEST: "LATEST",
  TRENDING: "TRENDING",
  HOT: "HOT"
};

function getPosts(postType, query) {
  let postFunction;
  const postQuery = Object.assign({ limit: 20 }, query);

  switch (postType) {
    case postTypes.LATEST:
      postFunction = steem.api.getDiscussionsByCreated;
      break;
    case postTypes.TRENDING:
      postFunction = steem.api.getDiscussionsByTrending;
      break;
    case postTypes.HOT:
      postFunction = steem.api.getDiscussionsByHot;
      break;
    default:
      throw new Error("Invalid post type provided");
  }

  return new Promise(function(resolve, reject) {
    console.log(`${postType} query`, postQuery);

    postFunction(postQuery, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  })
}

exports.getLatestPosts = functions.https.onRequest((request, response) => {
  getPosts(postTypes.LATEST, request.query)
    .then(result => response.json(result))
    .catch(reason => response.send(reason));
});

exports.getTrendingPosts = functions.https.onRequest((request, response) => {
  getPosts(postTypes.TRENDING, request.query)
    .then(result => response.json(result))
    .catch(reason => response.send(reason));
});

exports.getHotPosts = functions.https.onRequest((request, response) => {
  getPosts(postTypes.HOT, request.query)
    .then(result => response.json(result))
    .catch(reason => response.send(reason));
});
