require('dotenv').config();
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const UserCompany = require('../../src/app/models/UserCompany');
const server = require('../../src/server');
const request = require('supertest')(server);
const handleUser = require('../../src/app/controllers/user/HandleUser');
const expect = chai.expect;
const User = require('../../src/app/models/User');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
chai.use(chaiHttp);
let dataUser = {
  _id: '1234567',
  email: 'testuser@exp.com',
  password: '12345678',
};
let dataUserCompany = {
  id_company: '123456id',
  id_user: dataUser._id,
  persona: 'buyer',
};
let error = { error: 'data not found' };
// describe('store faker user', () => {
//     it('should store user using test case', async () => {
//         const hashPassword = await bcrypt.hash(dataUser.password, 10);
//         await User.create({
//             _id: dataUser._id,
//             email: dataUser.email,
//             password: hashPassword,
//         });
//         await UserCompany.create(dataUserCompany);
//     });
// });
describe('test function {findOneUserByEmailAndPassword}', () => {
  let sandbox;
  let stub;
  let spy;
  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should return data user {findOneUserByEmailAndPassword} when found data', async () => {
    stub = sandbox.stub(handleUser, 'findOneUserByEmailAndPassword');
    stub
      .withArgs(dataUser.email, dataUser.password)
      .returns({ dataUser, dataUserCompany });
    expect(
      handleUser.findOneUserByEmailAndPassword(
        dataUser.email,
        dataUser.password,
      ),
    ).to.have.property('dataUser');
    expect(
      handleUser.findOneUserByEmailAndPassword(
        dataUser.email,
        dataUser.password,
      ),
    ).to.have.property('dataUserCompany');
  });

  it('should return error message when {findOneUserByEmailAndPassword} data not found', async () => {
    stub = sandbox.stub(handleUser, 'findOneUserByEmailAndPassword');
    stub.withArgs(dataUser.email, dataUser.password).returns({ error });
    expect(
      handleUser.findOneUserByEmailAndPassword(
        dataUser.email,
        dataUser.password,
      ),
    ).to.have.property('error');
  });

  it('should return an object {findOneUserByEmailAndPassword}', async () => {
    spy = sandbox.spy(handleUser, 'findOneUserByEmailAndPassword');
    const data = await handleUser.findOneUserByEmailAndPassword(
      dataUser.email,
      dataUser.password,
    );
    expect(data).to.be.a('Object');
    expect(spy.calledWith(dataUser.email, dataUser.password)).to.be.true;
    sandbox.assert.calledOnce(spy);
  });
});
