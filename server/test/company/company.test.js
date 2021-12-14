require('dotenv').config();
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server');
const request = require('supertest')(server);
const Company = require('../../src/app/models/Company');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const faker = require('faker');
const assert = chai.assert;
chai.use(chaiHttp);
// const companyController = require('../src/app/controllers/CompanyController');
let res = {};
let req = {};
let fakerId = '123456789idk908';
dataCompany = {
  body: {
    _id: fakerId,
    name: faker.company.companyName(),
    description: faker.lorem.words(),
    business: faker.system.commonFileName(),
    'contact.street': faker.address.streetName(),
    'contact.city': faker.address.city(),
    'contact.country': faker.address.country(),
    'contact.phone_number': faker.phone.phoneNumber(),
  },
  params: {
    id: fakerId,
  },
};
//
describe('faker data using testing', () => {
  it('should store data company using testing', async () => {
    await Company.create(dataCompany.body);
  });
});

describe('test edit company controller', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should return status 200 when find data', () => {
    Company.findOne = sandbox
      .stub(Company, 'findOne')
      .resolves(dataCompany.body);
    Company.findOne.withArgs({ _id: dataCompany.params.id });
    request.get(`/company/${dataCompany.params.id}/edit`).end((err, res) => {
      expect(res.headers['content-type']).contain('application/json');
      assert.typeOf(res.body, 'object');
      expect(res.status).to.equal(200);
    });
  });

  it('query data from link (/company/:id/edit) no data found return throws 404 error', () => {
    Company.findOne = sandbox.stub(Company, 'findOne').resolves({});
    request.get(`/company/12345/edit`).end((err, res) => {
      expect(res.body).to.have.property('error');
      assert.typeOf(res.body, 'object');
      expect(res.status).to.equal(404);
    });
  });
});

describe('update company', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should update company and return status 200 when data invalid', () => {
    Company.findOne = sandbox
      .stub(Company, 'findOne')
      .resolves(dataCompany.body);
    Company.findOne.withArgs({ _id: dataCompany.params.id });
    request
      .put(`/company/${dataCompany.params.id}/update`)
      .send(dataCompany.body)
      .end((err, res) => {
        expect(res.body).to.have.property('company');
        assert.typeOf(res.body, 'object');
        expect(res.status).to.equal(200);
      });
  });

  it('should return status 404 when id company not found', () => {
    Company.findOne = sandbox.stub(Company, 'findOne').resolves();
    Company.findOne.withArgs({});
    request
      .put(`/company/123456/update`)
      .send(dataCompany.body)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        assert.typeOf(res.body, 'object');
        expect(res.status).to.equal(200);
      });
  });
});

describe('detail company', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should status 200 when data invalid', () => {
    Company.findOne = sandbox.stub(Company, 'findOne').resolves(res.body);
    Company.findOne.withArgs({ _id: dataCompany.params.id });
    request.get(`/company/${dataCompany.params.id}/detail`).end((err, res) => {
      expect(res.body).to.have.property('company');
      assert.typeOf(res.body, 'object');
      expect(res.status).to.equal(200);
    });
  });
  it('should status 404 when data not found', () => {
    Company.findOne = sandbox.stub(Company, 'findOne').resolves();
    Company.findOne.withArgs({});
    request.get(`/company/123456/detail`).end((err, res) => {
      assert.typeOf(res.body, 'object');
      expect(res.status).to.equal(404);
    });
  });
});
