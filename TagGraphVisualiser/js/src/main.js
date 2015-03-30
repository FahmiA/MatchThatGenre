document.addEventListener("DOMContentLoaded", function(event) { 
    d3.json("TagGraph50k.json", function(error, graphData) {
        createGraph(graphData);
    });
});

function createGraph(graphData) {
    var svgElement = d3.select('#tagGraph').node();

    var tagGraphModel = new TagGraphModel(graphData);
    tagGraphModel.process();

    var tagGraphView = new TagGraphView(svgElement, graphData);
    tagGraphView.draw();

    tagGraphView.getDispatcher().on('nodeSelected', function(data) {
        var nodeId = data.index;

        tagGraphView.unmarkNearbyNodes();
        markNeighbours(tagGraphView, tagGraphModel, nodeId, 3);
    });
}

function markNeighbours(tagGraphView, tagGraphModel, nodes, maxSteps, visitedNodes, step) {
    visitedNodes = visitedNodes || {};
    step = step || 1;

    // Handle the case where nodes isn a single node
    if(!Array.isArray(nodes)) {
        visitedNodes[nodes] = true;
        nodes = [nodes];
    }

    if(step > maxSteps) {
        return;
    }

    var nextNodes = [];
    for(var i = 0; i < nodes.length; i++) {
        var nodeId = nodes[i];
        var nodeNeighbourIds = tagGraphModel.getNeighbours(nodeId);

        for(var j = 0; j < nodeNeighbourIds.length; j++) {
            var nodeNeighbourId = nodeNeighbourIds[j];

            if(!(nodeNeighbourId in visitedNodes)) {
                tagGraphView.markNodeAsNearby(nodeNeighbourId, step);
                visitedNodes[nodeNeighbourId] = true;
                nextNodes.push(nodeNeighbourId);
            }
        }
    }

    markNeighbours(tagGraphView, tagGraphModel, nextNodes, maxSteps, visitedNodes, step + 1);
}

