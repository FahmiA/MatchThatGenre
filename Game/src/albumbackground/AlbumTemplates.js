define(function() {
    // NOTE: Could use HTML templates, but not yet supported by IE
    var templates = [
        {
            create: function() {
                var container = document.createElement('div');
                container.className = 'album-template album-template-2x2';
                
                for(var i = 0; i < 4; i++) {
                    var albumDiv = document.createElement('div');
                    albumDiv.className = 'album-cover album-' + (i + 1)
                    container.appendChild(albumDiv);
                }
                
                
                return container;
            }
        },
        {
            create: function() {
                var container = document.createElement('div');
                container.className = 'album-template album-template-1x1';
                
                var albumDiv = document.createElement('div');
                albumDiv.className = 'album-cover album-big album-' + 5;
                container.appendChild(albumDiv);
                
                return container;
            }
        }
    ];
    
    return templates;
    
});