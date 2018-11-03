const express = require('express');
const request = require('request');
const md5 = require('md5');
const mcache = require('memory-cache');

const app = express();
const router = express.Router();

// Keys required to access Marvel API
const privateKey = '580833e43d09102bf65292a60db711e1639c0ee1';
const publicKey = 'fc0bbfff7046baab7764e1ef9a394a25';
const port = 8080;

// every request to '/api/getMarvelCharacters' is chached
const cache = duration => (req, res, next) => {
  // URL is used as key
  const key = `__express__${req.originalUrl}` || req.url;
  const cachedBody = mcache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
    return;
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    mcache.put(key, body, duration * 1000);
    res.sendResponse(body);
  };
  next();
};

// route middleware to validate :id
router.param('id', (req, res, next, id) => {
  if (Number.isNaN(id)) {
    next('route');
  }
  console.log(`doing id validations on ${id}`);

  // once validation is done save the new item in the req
  req.id = id;
  // go to the next middleware
  next();
});

// route without parameters (http://localhost:8080/characters)
router.get('/', cache(86400), (req, res) => {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  let url = 'http://gateway.marvel.com/v1/public/characters';
  url += `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  console.log(url);

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);
    res.send(body);
  });
});

// route with parameters (http://localhost:8080/characters/:id)
router.get('/:id', cache(86400), (req, res) => {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  let url = `http://gateway.marvel.com/v1/public/characters/${req.id}`;
  url += `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  console.log(url);

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);
    res.send(body);
  });
});

// apply the routes to our application
app.use('/api/characters', express.static('dist'), router);
app.listen(port, () => console.log(`Listening on port ${port}!`));
