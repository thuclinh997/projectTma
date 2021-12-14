require('dotenv').config();
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const home = require('../src/app/controllers/HomeController');
const companyController = require('../src/app/controllers/company/CompanyController');
const Company = require('../src/app/models/Company');
const sinon = require('sinon');
const faker = require('faker');
chai.use(chaiHttp);
const request = require('supertest')(server);
let sandbox;
let res = {};
dataCompany = {
  body: {
    _id: '123id',
    name: faker.company.companyName(),
    description: faker.lorem.words(),
    business: faker.system.commonFileName(),
    'contact.street': faker.address.streetName(),
    'contact.city': faker.address.city(),
    'contact.country': faker.address.country(),
    'contact.phone_number': faker.phone.phoneNumber(),
  },
};
describe('Test home page', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  it('should get all data and return status 200', (done) => {
    Company.find = sandbox.stub(Company, 'find').resolves(dataCompany.body);
    Company.find.withArgs({});
    request.get(`/`).end((err, res) => {
      assert.typeOf(res.body, 'object');
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should status 500 when error data', (done) => {
    Company.find = sandbox
      .stub(Company, 'find')
      .yields(new Error('is something error', undefined));
    Company.find.withArgs({});
    request.get(`/`).end((err, res) => {
      expect(res.status).to.equal(500);
      done();
    });
  });
});
