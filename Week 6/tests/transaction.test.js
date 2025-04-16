const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

let createdId = null;

describe('Transactions', () => {
  it('should add a new transaction', (done) => {
    request(app)
      .post('/api/transactions')
      .send({ description: 'Groceries', amount: 50, type: 'expense' })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('description', 'Groceries');
        createdId = res.body._id;
        done(err);
      });
  });

  it('should retrieve all transactions', (done) => {
    request(app)
      .get('/api/transactions')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done(err);
      });
  });

  it('should delete a transaction by ID', (done) => {
    request(app)
      .delete(`/api/transactions/${createdId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('message', 'Transaction deleted');
        done(err);
      });
  });

  it('should not add a transaction with invalid data', (done) => {
    request(app)
      .post('/api/transactions')
      .send({ amount: 'NaN' })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});

it('should return 404 when trying to delete a non-existent transaction', (done) => {
  const fakeId = '661c28468fe2b9243a2b9011';
  request(app)
    .delete(`/api/transactions/${fakeId}`)
    .expect(404)
    .end((err, res) => {
      expect(res.body).to.have.property('error', 'Transaction not found');
      done(err);
    });
});

it('should return 400 if required fields are missing', (done) => {
  request(app)
    .post('/api/transactions')
    .send({ amount: 100 }) // Missing 'type'
    .expect(400)
    .end((err, res) => {
      expect(res.body).to.have.property('error');
      done(err);
    });
});

