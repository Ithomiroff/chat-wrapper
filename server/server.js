const express = require('express');
const app = express();
const port = 3000;

const data = require('./data');

app.get('/api/contacts', function(req, res) {
  const { contacts } = data;
  setTimeout(() => res.send(contacts), 2000)
});

app.get('/api/messages/:userId', function(req, res) {
  setTimeout(() => res.send([]), 3000)
});







app.listen(port, () => console.log(`server started on port ${port}`));

