const express = require('express');
const request = require('request');
const md5     = require('md5');

// Keys required to access Marvel API
const privateKey = '580833e43d09102bf65292a60db711e1639c0ee1';
const publicKey = 'fc0bbfff7046baab7764e1ef9a394a25';
const port = 8080;

const app = express();

app.use(express.static('dist'));
app.get('/api/getMarvelCharacters', (req, res) => {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  let url = 'http://gateway.marvel.com/v1/public/characters';
  url += `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  console.log(url);

  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);
    res.send(body)
  });
});
app.listen(port, () => console.log(`Listening on port ${port}!`));
