const generator = require('generate-password');
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const Relationship = require('../../models/Relationship');
const { sendMailInviterSupplier } = require('./HandleUser');
const ERROR = require('../../../config/errors');
const NOTIFICATION = require('../../../config/notification');
class userSupplierController {
  //show list supplier
  async index(req, res) {
    try {
      const user = await User.aggregate([
        {
          $match: { email: req.params.email },
        },
        {
          $lookup: {
            from: 'relationships',
            localField: '_id',
            foreignField: 'inviter',
            as: 'relations',
          },
        },
      ]);
      const relations = user[0].relations;
      // console.log(relations);
      let userSuppliers = [];
      for (let i in relations) {
        let user = await User.findOne({ _id: relations[i].invited });
        if (user) {
          user = {
            ...user,
            status: relations[i].status,
            invited: relations[i].invited,
          };
          userSuppliers = [
            ...userSuppliers,
            { data: user._doc, status: user.status, invited: user.invited },
          ];
        }
      }
      // console.log(userSuppliers);
      return res.status(200).json(userSuppliers);
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  }
  //handle change status supplier
  async changeStatus(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
      }
      // console.log(req.body.status);
      await User.findOneAndUpdate({ _id: req.params.id }, { uuid: null });
      await Relationship.findOneAndUpdate(
        { invited: req.params.id },
        { status: req.body.status },
      );

      return res.status(200).json({ success: NOTIFICATION.CHANGED_STATUS });
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  }
  //handle delete supplier
  async destroySupplier(req, res) {
    try {
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  }
  //handle show detail supplier
  async resetPassword(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
      }

      const relationship = await Relationship.findOne({ invited: user._id });

      if (!relationship) {
        return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
      }

      const passwordGenerator = await generator.generate({
        length: 10,
        numbers: true,
      });

      const hashPassword = await bcrypt.hash(passwordGenerator, 10);

      const dataInput = {
        invited: relationship.emailSupplier,
        accountInvited: user.email,
      };
      const title = 'ResetPassword';
      const fileMail = 'resetPassword.hbs';
      const password = passwordGenerator;
      const link = process.env.LOCALHOST_CLIENT + 'user/login';

      const resetPassword = await sendMailInviterSupplier(
        dataInput,
        password,
        title,
        fileMail,
        link,
      );

      if (resetPassword.error) {
        return res.status(400).json({ error: sendMail.error });
      }

      await User.findOneAndUpdate(
        { _id: req.params.id },
        { password: hashPassword },
      );

      return res
        .status(200)
        .json({
          success: `reset password supplier ${user.email} successfully`,
        });
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  }
}

module.exports = new userSupplierController();
