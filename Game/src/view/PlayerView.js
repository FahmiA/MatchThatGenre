define(function() {

    var PlayerView = function(cfg) {
        this._titleElement = cfg.titleElement;
        this._artistElement = cfg.artistElement;
        this._playButtonElement = cfg.playButtonElement;
        
        this._song = null;
        this.update();
    };
    
    PlayerView.prototype = {
        setSong: function(song) {
            this._song = song;
            this.update();
        },
        
        play: function() {
        },
        
        pause: function() {
        },
        
        update: function() {
            if(this._song != null) {
                this._titleElement.innerText = this._song.getName();
                this._artistElement.innerText = this._song.getArtist();
            } else {
                this._titleElement.innerText = 'Nothing';
                this._artistElement.innerText = 'No-one';
            }
        }
    };
    
    return PlayerView;
});