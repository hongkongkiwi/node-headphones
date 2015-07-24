var headphones = require('../index');
var chai = require('chai');
var expect = chai.expect;

var options = {
  apiKey: "",
  apiBase: ""
}

var hpApi = headphones(options);

describe('Headphones', function() {
  describe('#index()', function () {
    it('', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
