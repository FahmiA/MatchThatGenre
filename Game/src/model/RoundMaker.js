define(['./Round', '../util/ArrayUtil'], function(Round, ArrayUtil) {
    var RoundMaker = function(genreGraph) {
        this._genreGraph = genreGraph;
        this._nextGenre = null;
    };
    
    RoundMaker.prototype = {
        INITIAL_SIMILARITY: 0.7,
        
        makeFirstRound: function(genre) {
            this._nextGenre = genre;
            
            return this.makeNextRound(1);
        },
        
        makeNextRound: function(round) {
            var maxSimilarity = this.INITIAL_SIMILARITY - ((round - 1) / 0.5);
            console.log('Round ' + round + ', with max genre similarity of ' + maxSimilarity);
            
            var nextGenreNode = null;
            return this._genreGraph.getGenre(this._nextGenre)
                .then(function(genreNode) {
                    nextGenreNode = genreNode;
                    return this._genreGraph.getNeighbours(this._nextGenre, maxSimilarity);
                }.bind(this))
                .then(function(neighbourGenreNodes) {
                    ArrayUtil.shuffle(neighbourGenreNodes);
                
                    var randomIndex = parseInt(Math.random() * neighbourGenreNodes.length);
                    this._nextGenre = neighbourGenreNodes[randomIndex].genre;
                
                    var round = new Round(nextGenreNode, neighbourGenreNodes, round);
                
                    return round;
                }.bind(this));
        }
    };
    
    return RoundMaker;
});