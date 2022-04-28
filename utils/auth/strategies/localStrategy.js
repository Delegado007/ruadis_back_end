const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');

const UserService = require('../../../services/userService');
const service = new UserService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);//busca el user con email
      if (!user) {
        done(boom.unauthorized(), false);//si user no existe
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {//si el password no es match
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);//error nulo y mandamos el user
    } catch (error) {
      done(error, false);
    }
  });

module.exports = LocalStrategy
