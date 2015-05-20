define(function() {
    // NOTE: Could use HTML templates, but not yet supported by IE
    
    var Template2x2 = function() {
        this._albumImages = [];
    };
    
    Template2x2.prototype = {
        getPositions: function() {
            return 2;
        },
        
        create: function() {
            var containerElement = document.createElement('div');
            containerElement.className = 'album-template album-template-2x2';
            
            for(var i = 0; i < 4; i++) {
                var albumImg = document.createElement('img');
                albumImg.className = 'album-cover';
                this._albumImages.push(albumImg);
                
                containerElement.appendChild(albumImg);
            }
            
            return containerElement;
        },
        
        getImageElements: function(albumCoverURLs) {
            return this._albumImages;
        }
    };
    
    var Template1x1 = function() {
        this._albumImages = [];
    };
    
    Template1x1.prototype = {
        getPositions: function() {
            return 1;
        },
        
        create: function() {
            var containerElement = document.createElement('div');
            containerElement.className = 'album-template album-template-1x1';
            
            var albumImg = document.createElement('img');
            albumImg.className = 'album-cover album-big';
            this._albumImages.push(albumImg);
            
            containerElement.appendChild(albumImg);
            
            return containerElement;
        },
        
        getImageElements: function(albumCoverURLs) {
            return this._albumImages;
        }
    };
    
    var templates = [
        Template2x2,
        Template1x1
    ];
    
    return templates;
    
});