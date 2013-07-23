var _dchartScatter = (function(_super) {
    __extends(_dchartScatter, _super);

    function _dchartScatter() {
        var self = this;
        var _ref = _dchartScatter.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    _dchartScatter.prototype.ngLink = function(scope, element, attrs) {
        scope.margin = {top: 50, right: 50, bottom: 50, left: 50};
    };

    _dchartScatter.prototype.ngWatch = function(newVal, oldVal, scope) {

    };

    // Draw the Chart Data 
    _dchartScatter.prototype.drawData = function(scope) {

        var weigthFactor = 10;

        if (scope.svgData === undefined || scope.svgData === null) {
            scope.svgData = [];
            scope.symbolFn = [];
        }

        angular.forEach(scope.drawDataSets, function(value, key) {

            if (scope.svgData[key] === undefined || scope.svgData[key]  === null) {
                scope.svgData[key] = scope.svg
                                            .append("g")
                                            .attr("class", "data");
            }

            var dataSet = scope.svgData[key].selectAll("circle")
                                    .data(value.data, function(d) {
                                        return d.y;
                                    });

            dataSet.exit()
                .transition()
                .duration(150)
                .ease('cubicout')
                .attr("r",0)
                .each('end', function(){
                    d3.select(this).remove();
                });

            // Update the x-Position and width of Existing bars
            dataSet
                //.transition() // <-- This is not working
                //.duration(150)
                //.ease('cubicin')
                .attr("cx", function(d) { return scope.xScale(d.x); } )
                .attr("cy", function(d) { return scope.yScale(d.y); } );

            dataSet.enter()
                .append("circle")
                .style("stroke", value.stroke)
                .style("fill", value.fill)
                .style("opacity", value.opacity)
                .style("fill-opacity", value.fillOpacity)
                .style("stroke-width", value.strokeWidth)
                .attr("cx", function(d) { return scope.xScale(d.x); } )
                .attr("cy", function(d) { return scope.yScale(d.y); } )
                .attr("r",0)
                .transition()
                .duration(150)
                .ease('cubicin')
                .attr("r", function(d) { return d.w * weigthFactor; });
        });
    };

  return _dchartScatter;

})(_dchart2D);

angular.module('dchart.scatter', [])
    .directive("dchartScatter", function() {

    return new _dchartScatter();
});
