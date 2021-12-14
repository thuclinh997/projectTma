const mongoose = require('mongoose'),
  aggregatePaginate = require('mongoose-aggregate-paginate-v2'),
  Schema = mongoose.Schema,
  Email = new Schema(
    {
      title: { type: String, unique: true },
      subject: { type: String, maxLength: 100, unique: true },
      greeting: { type: String },
      content: { type: String },
      accountEmail: { type: String },
      accountPassword: { type: String },
      linkActive: { type: String },
    },
    { timestamps: true },
  );
Email.plugin(aggregatePaginate);

module.exports = mongoose.model('Email', Email);
