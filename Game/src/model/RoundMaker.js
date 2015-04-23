define(function() {
    var RoundMaker = function(genreGraph) {
        this._genreGraph = genreGraph;
        this._nextGenre = null;
    };
    
    RoundMaker.prototype = {
        INITIAL_DISTANCE: 4,
        
        makeFirstRound: function(genre) {
            this._nextGenre = genre;
            
            return this.makeNextRound(1);
        },
        
        makeNextRound: function(round) {
            var neighbours = this._genreGraph.getNeighbours(this._nextGenre, this.INITIAL_DISTANCE - round - 1);
            neighbours.push(this._nextGenre);
            
            this._shuffle(neighbours);
            
            var randomIndex = parseInt(Math.random() * neighbours.length);
            this._nextGenre = neighbours[randomIndex].genre;
            
            return neighbours;
        },
        
        _shuffle: function(o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
    };
    
    return RoundMaker;
});