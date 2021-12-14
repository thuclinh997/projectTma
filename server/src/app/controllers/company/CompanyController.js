// const User = require('../../models/User');
const Company = require('../../models/Company');
const { findOneCompany } = require('./HandleCompany');
const { uploadAndSetUrlImage } = require('../handleFileController/uploadImage');

const ERROR = require('../../../config/errors');
const NOTIFICATION = require('../../../config/notification');

class CompanyController {
  async edit(req, res) {
    try {
      let company = await findOneCompany(req.params.id);
      if (company) {
        return res.status(200).json(company);
      }
      return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      let company = await findOneCompany(req.params.id);
      if (company) {
        req.body.image = await uploadAndSetUrlImage(
          req.body.image,
          company.image,
        );

        company = await Company.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
        );
        return res
          .status(200)
          .json({ success: NOTIFICATION.COMPANY_UPDATED, company });
      }
      return res.status(404).json(ERROR.COMPANY_NOT_FOUND);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  }

  async showDetail(req, res) {
    try {
      const company = await findOneCompany(req.params.id);
      if (company) {
        return res.status(200).json({ company: company });
      }
      return res.status(404).json({ error: ERROR.FILE_NOT_FOUND });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = new CompanyController();
