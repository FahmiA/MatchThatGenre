define(function() {

    var RoundView = function(containerElement) {
        this._containerElement = containerElement;
        
        this._genres = [];
        
        this.update();
    };
    
    RoundView.prototype = {
        
        setGenres: function(genres) {
            this._genres = genres;
            this.update();
        },
        
        update: function() {
            // Clear children
            while (this._containerElement.firstChild) {
                this._containerElement.removeChild(this._containerElement.firstChild);
            }
            
            // Create list
            var list = document.createElement('ul');
            
            // Create list items
            this._genres.forEach(function(genre) {
                    var item = document.createElement('li');
                    item.textContent = genre;
                    list.appendChild(item);
                });
            
            this._containerElement.appendChild(list);
        }
    };
    
    return RoundView;
});