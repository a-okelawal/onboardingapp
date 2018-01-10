import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

describe('Authentication', () => {
  describe('signup', () => {
    describe('doesn\'t allow', () => {
      it ('signup with invalid username', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            username: 'Te',
            pasword: 'password',
            role: 'super'
          })
          .end((err, res) => {
            res.status.shoud.equal(400);
            res.body.message.should.equal('Username is invalid. it should be at least 5 characters.');
            done();
          });
      });
    });
  });
});