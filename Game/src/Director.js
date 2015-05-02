define([
            'view/RoundView',
            'view/PlayerView',
            'view/GenreOptionsView',
            'albumbackground/AlbumBackground',
            'model/GenreGraph',
            'model/RoundMaker'
        ],
        function(RoundView, PlayerView, GenreOptionsView, AlbumBackground, GenreGraph, RoundMaker) {

    var Director = function() {
        // Construct the views
        this._round = this._makeRoundView();
        this._player = this._makePlayerView();
        this._background = this._makeAlbumBackground();
        this._genreOptions = this._makeGenreOptions();
        
        var genreGraph = new GenreGraph();
        this._roundMaker = new RoundMaker(genreGraph);
        
        genreGraph.load()
            .then(function() {
                return this._roundMaker.makeFirstRound('pop');
            }.bind(this))
            .then(function(genreNodes) {
                var limit = Math.min(4, genreNodes.length);
                var genres = genreNodes.slice(0,  limit)
                    .map(function(genreNode) {
                        return genreNode.name;
                    });
                this._genreOptions.setGenres(genres);
            }.bind(this));
                            
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
        },
        
        _makeGenreOptions: function() {
            var backgroundDiv = document.querySelector('#genre-options');
            var genreOptions = new GenreOptionsView(backgroundDiv);
            
            return genreOptions;
        }
    };
    
    return Director;
});