const Company = require('../../models/Company');

module.exports = {
  async findOneCompany(companyId) {
    try {
      const company = await Company.aggregate([
        {
          $match: { _id: companyId },
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: 'id_company',
            as: 'users',
          },
        },
        { $limit: 1 },
      ]);
      if (company[0]) {
        return company[0];
      }
      return false;
    } catch (error) {
      return error.message;
    }
  },
};
