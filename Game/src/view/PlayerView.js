define(function() {

    var PlayerView = function(cfg) {
        this._titleElement = cfg.titleElement;
        this._artistElement = cfg.artistElement;
        this._playButtonElement = cfg.playButtonElement;
    };
    
    PlayerView.prototype = {
        setSong: function(song) {
        },
        
        play: function() {
        },
        
        pause: function() {
        }
    };
    
    return PlayerView;
});