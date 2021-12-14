require('dotenv').config();
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server');
const request = require('supertest')(server);
const Company = require('../../src/app/models/Company');
const HandleCompany = require('../../src/app/controllers/company/HandleCompany');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const faker = require('faker');
chai.use(chaiHttp);

let fakerId = '098765432id78k';
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

// describe('faker data using testing', () => {
//   it('should store data company using testing', async () => {
//     await Company.create(dataCompany.body);
//   });
// });

describe('check find once company', () => {
  let sandbox;
  let spy;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    spy = sandbox.spy(HandleCompany, 'findOneCompany');
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should found data company when { findOneCompany } invalid', async () => {
    let data = await HandleCompany.findOneCompany(dataCompany.params.id, spy);
    expect(data).to.be.a('Object');
    expect(spy.calledWith(dataCompany.params.id)).to.be.true;
    sandbox.assert.calledOnce(spy);
  });
  it('should return false when { findOneCompany } not found', async () => {
    let data = await HandleCompany.findOneCompany('123id', spy);
    expect(data).to.be.equal(false);
    expect(spy.calledWith(dataCompany.params.id)).to.be.false;
    sandbox.assert.calledOnce(spy);
  });
});
