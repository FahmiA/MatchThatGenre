define(function() {
    var Song = function(name, artist, album, year, previewURL) {
        this._name = name;
        this._artist = artist; // or artists (array)?
        this._album = album;
        this._year = parseInt(year); // Just being safe
        this._previewURL = previewURL;
    };
    
    Song.prototype = {
        getName: function() {
            return this._name;
        },
        
        getArtist: function() {
            return this._artist;
        },
        
        getPreviewURL: function() {
            return this._previewURL;
        }
    };
    
    return Song;
});