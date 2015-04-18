define([
            'view/RoundView',
            'view/PlayerView',
            'albumbackground/AlbumBackground',
            'model/GenreGraph'
        ],
        function(RoundView, PlayerView, AlbumBackground, GenreGraph) {

    var Director = function() {
        // Construct the views
        this._round = this._makeRoundView();
        this._player = this._makePlayerView();
        this._background = this._makeAlbumBackground();
        
        var genreGraph = new GenreGraph();
        genreGraph.load('TagGraph50k.json')
            .fail(function() {
                console.log('Failed to retrieve genre graph from server');
                console.log(arguments);
            });
                            
//        this._genreOptions = new GenreOptionsView();
        
        // Construct the game model
//        this._genreGraph = new GenreGraph();
    };
    
    Director.prototype = {
        
        _makeRoundView: function() {
            var roundNumberElement = document.querySelector('#round-number');
            var roundView = new RoundView(roundNumberElement);
            
            return roundView;
        },
        
        _makePlayerView: function() {
            var playerView = new PlayerView({
                titleElement: document.querySelector('#song-title'),
                artistElement: document.querySelector('#song-artist'),
                playButtonElement: document.querySelector('#play-button')
            });
            
            return playerView;
        },
        
        _makeAlbumBackground: function() {
            var backgroundDiv = document.querySelector('#album-background');
            var albumBackground = new AlbumBackground(backgroundDiv);
//            albumBackground.create();
            
            return albumBackground;
        }
    };
    
    return Director;
});