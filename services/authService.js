const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const { config } = require('./../config/config')
const UserService = require('./userService');
const service = new UserService();


class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);//busca el user con email
    if (!user) {
      throw boom.unauthorized();//si user no existe
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {//si el password no es match
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.role;
    delete user.dataValues.id;
    delete user.dataValues.createdAt;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);//busca el user con email
    if (!user) {
      throw boom.unauthorized();//si user no existe
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `https://webpack-ruadis.netlify.app/revocery_password?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.mail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail)
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized()
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: config.mail,
        pass: config.passwordCorreo
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
