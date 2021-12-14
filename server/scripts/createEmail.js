'use strict';
require('dotenv').config();
const database = require('../src/databases/');
database.connect();
const fs = require('fs');
const path = require('path');
const { isObject } = require('util');
const Email = require('../src/app/models/Email');

async function insert() {
  const fileName = 'dataEmail.json';
  let fileData = await fs.readFileSync(path.join(__dirname, 'json/', fileName));
  if (!Buffer.byteLength(fileData)) {
    return console.log(`File ${fileName} is not data`);
  }

  fileData = JSON.parse(fileData);

  if (!isObject(fileData)) {
    return console.log(`${fileName} is not object`);
  }
  for (let i in fileData) {
    const email = await Email.findOne({ title: fileData[i].title });
    if (email) {
      console.log(`template ${fileData[i].title} already exists`);
      continue;
    }
    const emailInsert = await new Email(fileData[i]).save();
    console.log(`insert ${emailInsert.title} email successfully`);
  }
}
insert();
