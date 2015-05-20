define(['./AlbumTemplates', './AlbumAnimator', '../util/ArrayUtil'], function(AlbumTemplates, AlbumAnimator, ArrayUtil) {
    var AlbumBackground = function(contentElement) {
        this._containerElement = contentElement;
        this._albumAnimator = new AlbumAnimator();
    };
    
    AlbumBackground.prototype = {
        /** Display the provided album covers.
         * 
         * @param albumCoverMap Map from genre name to array of album cover URLs
         */
        setAlbumCovers: function(albumCoverMap) {
            // Remove all album cover templates
            this.clearAlbumCovers();
            
            // Create templates and tally count of available album cover positions
            var templates = this._createTemplates();
            var albumPositionCount = this._getAlbumPositionCount(templates);
            
            // Shuffle album covers
            var shuffledAlbumCoverMap = this._shuffleAlbumCovers(albumCoverMap);
            
            // Grow or shrink the number of album covers uniformally across all genres
            var normalisedAlbumCoverMap = this._adjustAlbumCoverQuantity(shuffledAlbumCoverMap, albumPositionCount);
            
            // Update templates with album covers
            this._albumAnimator.setAlbumCovers(normalisedAlbumCoverMap, templates);
        },
        
        clearAlbumCovers: function() {
            while(this._containerElement.firstChild) {
                this._containerElement.removeChild(this._containerElement.firstChild);
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
        
        _createTemplates: function() {
            var templates = [];
            
            // Each template has 20% width and height, hence 5 per row and
            // as many high as can fit.
            for(var row = 0; row < 10; row++) {
                for(var col = 0; col < 5; col++) {
                    var templateIndex = Math.floor(Math.random() * AlbumTemplates.length * 2);
                    templateIndex = (templateIndex === 1) ? templateIndex : 0;
                    
                    var template = new AlbumTemplates[templateIndex];
                    templates.push(template);
                    
                    var element = template.create();
                    this._containerElement.appendChild(element);
                }
            }
            
            return templates;
        },
        
        _getAlbumPositionCount: function(templates) {
            return templates.map(function(template) {
                    return template.getPositions();
                })
                .reduce(function(count, sum) {
                    return count + sum;
                }, 0);
        },
        
        _shuffleAlbumCovers: function(albumCoverMap) {
            var shuffledAlbumCoverMap = {};
            
            Object.keys(albumCoverMap).forEach(function(genre) {
                shuffledAlbumCoverMap[genre] = ArrayUtil.shuffle(albumCoverMap[genre]);
            });
            
            return shuffledAlbumCoverMap;
        },
        
        _adjustAlbumCoverQuantity: function(albumCoverMap, albumPositionCount) {
            var perGenreAlbumCount = Math.floor(albumPositionCount / Object.keys(albumCoverMap).length);
            
            var normalisedAlbumCoverMap = {};
            
            Object.keys(albumCoverMap).forEach(function(genre) {
                var albumCovers = albumCoverMap[genre];
                
                if(albumCovers && albumCovers.length > 0) {
                    if(albumCovers.length > perGenreAlbumCount) {
                        var normalisedAlbumCovers = albumCovers.slice(0, perGenreAlbumCount);
                        normalisedAlbumCoverMap[genre] = normalisedAlbumCovers;
                    } else { // albumCovers.length < perGenreAlbumCount
                        var normalisedAlbumCovers = [];
                        do {
                            normalisedAlbumCovers = normalisedAlbumCovers.concat(albumCovers.slice(0, Math.min(albumCovers.length, perGenreAlbumCount - albumCovers.length)));
                        } while(normalisedAlbumCovers.length < perGenreAlbumCount);
                        normalisedAlbumCoverMap[genre] = normalisedAlbumCovers;
                    }
                }
            });
            
            return normalisedAlbumCoverMap;
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