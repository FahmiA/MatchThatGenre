define(function () {
    /** A collection of generic Promise helper methods */
    var PromiseUtil = {
        
        /** An asynchronous while loop.
         *  Repeatedly Performs an action-function until a condition-function returns true.
         * 
         * @param condition Function evaluated once before the action-function is called. Should return true or false.
         * @param action Function which is evaluated after the condition-function returns false. Should return a promise.
         * @returns The output of the last action.
         */
        promiseWhile: function (condition, action) {
            var loop = function (result) {
                if (!condition(result)) {
                    return Promise.resolve(result);
                }
                
                return Promise.resolve(action())
                              .then(loop);
            };
            
            return Promise.resolve(loop());
        }
    };

    return PromiseUtil;
});