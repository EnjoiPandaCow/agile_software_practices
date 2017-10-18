var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var datastore = require('../../models/donations.js');

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash');
var after = require("lodash");

describe('Donations', function(){
    beforeEach(function() {
        while(datastore.length > 0) {
            datastore.pop();
        }
        datastore.push(
            {id: 1000000, paymenttype: 'PayPal', amount: 1600, upvotes: 1}
        );
        datastore.push(
            {id: 1000001, paymenttype: 'Direct', amount: 1100, upvotes: 2}
        );
    });
    describe('GET /donations', function(){
        it('should return all the donations in an array', function(done) {
            chai.request(server)
                .get('/donations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    var result = _.map(res.body, function(donation) {
                        return {
                            id: donation.id,
                            amount: donation.amount
                            };
                        });
                    expect(result).to.include( { id: 1000000, amount: 1600} );
                    expect(result).to.include( { id: 1000001, amount: 1100} );
                    done();
                });
        });
    });
    describe('POST /donations', function() {
       it('should return confirmation message and update datastore', function(done) {
           var donation = {
               paymenttype: 'Visa',
               amount: 1200,
               upvotes: 0
           };
           chai.request(server)
               .post('/donations')
               .send(donation)
               .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.have.property('message').equal('Donation Added!' );
                   done();
               });
       });
       after(function(done) {
          chai.request(server)
              .get('/donations')
              .end(function(err, res) {
                  var result = _.map(res.body, function(donation) {
                      return {
                          payment: donation.paymenttype,
                          amount: donation.amount
                      };
                  });
                  expect(result).to.include({ paymenttype: 'Visa', amount: 1200});
                  done();
              });
       });
    });
    describe('PUT /donations/:id/votes', function() {
       it('should return all donations with specified donation upvoted by 1', function(done) {
           chai.request(server)
               .put('/donations/1000001/votes')
               .end(function(err, res) {
                  expect(res).to.have.status(200);
                  expect(res.body).be.be.a('array');
                  var result = _.map(res.body, function (donation) {
                     return {
                         id: donation.id,
                         upvotes: donation.upvotes
                     };
                  });
                  expect(result).to.include( {id: 1000001, upvotes: 3 });
                  done();
               });
       });
       it('should return a 404 status and message for invalid donation id', function(done) {
          chai.request(server)
              .put('/donations/1100001/votes')
              .end(function(err, res) {
                 expect(res).to.have.status(404);
                 expect(res.body).to.have.property('message').equal('Invalid Donation Id');
                 done();
              });
       });
    });
    describe('DELETE /donations/:id', function() {
       it('should delete a donation with the correct donation id', function(done) {
           chai.request(server)
               .delete('/donations/1000001')
               .end(function(err, res) {
                  expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   done();
                   });
               });
       it('should return a 404 status and message for invalid donation id', function(done) {
          chai.request(server)
              .delete('/donations/1001234')
              .end(function(err, res) {
                  expect(res).to.have.status(404);
                  expect(res.body).to.have.property('message').equal('Invalid Donation Id');
                  done();
              });
        });
       });
});

