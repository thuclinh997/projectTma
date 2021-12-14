const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const { nanoid } = require('nanoid');
const Schema = mongoose.Schema;
const Company = new Schema(
  {
    _id: { type: String, default: nanoid() },
    name: { type: String, maxLength: 200, unique: true },
    description: { type: String },
    business: { type: String },
    image: { type: String, default: null },
    // email:{type: String, default:null},
    contact: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
      phone_number: { type: String },
    },
  },
  { timestamps: true },
);

Company.plugin(mongooseDelete, { deletedAt: true });
Company.plugin(aggregatePaginate);

module.exports = mongoose.model('Company', Company);
