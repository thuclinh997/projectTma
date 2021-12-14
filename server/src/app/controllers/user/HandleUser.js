const User = require('../../models/User');
const Email = require('../../models/Email');
const Relationship = require('../../models/Relationship');
const UserCompany = require('../../models/UserCompany');
const uuid = require('uuid');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const ERROR = require('../../../config/errors');
const STATUS = require('../../../config/status');
const PERSONA = require('../../../config/persona');
const NOTIFICATION = require('../../../config/notification');

async function findOneUserByEmailAndPassword(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const userCompany = await UserCompany.findOne({
          id_user: user._id,
        });

        return { user, userCompany };
      }
    }
    return { error: ERROR.WRONG_AUTH };
  } catch (error) {
    return { error: error.message };
  }
}

async function checkPersona(email, persona, id) {
  try {
    if (persona === PERSONA.BUYER) {
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.SECRET,
      );
      return { email, token };
    }
    if (persona === PERSONA.SUPPLIER) {
      const relationship = await Relationship.findOne({
        invited: id,
      });
      if (relationship.status === STATUS.PENDING) {
        return {
          error: NOTIFICATION.NO_ACTIVE,
        };
      }
      if (relationship.status === STATUS.LOCK) {
        return { error: NOTIFICATION.LOCK_ACCOUNT };
      }
      if (relationship.status === STATUS.ACTIVE) {
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.SECRET,
        );
        return { email, token };
      }
    }
    return { error: ERROR.WRONG_AUTH };
  } catch (error) {
    return { error: error };
  }
}

async function generatorAndInsertSupplier(req, id_company) {
  try {
    const passwordGenerator = await generator.generate({
      length: 10,
      numbers: true,
    });
    const hashPassword = await bcrypt.hash(passwordGenerator, 10);
    //find user inviter
    const userSupplier = {
      _id: nanoid(),
      email: req.body.accountInvited,
      uuid: uuid.v4(),
      id_company: id_company,
      password: hashPassword,
    };
    return { userSupplier, passwordGenerator };
  } catch (error) {
    return error.message;
  }
}

async function insertUserCompany(persona, dataUser) {
  try {
    userCompany = {
      id_user: dataUser._id,
      id_company: dataUser.id_company,
      persona: persona,
    };
    return userCompany;
  } catch (error) {
    return false;
  }
}

async function sendMailInviterSupplier(
  dataFrom,
  password,
  title,
  fileMail,
  link,
) {
  const email = await Email.findOne({ title: title });
  if (email) {
    let htmlSend =
      email.greeting +
      email.content +
      email.accountEmail +
      email.accountPassword +
      email.linkActive;
    await fs.writeFileSync(
      path.join(`./src/resources/views/emails/${fileMail}`),
      htmlSend,
    );
  }
  const emailTemplateSource = await fs.readFileSync(
    path.join(`./src/resources/views/emails/${fileMail}`),
    'utf8',
  );
  //send email using mailDev
  const transporter = await nodemailer.createTransport({
    service: process.env.SERVICE_MAIL,
    host: process.env.HOST_MAIL,
    port: process.env.POST_MAIL,
    secure: false,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = await template({
    email: dataFrom.invited,
    emailAccount: dataFrom.accountInvited,
    password: password,
    link: link,
  });

  let mailOptions = {
    from: process.env.AUTH_FROM,
    to: dataFrom.invited,
    subject: 'Accept the invitation to join',
    html: htmlToSend,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error.message };
    }
  });
  return {
    user: dataFrom.invited,
  };
}

async function updateStatus(id, password) {
  const newPassword = await bcrypt.hash(password, 12);
  const updateStatus = await Relationship.findOneAndUpdate(
    {
      invited: id,
    },
    {
      status: 'active',
    },
  );
  const updateUser = await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      uuid: null,
      password: newPassword,
    },
  );
  return { updateStatus, updateUser };
}

async function resetPasswordAndSendMail(newPassword, mail) {}

module.exports = {
  findOneUserByEmailAndPassword,
  generatorAndInsertSupplier,
  insertUserCompany,
  sendMailInviterSupplier,
  updateStatus,
  checkPersona,
};
