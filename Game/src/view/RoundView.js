define(function() {

    var RoundView = function(roundNumberElement) {
        this._roundNumberElement = roundNumberElement;
        this.update();
    };
    
    RoundView.prototype = {
        _round: 1,
        
        getRound: function() {
            return this._round;
        },
        
        increment: function() {
            this._round++;
            this.update();
        },
        
        reset: function() {
            this._round = 1;
            this.update();
        },
        
        update: function() {
            this._roundNumberElement.innerText = this._round;
        }
    };
    
    return RoundView;
});