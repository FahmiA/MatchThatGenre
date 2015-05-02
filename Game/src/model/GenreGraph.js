define(['./SimpleURL'], function(SimpleURL) {
    var ECHO_NEST_API_KEY = 'KVBFT8M5F51MGFGCF';
    
    var GenreGragh = function() {
        this._genres = {};
    };
    
    GenreGragh.prototype = {
        load: function() {
            var url = new SimpleURL('http://developer.echonest.com/api/v4/genre/list');
            url.addParameter('api_key', ECHO_NEST_API_KEY)
               .addParameter('format', 'json')
               .addParameter('results', 2000);
            
            var urlString = url.toString();
            return this.loadFromURL(urlString);
        },
        
        loadFromURL: function(url) {
            return fetch(url)
                    .then(this._parseJSON)
                    .then(this._loadGenreList.bind(this));
        },
        
        getGenre: function(genre) {
            var url = new SimpleURL('http://developer.echonest.com/api/v4/genre/profile');
            url.addParameter('api_key', ECHO_NEST_API_KEY)
               .addParameter('format', 'json')
               .addParameter('bucket', 'description')
               .addParameter('bucket', 'urls')
               .addParameter('name', genre);
            
            var urlString = url.toString();
            return this.getGenreFromURL(urlString);
        },
        
        getGenreFromURL: function(url) {
            return fetch(url)
                .then(this._parseJSON)
                .then(this._parseGenreNode);
        },
        
        getNeighbours: function(genre, similarity) {
            var url = new SimpleURL('http://developer.echonest.com/api/v4/genre/similar');
            url.addParameter('api_key', ECHO_NEST_API_KEY)
               .addParameter('format', 'json')
               .addParameter('bucket', 'description')
               .addParameter('bucket', 'urls')
               .addParameter('name', genre);
            
            var urlString = url.toString();
            return this.getNeighboursFromURL(urlString, genre, similarity);
            
        },
        
        getNeighboursFromURL: function(url, genre, similarity) {
            if(this._genres[genre] == null) {
                throw new Error('Cannot query similar genres because genre "' + genre + '" is not found.');
            }
            
            if(similarity == null || similarity < 0) {
                return Promise.resolve([]);
            }
            
            return fetch(url)
                    .then(this._parseJSON)
                    .then(this._parseGenreNeighbourNodes.bind(this))
                    .then(this._filterGenreNeighbours.bind(this, similarity));
        },
        
        _parseJSON: function(response) {
            return response.json()
                .then(function(jsonResponse) {
                    return jsonResponse.response;
                });
        },
        
        _loadGenreList: function(jsonResponse) {
            var genreListJSON = jsonResponse.genres;
            
            this._genres = {};
            genreListJSON.forEach(function(genreJSON) {
                this._genres[genreJSON.name] = true;
            }.bind(this));
            
            return this._genres;
        },
        
        _parseGenreNode: function(jsonResponse) {
            var genres = jsonResponse.genres;
            
            if(genres.length < 1) {
                throw new Error('Could not retrieve genre profile.');
            }
            
            var genreJSON = genres[0];
            return {
                name: genreJSON.name,
                description: genreJSON.description,
                urls: genreJSON.urls || {}
            };
        },
        
        _parseGenreNeighbourNodes: function(jsonResponse) {
            var genreNeighbourListJSON = jsonResponse.genres;
            
            return genreNeighbourListJSON.map(this._makeGenreNeighbourNode);
        },
        
        _makeGenreNeighbourNode: function(genreNeighbourJSON) {
            return {
                name: genreNeighbourJSON.name,
                description: genreNeighbourJSON.description,
                urls: genreNeighbourJSON.urls || {},
                similarity: genreNeighbourJSON.similarity
            };
        },
        
        _filterGenreNeighbours: function(similarity, genreNeighbourNodes) {
            return genreNeighbourNodes.filter(function(genreNeighbourNode) {
                return genreNeighbourNode.similarity < similarity;
            });
        }
        
    };
    
    return GenreGragh;
});