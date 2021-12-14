const cron = require('node-cron');
const generator = require('generate-password');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const Relationship = require('../src/app/models/Relationship');
const User = require('../src/app/models/User');
const Email = require('../src/app/models/Email');
const STATUS = require('../src/config/status');

// check status user supplier
// 

//info send mail
//+ invited, account, new password, link active,

//time auto resend mail is 7:30 AM daily
// ||
//check supplier is pending of activated

//status is pending, => change password and resend email to account email for supplier

cron.schedule('*/5 * * * *', () => {
  (async () => {
    try {
      const relationship = await Relationship.find({ status: STATUS.PENDING })

      if (relationship.length > 0) {

        for (let i in relationship) {

          const user = await User.findOne({ _id: relationship[i].invited })
          // console.log(user);
          const passwordGenerator = await generator.generate({
            length: 10,
            numbers: true,
          });
          const hashPassword = await bcrypt.hash(passwordGenerator, 10);

          await User.findOneAndUpdate({ _id: relationship[i].invited }, { password: hashPassword })

          // console.log(path.join(__dirname, '../src/resources/views/emails/html.hbs'));
          const email = await Email.findOne({ title: 'inviteSupplier' });
          if (email) {
            let htmlSend =
              email.greeting +
              email.content +
              email.accountEmail +
              email.accountPassword +
              email.linkActive;
            await fs.writeFileSync(
              path.join(__dirname, '../src/resources/views/emails/html.hbs'),
              htmlSend,
            );
          }
          const emailTemplateSource = await fs.readFileSync(
            path.join(__dirname, '../src/resources/views/emails/html.hbs'),
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
            email: relationship[i].emailSupplier,
            emailAccount: user.email,
            password: passwordGenerator,
            link:
              process.env.LOCALHOST_CLIENT +
              'supplier/' +
              user.uuid +
              '/confirm',
          });

          let mailOptions = {
            from: process.env.AUTH_FROM,
            to: relationship[i].emailSupplier,
            subject: 'Accept the invitation to join',
            html: htmlToSend,
          };

          await transporter.sendMail(mailOptions, function (error, info) {
            if (!error) {
              return true;
            }
          });
        }
      }
    } catch (error) {
      throw new Error;
    }
  })();
});