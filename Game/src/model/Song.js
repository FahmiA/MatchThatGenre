define(function() {
    var Song = function(name, artist, album, year) {
        this._name = name;
        this._artist = artist; // or artists (array)?
        this._album = album;
        this._year = patseInt(year); // Just being safe
    };
    
    Song.prototype = {
    };
    
    return Song;
});