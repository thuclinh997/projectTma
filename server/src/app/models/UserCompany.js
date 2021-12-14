const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const UserCompany = new Schema(
  {
    id_company: { type: String },
    id_user: { type: String },
    persona: { type: String },
  },
  { timestamps: true },
);

UserCompany.plugin(mongooseDelete, { deletedAt: true });

module.exports = mongoose.model('UserCompany', UserCompany);
