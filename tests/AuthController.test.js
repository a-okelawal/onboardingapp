import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

describe('Authentication', () => {
  describe('signup', () => {
    describe('allows', () => {
      it('signup with all valid requirements', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('test user was created successfully as a/an admin.');
            done();
          });
      });
    });

    describe('doesn\'t allow', () => {
      it('signup with an invalid name', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Name must have atleast first and last name.');
            done();
          });
      });

      it('signup with an invalid email', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'Te@co',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Email is invalid.');
            done();
          });
      });

      it('signup with an invalid password', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'pas',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Password is invalid. Must be at least 6 characters.');
            done();
          });
      });

      it('signup with no department', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Employee must belong to a department.');
            done();
          });
      });

      it('signup with an invalid phone number', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '080111100',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Phone number is invalid.');
            done();
          });
      });

      it('signup of duplicate user', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            role: 'admin',
          })
          .end((err, res) => {
            res.status.should.equal(409);
            res.body.error.should.equal('User with email already exists.');
            done();
          });
      });
    });
  });
});