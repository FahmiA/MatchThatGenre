define(function() {
    var GenreGragh = function() {
        this._genreNodes = null;
    };
    
    GenreGragh.prototype = {
        load: function(url) {
            return fetch(url)
                    .then(this._parseJSON)
                    .then(this._loadJsonGraph.bind(this));
        },
        
        getNeighbours: function(genre, distance, ignoreMap) {
            if(distance == null) {
                distance = 1;
            } else if(distance < 1) {
                return [];
            }
            
            var genreNode = this._genreNodes[genre];
            if(genreNode == null) {
                throw new Error('Cannot query similar genres because genre "' + genre + '" is not found.');
            }
            
            ignoreMap = ignoreMap || {};
            
            if(distance === 1) {
                return neighbours = genreNode.neighbours.filter(function(link) {
                        return !ignoreMap[link.to.genre];
                    })
                    .map(function(link) {
                        ignoreMap[link.to.genre] = true;
                        return link.to;
                    });
            }
            
            var neighbours = [];
            for(var i = 0; i < genreNode.neighbours.length; i++) {
                var neighbourNode = genreNode.neighbours[i].to;
                if(!ignoreMap[neighbourNode.genre]) {
                    ignoreMap[neighbourNode.genre] = true;
                    neighbours = neighbours.concat(this.getNeighbours(neighbourNode.genre, distance - 1, ignoreMap));
                }
            }
            
            return neighbours;
        },
        
        _parseJSON: function(response) {
            return response.json();
        },
        
        _loadJsonGraph: function(jsonGraph) {
            var links = jsonGraph.links;
            var nodes = jsonGraph.nodes;
            
            var genreNodes = nodes.map(this._makeGenreNode);
            
            for(var i = 0; i < links.length; i++) {
                var link = links[i];
                var sourceGenreNode = genreNodes[link.source];
                var targetGenreNode = genreNodes[link.target];
                var linkWeight = link.value;
                
                sourceGenreNode.neighbours.push(this._makeGenreLink(targetGenreNode, linkWeight));
            }
            
            this._genreNodes = {};
            for(var j = 0; j < genreNodes.length; j++) {
                this._genreNodes[genreNodes[j].genre] = genreNodes[j];
            }
        },
        
        _makeGenreNode: function(nodeRecord) {
            return {
                genre: nodeRecord.name,
                weight: nodeRecord.artistCount,
                neighbours: []
            };
        },
        
        _makeGenreLink: function(targetGenreNode, weight) {
            return {
                to: targetGenreNode,
                weight: weight
            };
        }
    };
    
    return GenreGragh;
});