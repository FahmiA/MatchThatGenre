define(function () {
    /** A collection of generic Array helper methods */
    var ArrayUtil = {
        /** Shuffle the values in an array. */
        shuffle: function(o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },
        
        /** Remove duplicate values in an array */
        unique: function(values) {
            var valueMap = {};
            
            for(var i = 0; i < values.length; i++) {
                valueMap[values[i]] = true;
            }
            
            return Object.keys(valueMap);
        },
        
        /** Flatten a 2D array */
        flatten: function(values) {
            var result = [];
            
            for(var i = 0; i < values.length; i++) {
                result = result.concat(values[i]);
            }
            
            return result;
        }
    };

    return ArrayUtil;
});