require('dotenv').config();
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const UserCompany = require('../../src/app/models/UserCompany');
const server = require('../../src/server');
const request = require('supertest')(server);
const expect = chai.expect;
const User = require('../../src/app/models/User');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
chai.use(chaiHttp);
let req = {
  body: {
    _id: '1234567',
    email: 'testuser@exp.com',
    password: '12345678',
  },
};
let dataUserCompany = {
  id_company: '123456id',
  id_user: req.body._id,
  persona: 'buyer',
};

describe('store faker user', () => {
  it('should store user using test case', async () => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      _id: req.body._id,
      email: req.body.email,
      password: hashPassword,
    });
    await UserCompany.create(dataUserCompany);
  });
});
describe('test user login', () => {
  let sandbox;
  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should return status 401 when password or email wrong', (done) => {
    request
      .post('/user/login')
      .send({ email: 'test@gmail.com', password: '12445689' })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
      });
    done();
  });
  it('should return error when length must be at least 8 characters long', (done) => {
    request
      .post('/user/login')
      .send({ email: 'test@gmail.com', password: '12445' })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
      });
    done();
  });
  it('should return error when email must be a valid email', (done) => {
    request
      .post('/user/login')
      .send({ email: 'test@gma.co', password: '12445' })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
      });
    done();
  });
  it('should return error when email or password empty', (done) => {
    User.findOne = sandbox.stub(User, 'findOne').resolves({});
    User.findOne.withArgs({});
    request
      .post('/user/login')
      .send({})
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.body).to.have.property('error');
      });
    done();
  });
  it('should return status 200 when pass login', (done) => {
    User.findOne = sandbox.stub(User, 'findOne').resolves(req.body);
    User.findOne.withArgs({ email: req.body.email });
    request
      .post('/user/login')
      .send(req.body)
      .end(async (err, res) => {
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('token');
        expect(res.status).to.equal(200);
        expect(err).to.equal(null);
      });
    done();
  });
});
