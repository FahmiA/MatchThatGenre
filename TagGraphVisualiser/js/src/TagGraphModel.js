
var TagGraphModel = function(graphData) {
    this._graphData = graphData;
    this._nodeNeighbours = {}; // Node id to list of node ids
};

TagGraphModel.prototype = {
    process: function() {
        // Clear the node neighbours map
        this._nodeNeighbours = {};

        // Get the nodes and links from the graph data
        var nodes = this._graphData.nodes;
        var links = this._graphData.links;

        // For each link, update the node-neighbours map
        var link, sourceNode, targetNode;
        for(var i = 0; i < links.length; i++) {
            link = links[i];

            if(this._nodeNeighbours[link.source]) {
                this._nodeNeighbours[link.source].push(link.target);
            } else {
                this._nodeNeighbours[link.source] = [link.target];
            }

            if(this._nodeNeighbours[link.target]) {
                this._nodeNeighbours[link.target].push(link.source);
            } else {
                this._nodeNeighbours[link.target] = [link.source];
            }
        }
    },

    getNeighbours: function(nodeId, distance) {
        // TODO: Handle distance argument (1st neighbour, 2nd neighbour, etc)
        return this._nodeNeighbours[nodeId] || [];
    },

    getData: function() {
        return this._graphData;
    }
};

