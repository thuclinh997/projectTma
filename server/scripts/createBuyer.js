'use strict';
require('dotenv').config();
const { isObject } = require('util');
const database = require('../src/databases/'),
  fs = require('fs'),
  path = require('path'),
  bcrypt = require('bcrypt'),
  { nanoid } = require('nanoid'),
  Company = require('../src/app/models/Company'),
  User = require('../src/app/models/User'),
  UserCompany = require('../src/app/models/UserCompany');

async function insert() {
  try {
    await database.connect();
    const fileName = 'dataBuyer.json';
    let fileData = await fs.readFileSync(
      path.join(__dirname, 'json/', fileName),
    );
    if (!Buffer.byteLength(fileData)) {
      return console.log(`File ${fileName} is not data`);
    }
    fileData = JSON.parse(fileData);
    if (!isObject(fileData)) {
      return console.log(`${fileName} is not object`);
    }
    async function insertDataUser(fileData) {
      for (let i in fileData) {
        const company = await Company.findOne({
          name: fileData[i] && fileData[i].nameCompany,
        });
        let user = await User.findOne({
          email: fileData[i] && fileData[i].email,
        });
        if (!company) {
          console.log(`company ${fileData[i].nameCompany} dose not exists`);
          continue;
        }
        if (user) {
          console.log(`user ${fileData[i].email} already exists`);
          continue;
        }
        const hashPassword = await bcrypt.hash(fileData[i].password, 10);
        user = await new User({
          _id: nanoid(),
          email: fileData[i].email,
          password: hashPassword,
          id_company: company._id,
        }).save();
        if (!user) {
          console.log(`insert data user ${user} failure`);
          continue;
        }
        console.log(`insert data user ${user.email} successfully`);
        const userCompany = await new UserCompany({
          id_company: company._id,
          id_user: user._id,
          persona: 'buyer',
        }).save();
        if (!userCompany) {
          console.log(`insert data userCompany failure`);
          continue;
        }
        console.log(
          `insert data userCompany ${userCompany.persona} successfully`,
        );
      }
    }
    insertDataUser(fileData);
  } catch (error) {
    console.log(error);
  }
}

module.exports = insert();
