var _dchartHisto = (function(_super) {
    __extends(_dchartHisto, _super);

    function _dchartHisto() {
        var self = this;
        var _ref = _dchartHisto.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    _dchartHisto.prototype.ngLink = function(scope, element, attrs) {
        scope.margin = {top: 50, right: 50, bottom: 50, left: 50};
    };

    _dchartHisto.prototype.ngWatch = function(newVal, oldVal, scope) {

    };

    // Draw the Chart Data 
    _dchartHisto.prototype.drawData = function(scope) {

        var numDataSets = scope.data.length,
            histoWidth = scope.w / scope.axis.x.ticks * 0.5;

        if (scope.svgData === undefined || scope.svgData === null)
            scope.svgData = [];

        angular.forEach(scope.data, function(value, key) {

            if (scope.svgData[key] === undefined || scope.svgData[key]  === null) {
                scope.svgData[key] = scope.svg
                                            .append("g")
                                            .attr("class", "data");
            }

            var dataSet = scope.svgData[key].selectAll("rect")
                                    .data(value.data, function(d) {
                                        return d.y;
                                    });

            // Update the x-Position and width of Existing bars
            dataSet
                //.transition() // <-- This is not working
                //.duration(150)
                //.ease('cubicin')
                .attr("x", function(d) { return scope.xScale(d.x) - histoWidth; } )
                .attr("width", function(d) { return histoWidth*2; } );

            dataSet.enter()
                .append("rect")
                .style("stroke", value.stroke)
                .style("fill", value.fill)
                .style("opacity", value.opacity)
                .style("fill-opacity", value.fillOpacity)
                .style("stroke-width", value.strokeWidth)
                .attr("x", function(d) { return scope.xScale(d.x) - histoWidth; } )
                .attr("y", scope.h )
                .attr("width", function(d) { return histoWidth*2; } )
                .attr("height", 0 )
                .transition()
                .duration(150)
                .ease('cubicin')
                .attr("y", function(d) { return scope.yScale(d.y); } )
                .attr("height", function(d) { return scope.h - scope.yScale(d.y); } );

            dataSet.exit()
                .transition()
                .duration(150)
                .ease('cubicout')
                .attr("y", scope.h )
                .attr("height", 0 )
                .each('end', function(){
                    d3.select(this).remove();
                });

        });
    };

  return _dchartHisto;

})(_dchart2D);

// Make the class available for testing with node
if (typeof exports !== 'undefined'){ exports._dchartHisto = _dchartHisto; }

angular.module('dchart.histo', [])
    .directive("dchartHisto", function() {

    return new _dchartHisto();
});
