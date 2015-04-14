define(function() {
    var RoundMaker = function(genreGraph) {
        this._genreGraph = genreGraph;
    };
    
    RoundMaker.prototype = {
        makeFirstRound: function(genre) {
        },
        
        makeNextRound: function(round) {
        }
    };
    
    return RoundMaker;
});