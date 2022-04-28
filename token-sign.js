const jwt = require('jsonwebtoken')

const secret = 'myCat';
const payload = {
  sub: 1,
  customer: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token)
