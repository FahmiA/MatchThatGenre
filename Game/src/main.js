require(['./albumbackground/AlbumBackground'],
        function(AlbumBackground) {
    
    var backgroundDiv = document.querySelector('#album-background');
    var albumBackground = new AlbumBackground(backgroundDiv);
    albumBackground.create();
    
    var genreOptionsNodeList = document.querySelectorAll('#genre-options > ul > li');
    var genreOptions = Array.prototype.slice.call(genreOptionsNodeList);
    genreOptions.forEach(function(genreOption, index) {
        genreOption.addEventListener('mouseover', function() {
            albumBackground.highlight(index + 2);
        });
    });
});