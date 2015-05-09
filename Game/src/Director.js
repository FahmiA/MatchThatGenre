define([
            'view/RoundView',
            'view/PlayerView',
            'view/GenreOptionsView',
            'albumbackground/AlbumBackground',
            'model/GenreGraph',
            'model/RoundMaker',
            'model/SongBank'
        ],
        function(RoundView, PlayerView, GenreOptionsView, AlbumBackground, GenreGraph, RoundMaker, SongBank) {

    var Director = function() {
        // Construct the views
        this._round = this._makeRoundView();
        this._player = this._makePlayerView();
        this._background = this._makeAlbumBackground();
        this._genreOptions = this._makeGenreOptions();
        
        var genreGraph = new GenreGraph();
        var roundMaker = new RoundMaker(genreGraph);
        var songBank = new SongBank();
        
        genreGraph.load()
            .then(function() {
                return roundMaker.makeFirstRound('pop');
            })
            .then(function(round) {
                var limit = Math.min(4, round.getDecoyGenres().length);
                var genres = round.getDecoyGenres().slice(0,  limit)
                    .map(function(genreNode) {
                        return genreNode.name;
                    });
                this._genreOptions.setGenres(genres);
            
                return round;
            }.bind(this))
            .then(function(round) {
                return songBank.getSongForGenre(round.getTargetGenre().name);
            })
            .then(function(song) {
                this._player.setSong(song);
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