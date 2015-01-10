document.addEventListener("DOMContentLoaded", function(event) { 
    d3.json("TagGraph500k.json", function(error, graphData) {
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
        var nodeNeighbourIds = tagGraphModel.getNeighbours(nodeId);

        tagGraphView.unmarkNearbyNodes();
        nodeNeighbourIds.forEach(function(nodeNeighbourId) {
            tagGraphView.markNodeAsNearby(nodeNeighbourId);
        });
    });
}

