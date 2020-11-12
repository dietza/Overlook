const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

describe('fetchApi', function() {

  before(function() {
    global.fetchApi = {};
    chai.spy.on(fetchApi, ['', '', '', '', '', '', ''], () => {})
  });


});
