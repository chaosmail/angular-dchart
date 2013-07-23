var _dchartLine = (function(_super) {
    __extends(_dchartLine, _super);

    function _dchartLine() {
        var self = this;
        var _ref = _dchartLine.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    _dchartLine.prototype.ngLink = function(scope, element, attrs) {
        scope.margin = {top: 50, right: 50, bottom: 50, left: 50};
    };

    _dchartLine.prototype.ngWatch = function(newVal, oldVal, scope) {

    };

    // Draw the Chart Data 
    _dchartLine.prototype.drawData = function(scope) {

        if (scope.svgData === undefined || scope.svgData === null) {
            scope.svgData = [];
            scope.lineFn = [];
        }

        angular.forEach(scope.drawDataSets, function(value, key) {

            if (scope.svgData[key] === undefined || scope.svgData[key]  === null) {
                scope.svgData[key] = scope.svg
                                        .append("g")
                                        .attr("class", "data")
                                        .append("svg:path");

                scope.lineFn[key] = d3.svg.line().interpolate(value.interpolate)
                                        .x(function(d) { return scope.xScale(d.x); })
                                        .y(function(d) { return scope.yScale(d.y); });
            }

                scope.svgData[key]
                    .transition()
                    .duration(150)
                    .ease("cubicin")
                    .attr("d", scope.lineFn[key](value.data))
                    .style("stroke", value.stroke)
                    .style("fill", "none")
                    .style("stroke-width", value.strokeWidth);
        });
    };

  return _dchartLine;

})(_dchart2D);

angular.module('dchart.line', [])
    .directive("dchartLine", function() {

    return new _dchartLine();
});
