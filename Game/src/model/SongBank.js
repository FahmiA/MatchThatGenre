define(['./EchoNest', './SimpleURL', './Song', './PromiseUtil'], function(EchoNest, SimpleURL, Song, PromiseUtil) {
    var SongBank = function() {
    };
    
    SongBank.prototype = {
        getSongForGenre: function(genre) {
            return this._getGenreArtists(genre)
                    .then(this._getListenableTrack.bind(this))
                    .then(this._makeSong.bind(this));
        },
        
        _getGenreArtists: function(genre) {
            var url = new SimpleURL('http://developer.echonest.com/api/v4/genre/artists');
            url.addParameter('api_key', EchoNest.API_KEY)
               .addParameter('format', 'json')
               .addParameter('name', genre);
            
            var urlString = url.toString();
            return fetch(urlString)
                    .then(this._parseJSON);
        },
        
        _getListenableTrack: function(response) {
            var artists = response.artists || [];
            
            if(artists.length < 1) {
                throw new Error("No artists found for genre");
            }
            
            var trackURLs = artists.map(function(artist) {
                var url = new SimpleURL('http://developer.echonest.com/api/v4/song/search');
                url.addParameter('api_key', EchoNest.API_KEY)
                   .addParameter('format', 'json')
                   .addParameter('bucket', 'id:7digital-US')
                   .addParameter('bucket', 'tracks')
                   .addParameter('artist_id', artist.id);
                   
                var urlString = url.toString();
                return urlString;
            })
            
            // Loop through every track until one is found with a preview url.
            // Query the API one-by-one rather than all at once to preserve the API rate limit.
            var i = 0;
            return PromiseUtil.promiseWhile(
                function condition(result) {
//                    console.log('Condition: i = ' + i + ', listenableSongRecord = ' + !!listenableSongRecord);
                    return i < trackURLs.length && !result
                },
                function action() {
//                    console.log('Action: ' + trackURLs[i]);
                    return fetch(trackURLs[i++])
                            .then(this._parseJSON)
                            .then(this._getTrack)
                }.bind(this));
        },
        
        _getTrack: function(response) {
            var songs = response.songs || [];
            
            var listenableSong = null;
            for(var i = 0; i < songs.length && !listenableSong; i++) {
                var song = songs[i];
                
                var tracks = song.tracks;
                if(!tracks) {
                    continue;
                }
                
                for(var j = 0; j < tracks.length; j++) {
                    var track = tracks[j];
                    
                    if(track.preview_url) {
                        listenableSong = {
                            song: song,
                            track: track
                        };
                        
                        break;
                    }
                }
            }
            
            return listenableSong;
        },
        
        _makeSong: function(listenableSong) {
            var songRecord = listenableSong.song;
            var trackRecord = listenableSong.track;
            
            var song = new Song(songRecord.title, songRecord.artist_name, 'Unknown', -1, trackRecord.preview_url);
            return song;
        },
        
        _parseJSON: function(response) {
            return response.json()
                .then(function(jsonResponse) {
                    return jsonResponse.response;
                });
        }
    };
    
    return SongBank;
});