var headphones = require('../index');
var chai = require('chai');
var expect = chai.expect;
require('dotenv').load();

var options = {
  apiKey: "",
  apiBase: ""
}

var hpApi = headphones(options);

describe('Headphones', function() {
  describe('#index()', function () {
    it('should get index properly', function () {

    });
    it('should fail with an invalid api key', function () {

    });
    it('should fail with an invalid api base', function () {

    });
  });
});
