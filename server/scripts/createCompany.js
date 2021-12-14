'use strict';
require('dotenv').config();
const database = require('../src/databases/'),
  fs = require('fs'),
  path = require('path'),
  Company = require('../src/app/models/Company'),
  { nanoid } = require('nanoid');

async function insertCompanise() {
  try {
    await database.connect();
    const fileName = 'dataCompany.json';
    let fileData = await fs.readFileSync(
      path.join(__dirname, 'json/', fileName),
    );
    if (!Buffer.byteLength(fileData)) {
      return console.log(`${fileName} is not data`);
    }
    fileData = await JSON.parse(fileData);

    for (let i in fileData) {
      let company = await Company.findOne({ name: fileData[i].name });
      if (company) {
        console.log(`Company ${fileData[i].name} already exists`);
        continue;
      }
      fileData[i]._id = nanoid();
      const companiesInsert = await new Company(fileData[i]).save();
      if (!companiesInsert) {
        console.log(`Insert data company ${fileData} failure`);
        continue;
      }
      console.log(`insert ${companiesInsert.name} successfully`);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = insertCompanise();
