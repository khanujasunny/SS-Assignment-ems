process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server.js');


describe('GET employee', () => {
  it('OK, getting all employee', (done) => {
    request(app).get('/employee/list')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.greaterThanOrEqual(1);
        done();
      })
      .catch((err) => done(err));
  });



  var test_id='';
  it('OK, insert an employee', (done) => {
    var testInsertData = {"fullName":"test","email":"test@gmail.com","mobile":"123456789","city":"testCity", "_id": ''};

    request(app).post('/employee').send(testInsertData)
          .end((res, resInsert) => {
           const body = resInsert.body;
           expect( body).to.contain.property('_id');
            test_id=resInsert.body._id;
            done();
          });
  });
  

  it('OK, delete employee', async () => {

    await request(app).get('/employee/getemaildetail/test@gmail.com')
      .then((resdel) => {
        test_id=resdel.body._id;
        
        request(app).get('/employee/delete/'+resdel.body._id)
        .end((res, resdeleted) => {
          expect(resdeleted.statusCode).to.equal(200);
        });

      })
      .catch((err) => done(err));
      // done(test_id);
        
  });

  it(' OK, update and employee', (done) => {
    var testInsertData = {"fullName":"sam1","email":"sam@gmail.com","mobile":"123456789","city":"testCity", "_id": '616be0560a8221c3eb5f0a90'};

    request(app).post('/employee').send(testInsertData)
          .end((res,resUpdate) => {
            done();
          });
  });

})