var request = require('request');
var util = require('util');

module.exports = function(options) {

  var apiKey = options['api_key'];
  var apiBase = options['api_base'];

  /*//http://ip:port + HTTP_ROOT + /api?apikey=$apikey&cmd=$command
  API methods

  */
  /** Internal methods **/
  function _getApiUrl(cmd) {
    if (options['api_key'] === undefined) {
      throw err;
    }

    return util.format('/api?%s=$apiKey&cmd=$%s',apiBase,apiKey,cmd);
  }

  function _request() {

  }

  return {
  /** Library specific methods **/
    /*
    Sets the api key
    */
    setApiKey: function(newApiKey) {
      apiKey = newApiKey;
    },

    /*
    Sets the api base, e.g. 'http://ip:port/HTTP_ROOT'
    */
    setApiBase: function(newApiBase) {
      apiBase = newApiBase;
    },

  /** Headphones API methods **/
    /*
    getIndex
    Fetch data from index page.
    Returns:
    ArtistName, ArtistSortName, ArtistID, Status, DateAdded,
    [LatestAlbum, ReleaseDate, AlbumID],
    HaveTracks, TotalTracks, IncludeExtras, LastUpdated,
    [ArtworkURL, ThumbURL]: a remote url to the artwork/thumbnail.

    To get the cached image path, see getArtistArt command. ThumbURL is added/updated when an artist is added/updated.
    If your using the database method to get the artwork, it's more reliable to use the ThumbURL than the ArtworkURL)
    */
    getIndex: function(callback) {
      request(_getApiUrl('getIndex'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getArtist&id=$artistid
    Fetch artist data. returns the artist object (see above) and album info: Status, AlbumASIN, DateAdded,
    AlbumTitle, ArtistName, ReleaseDate, AlbumID, ArtistID, Type, ArtworkURL: hosted image path.
    For cached image, see getAlbumArt command)
    */
    getArtist: function(artistId, callback) {
      request(_getApiUrl('getArtist&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getAlbum&id=$albumid
    Fetch data from album page. Returns the album object, a description object and a tracks object. Tracks contain: AlbumASIN, AlbumTitle, TrackID, Format, TrackDuration (ms), ArtistName, TrackTitle, AlbumID, ArtistID, Location, TrackNumber, CleanName (stripped of punctuation /styling), BitRate)
    */
    getAlbum: function(albumId, callback) {
      request(_getApiUrl('getAlbum&id=$' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getUpcoming
    Returns: Status, AlbumASIN, DateAdded, AlbumTitle, ArtistName, ReleaseDate, AlbumID, ArtistID, Type
    */
    getUpcoming: function(callback) {
      request(_getApiUrl('getUpcoming'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getWanted
    Returns: Status, AlbumASIN, DateAdded, AlbumTitle, ArtistName, ReleaseDate, AlbumID, ArtistID, Type
    */
    getWanted: function(callback) {
      request(_getApiUrl('getWanted' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getSimilar
    Returns similar artists - with a higher "Count" being more likely to be similar. Returns: Count, ArtistName, ArtistID
    */
    getSimilar: function(callback) {
      request(_getApiUrl('getSimilar' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getHistory
    Returns: Status, DateAdded, Title, URL (nzb), FolderName, AlbumID, Size (bytes)
    */
    getHistory: function(callback) {
      request(_getApiUrl('getHistory' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getLogs
    Not working yet
    */
    getLogs: function(callback) {
      callback('getLogs not implemented by headphones yet!');
    },

    /*
    findArtist&name=$artistname[&limit=$limit]
    Perform artist query on musicbrainz. Returns: url, score, name, uniquename (contains disambiguation info), id)
    */
    findArtist: function(artistName, limit, callback) {
      if (!callback && typeof limit 'Function') {
        callback = limit;
      }
      var url = limit ? _getApiUrl('findArtist&name=$' + artistName + '&limit=$' + limit) ||  _getApiUrl('findArtist&name=$' + artistName);
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    findAlbum&name=$albumname[&limit=$limit]
    Perform album query on musicbrainz. Returns: title, url (artist), id (artist), albumurl, albumid, score, uniquename (artist - with disambiguation)
    */
    findAlbum: function(albumName, limit, callback) {
      if (!callback && typeof limit 'Function') {
        callback = limit;
      }
      var url = limit ? _getApiUrl('findAlbum&name=$' + albumName + '&limit=$' + limit) ||  _getApiUrl('findAlbum&name=$' + albumName);
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    addArtist&id=$artistid
    Add an artist to the db by artistid)
    */
    addArtist: function(artistId, callback) {
      request(_getApiUrl('addArtist&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    addAlbum&id=$releaseid
    Add an album to the db by album release id
    */

    addAlbum: function(releaseid, callback) {
      request(_getApiUrl('addAlbum&id=$' + releaseid), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    delArtist&id=$artistid
    Delete artist from db by artistid)
    */
    delArtist: function(artistId, callback) {
      request(_getApiUrl('delArtist&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    pauseArtist&id=$artistid
    Pause an artist in db)
    */
    pauseArtist: function(artistId, callback) {
      request(_getApiUrl('pauseArtist&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    resumeArtist&id=$artistid

    Resume an artist in db)
    */
    resumeArtist: function(artistId, callback) {
      request(_getApiUrl('resumeArtist&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    refreshArtist&id=$artistid
    Refresh info for artist in db from musicbrainz
    */
    refreshArtist: function(artistId, callback) {
      request(_getApiUrl('refreshArtist&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    queueAlbum&id=$albumid[&new=True&lossless=True]
    Mark an album as wanted and start the searcher. Optional paramters: 'new' looks for new versions, 'lossless' looks only for lossless versions
    */
    queueAlbum: function(albumId, isNew, lossless, callback) {
      if (!callback && typeof isNew 'Function') {
        callback = isNew;
      } else if (!callback && typeof lossless 'Function') {
        callback = lossless;
      }

      var url = _getApiUrl('queueAlbum&name=$' + albumId);
      if (typeof isNew 'Boolean') {
        url = isNew ? url + '&new=True' : url + '&new=False';
      }
      if (typeof lossless 'Boolean') {
        url = lossless ? url + '&lossless=True' : url + '&lossless=False';
      }

      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    unqueueAlbum&id=$albumid
    Unmark album as wanted / i.e. mark as skipped
    */
    unqueueAlbum: function(albumId, callback) {
      request(_getApiUrl('unqueueAlbum&id=$' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    forceSearch

    force search for wanted albums - not launched in a separate thread so it may take a bit to complete
    */
    forceSearch: function(callback) {
      request(_getApiUrl('forceSearch'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    forceProcess
    Force post process albums in download directory - also not launched in a separate thread
    */
    forceProcess: function(callback) {
      request(_getApiUrl('forceProcess'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    forceActiveArtistsUpdate
    force Active Artist Update - also not launched in a separate thread
    */
    forceActiveArtistsUpdate: function(callback) {
      request(_getApiUrl('forceActiveArtistsUpdate'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getVersion
    Returns some version information: git_path, install_type, current_version, installed_version, commits_behind
    */
    getVersion: function(callback) {
      request(_getApiUrl('getVersion'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    checkGithub
    Updates the version information above and returns getVersion data
    */
    checkGithub: function(callback) {
      request(_getApiUrl('checkGithub'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    shutdown
    Shut down headphones
    */
    shutdown: function(callback) {
      request(_getApiUrl('shutdown'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    restart
    Restart headphones
    */
    restart: function(callback) {
      request(_getApiUrl('restart'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    update
    Update headphones - you may want to check the install type in get version and not allow this if type==exe
    */
    update: function(callback) {
      request(_getApiUrl('update'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getArtistArt&id=$artistid
    Returns either a relative path to the cached image, or a remote url if the image can't be saved to the cache dir
    */
    getArtistArt: function(artistId, callback) {
      request(_getApiUrl('getArtistArt&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    EndPoint: getAlbumArt&id=$albumid
    Description: see above
    */
    getAlbumArt: function(albumId, callback) {
      request(_getApiUrl('getAlbumArt&id=$' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getArtistInfo&id=$artistid
    Returns Summary and Content, both formatted in html.
    */
    getArtistInfo: function(artistId, callback) {
      request(_getApiUrl('getArtistInfo&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getAlbumInfo&id=$albumid
    See above, returns Summary and Content.
    */
    getAlbumInfo: function(albumId, callback) {
      request(_getApiUrl('getAlbumInfo&id=$' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getArtistThumb&id=$artistid
    Returns either a relative path to the cached thumbnail artist image, or an http:// address if the cache dir can't be written to.
    */
    getArtistThumb: function(artistId, callback) {
      request(_getApiUrl('getArtistThumb&id=$' + artistId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    getAlbumThumb&id=$albumid
    See above.
    */
    getAlbumThumb: function(albumId, callback) {
      request(_getApiUrl('getAlbumThumb&id=$' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    choose_specific_download&id=$albumid
    Gives you a list of results from searcher.searchforalbum(). Basically runs a normal search, but rather than sorting them and downloading the best result, it dumps the data, which you can then pass on to download_specific_release(). Returns a list of dictionaries with params: title, size, url, provider & kind - all of these values must be passed back to download_specific_release
    */
    chooseSpecificDownload: function(albumId, callback) {
      request(_getApiUrl('choose_specific_download&id=$' + albumId), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    },

    /*
    download_specific_release&id=albumid&title=$title&size=$size&url=$url&provider=$provider&kind=$kind
    Allows you to manually pass a choose_specific_download release back to searcher.send_to_downloader()
    */
    downloadSpecificRelease: function(albumId, title, size, url, provider, kind, callback) {
      var url = util.format('%s&id=%s&title=$%s&size=$%s&url=$%s&provider=$%s&kind=$%s', _getApiUrl('download_specific_release'), albumId, title, size, url, provider, kind);
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(body);
        } else {
          callback(err);
        }
      });
    }
  }
}
