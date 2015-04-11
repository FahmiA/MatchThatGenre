require(['./albumbackground/AlbumBackground'],
        function(AlbumBackground) {
    
    var backgroundDiv = document.querySelector('#album-background');
    var albumBackground = new AlbumBackground(backgroundDiv);
    albumBackground.create();
//    alert(!!AlbumBackground);
});