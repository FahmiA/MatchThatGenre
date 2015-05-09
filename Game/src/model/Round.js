define(function() {
    var Round = function(targetGenreNode, decoyGenreNodes, number) {
        this._targetGenreNode = targetGenreNode;
        this._decoyGenreNodes = decoyGenreNodes.slice(); // Clone
        this._number = number;
    };
    
    Round.prototype = {
        getTargetGenre: function() {
            return this._targetGenreNode;
        },
        
        getDecoyGenres: function() {
            return this._decoyGenreNodes;
        },
        
        getAllGenres: function() {
            return ['Rock', 'Hip-Hop', 'Funk', 'Electric']; 
        },
        
        getNumber: function() {
            return this._number;
        }
    };
    
    return Round;
});