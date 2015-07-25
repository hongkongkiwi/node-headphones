var headphones = require('../index');
var chai = require('chai');
var expect = chai.expect;
//var nock = require('nock');
var fs = require('fs');

var hpApi;

function loadFile(file) {
  return fs.readFileSync(__dirname + '/replies/' + file + '.txt', 'utf8').toString();
}

describe('Headphones', function() {
  var server = undefined;

  before(function(done) {
    /*server = nock(process.env['HEADPHONES_API_BASE'])
                    .get('/api?apikey=' + process.env['HEADPHONES_API_KEY'] + '&cmd=getIndex')
                    .reply(200, loadFile('index'), {'content-type': 'text/html'});*/
    done();
  });

  beforeEach(function(done) {
    hpApi = headphones({saveResponses: true});
    done();
  });

  describe('#getIndex()', function () {
    it('should get index properly', function (done) {
      hpApi.getIndex(function(err, result) {
        if (err) { return done(err); }
        expect(result).exists;
        if (server) { server.done(); }
        done();
      });
    });
    //getAlbum
    //getArtist

    /*it('should fail with an invalid api key', function (done) {
      done()
    });
    it('should fail with an invalid api base', function (done) {
      done();
    });*/
  });
  describe('#getUpcoming()', function () {
    it('should work', function (done) {
      hpApi.getUpcoming(function(err, result) {
        if (err) { return done(err); }
        expect(result).exists;
        if (server) { server.done(); }
        done();
      });
    });
  });
  describe('#getWanted()', function () {
    it('should work', function (done) {
      hpApi.getWanted(function(err, result) {
        if (err) { return done(err); }
        expect(result).exists;
        if (server) { server.done(); }
        done();
      });
    });
  });
  describe('#getSimilar()', function () {
    it('should work', function (done) {
      hpApi.getSimilar(function(err, result) {
        if (err) { return done(err); }
        expect(result).exists;
        if (server) { server.done(); }
        done();
      });
    });
  });
  describe('#getHistory()', function () {
    it('should work', function (done) {
      hpApi.getHistory(function(err, result) {
        if (err) { return done(err); }
        expect(result).exists;
        if (server) { server.done(); }
        done();
      });
    });
  });
  // It's not defined at the moment! So we expect it won't work
  describe('#getLogs()', function () {
    it('should not work', function (done) {
      hpApi.getLogs(function(err, result) {
        expect(err).to.exist;
        //if (err) { return done(err); }
        if (server) { server.done(); }
        done();
      });
    });
  });
  //findArtist
  //findAlbum
  //addArtist
  //addAlbum
  //delArtist
  //pauseArtist
  //resumeArtist
  //refreshArtist
  //queueAlbum
  //unqueueAlbum
  //forceSearch
  //forceProcess
  //forceActiveArtistsUpdate
  //getVersion
  describe('#checkGithub()', function () {
    it('should work', function (done) {
      hpApi.checkGithub(function(err, result) {
        if (err) { return done(err); }
        expect(result).exists;
        if (server) { server.done(); }
        done();
      });
    });
  });
  shutdown
  restart
  update
  getArtistArt
  getAlbumArt
  getArtistInfo
  getAlbumInfo
  getArtistThumb
  getAlbumThumb
  chooseSpecificDownload
  downloadSpecificRelease
});
