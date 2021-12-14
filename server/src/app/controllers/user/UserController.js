const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { findOneUserByEmailAndPassword, checkPersona } = require('./HandleUser');
const NOTIFICATION = require('../../../config/notification');
const ERROR = require('../../../config/errors');
const { uploadAndSetUrlImage } = require('../handleFileController/uploadImage');
class UserController {
  //get user/login
  async postLogin(req, res) {
    try {
      const checkUser = await findOneUserByEmailAndPassword(
        req.body.email,
        req.body.password,
      );
      if (checkUser.error) {
        return res.status(401).json(checkUser);
      }
      const checkAuth = await checkPersona(
        req.body.email,
        checkUser.userCompany.persona,
        checkUser.user._id,
      );
      if (checkAuth.error) {
        return res.status(401).json(checkAuth);
      }
      return res.status(200).json(checkAuth);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  // get user/profile
  async profileUser(req, res) {
    try {
      const user = await User.findOne({ email: req.params.email });
      // console.log(user);
      // console.log(req.params.email);
      if (user) {
        return res.status(200).json({ success: NOTIFICATION.FIND_USER, user });
      }
      return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async logout(req, res) {
    try {
      const user = await User.findOne({ email: req.params.userEmail });
      if (user) {
        return res.status(200).json({ success: NOTIFICATION.LOG_OUTED, user });
      }
      return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findOne({ email: req.params.email });
      // console.log(user);
      if (!user) {
        return res.json({ error: ERROR.FILE_NOT_FOUND });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async postUpdate(req, res) {
    try {
      let checkAuth = await findOneUserByEmailAndPassword(
        req.params.email,
        req.body.password,
      );
      if (checkAuth.error) {
        return res.json({ error: ERROR.WRONG_PASSWORD });
      }

      req.body.image = await uploadAndSetUrlImage(
        req.body.image,
        checkAuth.user.image,
      );
      const newPassword = await bcrypt.hash(req.body.newPassword, 12);
      await User.findOneAndUpdate(
        { email: req.params.email },
        {
          password: newPassword,
          image: req.body.image,
        },
      );
      return res
        .status(200)
        .json({ user: checkAuth.user, success: NOTIFICATION.USER_UPDATED });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async postUpdateAvatar(req, res) {
    try {
      let checkAuth = await findOneUserByEmailAndPassword(
        req.params.email,
        req.body.password,
      );
      if (checkAuth.error) {
        return res.json({ error: ERROR.WRONG_PASSWORD });
      }

      req.body.image = await uploadAndSetUrlImage(
        req.body.image,
        checkAuth.user.image,
      );
      await User.findOneAndUpdate(
        { email: req.params.email },
        {
          image: req.body.image,
        },
      );
      return res
        .status(200)
        .json({ user: checkAuth.user, success: NOTIFICATION.USER_UPDATED });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
