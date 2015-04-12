define(['./AlbumTemplates'], function(AlbumTemplates) {
    var AlbumBackground = function(contentElement) {
        this._containerElement = contentElement;
    };
    
    AlbumBackground.prototype = {
        create: function() {
            // Each template has 20% width and height, hence 5 per row and
            // as many high as can fit.
            
            for(var row = 0; row < 10; row++) {
                for(var col = 0; col < 5; col++) {
                    var templateIndex = Math.floor(Math.random() * AlbumTemplates.length * 2);
                    templateIndex = (templateIndex === 1) ? templateIndex : 0;
                    var template = AlbumTemplates[templateIndex];
                    var element = template.create();
                    this._containerElement.appendChild(element);
                }
            }
        },
        
        highlight: function(id) {
            var fullID = 'album-' + id;
            
            var albumCoversNodeList = document.querySelectorAll('.album-cover');
            var albumCovers = Array.prototype.slice.call(albumCoversNodeList);
            
            for(var i = 0; i < albumCovers.length; i++) {
                var albumCover = albumCovers[i];
                
                if(albumCover.classList.contains(fullID)) {
                    this._delayHighlightAlbumCover(albumCover);
                } else {
                    this._delayLowlightAlbumCover(albumCover);
                    
                }
            }
            
        },
        
        _delayHighlightAlbumCover: function(albumCover) {
            var delayMs = this._calculateAnimationDelayMs();
            
            setTimeout(function() {
                albumCover.classList.remove('lowlight');
                albumCover.classList.add('highlight');
            }, delayMs);
        },
        
        _delayLowlightAlbumCover: function(albumCover) {
            var delayMs = this._calculateAnimationDelayMs();
            
            if(albumCover.classList.contains('highlight')) {
                setTimeout(function() {
                    albumCover.classList.remove('highlight');
                    albumCover.classList.add('lowlight');
                }, delayMs);
            }
        },
        
        _calculateAnimationDelayMs: function() {
            var minTimeMs = 0;
            var maxTimeMs = 700;
            
            var rangeTimeMs = maxTimeMs - minTimeMs;
            return minTimeMs + (Math.random() * rangeTimeMs);
        }
    };
    
    return AlbumBackground;
});