/** Draws a tag-relationship graph inside a given SVG element. */
var TagGraphView = function(svgElement, graphData) {
    this._svgD3Element = d3.select(svgElement);
    this._graphData = graphData;

    this._selectedNode = null;
    this._nearbyNodes = [];
    this._optionNodes = [];

    /* using D3's event dispatching and listening component here
     * See:
     *  - https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
     *  - http://bl.ocks.org/mbostock/5872848
     */
    this._dispatch = d3.dispatch("nodeSelected");
};

TagGraphView.prototype = {
    /** Mark a node with the given id as "selected". */
    markNodeAsSelected: function(nodeId) {
        var node = this.getNodeElementWithId(nodeId);
        this._selectedNode = node;
        node.classed('selected', true);
    },

    /** Mark a node with the given id as "nearby". */
    markNodeAsNearby: function(nodeId, distance) {
        distance = distance || 1;
        distance = Math.min(3, distance);
        distance = Math.max(1, distance);

        var node = this.getNodeElementWithId(nodeId);
        this._nearbyNodes.push(node);
        node.classed('nearby', true);
        node.classed('nearby-dist-' + distance, true);
    },

    /** Mark a node with the given id as "option". */
    markNodeAsOption: function(nodeId) {
        var node = this.getNodeElementWithId(nodeId);
        this._optionNodes.push(node);
        node.classed('option', true);
    },

    /** Unmark the node marked "selected". */
    unmarkSelectedNode: function() {
        if(this._selectedNode) {
            this.unmarkNode(this._selectedNode);
        }
    },

    /** Unmark all nodes marked "nearby". */
    unmarkNearbyNodes: function() {
        for(var i = 0; i < this._nearbyNodes.length; i++) {
            this.unmarkNode(this._nearbyNodes[i]);
        }

        this._nearbyNodes.length = 0;
    },

    /** Unmark all nodes marked "option". */
    unmarkOptionNodes: function() {
        for(var i = 0; i < this._optionNodes.length; i++) {
            this.unmarkNode(this._optionNodes[i]);
        }

        this._optionNodes.length = 0;
    },

    /** Unmark the given node. */
    unmarkNode: function(node) {
        node.classed('selected', false)
            .classed('nearby', false)
            .classed('nearby-dist-1', false)
            .classed('nearby-dist-2', false)
            .classed('nearby-dist-3', false)
            .classed('option', false);
    },

    /** Get the node element with the given node id. */
    getNodeElementWithId: function(nodeId) {
        return d3.select('#node-' + nodeId);
    },

    /** Get the dispatch object to bind to events. */
    getDispatcher: function() {
        return this._dispatch;
    },

    /** Draws the graph. */
    draw: function() {
        var svgGraphClientBox = this._svgD3Element.node().getBoundingClientRect();
        var width = svgGraphClientBox.width;
        var height = svgGraphClientBox.height;

        var tagNameText = this._svgD3Element.append('text')
            .attr('x', 15)
            .attr('y', 15);

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height])
            .nodes(this._graphData.nodes)
            .links(this._graphData.links)
            .start();

        var link = this._svgD3Element.selectAll(".link")
            .data(this._graphData.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) {
                return (1 - d.value) * 2;
            });

        var node = this._svgD3Element.selectAll(".node")
            .data(this._graphData.nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr('id', function(d) {
                return 'node-' + d.index;
            })
            .attr("r", function(d) {
                return Math.sqrt(d.artistCount);
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

        var me = this;
        node.on('click', function(d, i) {
            me.unmarkSelectedNode();
            me.markNodeAsSelected(d.index);
            me._dispatch.nodeSelected(d);
        });
    },

};

