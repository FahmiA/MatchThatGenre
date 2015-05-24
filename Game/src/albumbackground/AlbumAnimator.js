define(['../util/ArrayUtil'], function(ArrayUtil) {
	var AlbumAnimator = function() {
		this._genreImageMap = {};
	};
	
	AlbumAnimator.prototype = {
		setAlbumCovers: function(albumCoverMap, templates) {
			this._genreImageMap = {};
			
			// Shuffle all album covers across all genres
			var albumCoverList = [];
			Object.keys(albumCoverMap).forEach(function(genre) {
				var albumCovers = albumCoverMap[genre];
				albumCovers.forEach(function (albumCover) {
					albumCoverList.push({
						url: albumCover,
						genre: genre
					});
				});
			});
			
			albumCoverList = ArrayUtil.shuffle(albumCoverList);
			
			// Apply album covers to templates
			templates.forEach(function(template, i) {
				var imageElements = template.getImageElements();
				imageElements.forEach(function(imageElement, j) {
					imageElement.addEventListener('load', this._markAlbumLoaded);
					imageElement.src = albumCoverList[i + j].url;
					
					this._genreImageMap[albumCoverList[i + j].genre] = imageElement;
				}, this);
			}, this);
		},
		
		_markAlbumLoaded: function(event) {
			var imageElement = event.target;
			imageElement.classList.add('loaded');
		}
	};
	
	return AlbumAnimator;
});