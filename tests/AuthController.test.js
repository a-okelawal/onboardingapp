import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

describe('Authentication', () => {
  describe('signup', () => {
    describe('doesn\'t allow', () => {
      it('signup with invalid email', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            email: 'Te',
            pasword: 'password',
            role: 'super'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('email is invalid. it should be at least 5 characters.');
            done();
          });
      });
    });
  });
});