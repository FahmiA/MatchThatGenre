document.addEventListener("DOMContentLoaded", function(event) { 
    d3.json("TagGraph5k.json", function(error, graph) {
        createGraph(graph);
    });
});

function createGraph(graph) {
    var svgGraph = d3.select('#tagGraph');
    var svgGraphClientBox = svgGraph.node().getBoundingClientRect();
    var width = svgGraphClientBox.width;
    var height = svgGraphClientBox.height;

    tagNameText = svgGraph.append('text')
        .attr('x', 15)
        .attr('y', 15);

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height])
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svgGraph.selectAll(".link")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) {
            return (1 - d.value) * 2;
        });

    var node = svgGraph.selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", function(d) {
            return Math.sqrt(d.artistCount)
        })
        .on('mouseover', function(d) {
            tagNameText.text(d.name);
        })
        .on('mouseout', function(d) {
            tagNameText.text('');
        })
        .call(force.drag);

    node.append("title")
        .text(function(d) {
            return d.name;
        });
    
    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        });
}

