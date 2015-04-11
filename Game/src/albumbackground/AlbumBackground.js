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
        }
    };
    
    return AlbumBackground;
});