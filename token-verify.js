const jwt = require('jsonwebtoken')

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImN1c3RvbWVyIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTEwOTg2ODJ9.nYyQoANFgdmOs3F4XEpXL6qW0s4EzmaINaDeIV0Pi8I';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload)
