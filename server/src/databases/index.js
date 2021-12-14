const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
async function connect() {
  //connect database
  try {
    if (process.env.NODE_ENV === 'test') {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri('trust_supplier_test'));
    } else {
      await mongoose.connect(process.env.DB_HOST + '/' + process.env.DB_NAME);
    }
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { connect };
