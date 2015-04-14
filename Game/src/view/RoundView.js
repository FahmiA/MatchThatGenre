define(function() {

    var RoundView = function(roundNumberElement) {
        this._roundNumberElement = roundNumberElement;
    };
    
    RoundView.prototype = {
        _round: 1,
        
        getRound: function() {
            return this._round;
        },
        
        increment: function() {
            this._round++;
        },
        
        reset: function() {
            this._round = 1;
        }
    };
    
    return RoundView;
});