const bcrypt = require('bcrypt');
const Relationship = require('../../models/Relationship');
const User = require('../../models/User');
const ERROR = require('../../../config/errors');
const NOTIFICATION = require('../../../config/notification');
const STATUS = require('../../../config/status');
const {
  generatorAndInsertSupplier,
  insertUserCompany,
  sendMailInviterSupplier,
  updateStatus,
} = require('./HandleUser');
const UserCompany = require('../../models/UserCompany');

class SupplierController {
  //post user/inviter/supplier
  async postRegisterSupplier(req, res) {
    try {
      console.log('hello every once');
      //handle insert data user supplier
      const user = await User.findOne({ email: req.body.inviter });
      if (!user) {
        return req.status(404).json({ error: ERROR.ERROR_OCCURRED });
      }
      const supplier = await generatorAndInsertSupplier(req, user.id_company);
      //handle insert data userCompany
      if (supplier) {
        const userCompany = await insertUserCompany(
          req.body.persona,
          supplier.userSupplier,
        );
        console.log(supplier);
        //handle insert data relationship
        await new Relationship({
          inviter: user._id,
          invited: supplier.userSupplier._id,
          emailSupplier: req.body.invited,
        }).save();
        // start handle send email
        const title = 'inviteSupplier';
        const fileMail = 'html.hbs';
        const password = supplier.passwordGenerator;
        const link =
          process.env.LOCALHOST_CLIENT +
          'supplier/' +
          supplier.userSupplier.uuid +
          '/confirm';

        const sendMail = await sendMailInviterSupplier(
          req.body,
          password,
          title,
          fileMail,
          link,
        );
        if (sendMail.error) {
          return res.status(400).json({ error: sendMail.error });
        }
        await User.create(supplier.userSupplier);
        await UserCompany.create(userCompany);
        return res
          .status(200)
          .json({
            success: `inviter supplier ${supplier.userSupplier.email} successfully`,
          });
      }

      return res.status(400).json({ error: ERROR.ERROR_OCCURRED });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //get user/{id}/supplier to set confirm
  async confirmActive(req, res) {
    try {
      const user = await User.findOne({ uuid: req.params.id });
      if (!user) {
        return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
      }
      const relationship = await Relationship.findOne({ invited: user._id });
      //check status supplier
      if (relationship && relationship.status === STATUS.ACTIVE) {
        return res.status(200).json({ notification: NOTIFICATION.ACTIVATED });
      }
      if (relationship && relationship.status === STATUS.PENDING) {
        return res.status(200).json({
          user: user,
        });
      }
      return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  //confirm account and setup news password
  async changePassword(req, res) {
    try {
      const user = await User.findOne({ uuid: req.params.id });
      if (user) {
        console.log(user);
        return res.status(200).json({
          user: user,
        });
      }
      return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  // post user/confirm
  async postActiveSupplier(req, res) {
    try {
      const user = await User.findOne({ uuid: req.params.id });
      if (!user) {
        return res.status(404).json({ error: ERROR.ERROR_OCCURRED });
      }
      const relationship = await Relationship.findOne({ invited: user._id });
      if (!relationship) {
        return res.status(404).json({ error: ERROR.ERROR_OCCURRED });
      }
      // validate password
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (!validatePassword) {
        return res.status(401).json({ error: ERROR.WRONG_PASSWORD });
      }
      // start insert data
      const updateStatusUser = await updateStatus(
        user._id,
        req.body.newPassword,
      );

      if (updateStatusUser.updateStatus && updateStatusUser.updateUser) {
        return res
          .status(200)
          .json({ success: NOTIFICATION.CHANGE_PASSWORD_SUPPLIER });
      } //end insert data
      return res.status(404).json({ error: ERROR.ERROR_OCCURRED });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SupplierController();
