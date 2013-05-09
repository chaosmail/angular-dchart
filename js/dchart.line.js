var _dchartLine = (function(_super) {
    __extends(_dchartLine, _super);

    function _dchartLine() {
        var self = this;
        var _ref = _dchartLine.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    // Draw the Chart Data 
    _dchartLine.prototype.drawData = function(scope) {

        var line = d3.svg.line()
            .x(function(d) { return scope.xScale(d.x); })
            .y(function(d) { return scope.yScale(d.y); });

        if (scope.svgData === undefined || scope.svgData === null)
            scope.svgData = [];

        angular.forEach(scope.data, function(value, key) {

            if (scope.svgData[key] === undefined || scope.svgData[key]  === null) {
                scope.svgData[key] = scope.svg
                                        .append("g")
                                        .attr("class", "data")
                                        .append("svg:path");
            }

                scope.svgData[key]
                    .transition()
                    .duration(150)
                    .ease("cubicin")
                    .attr("d", line(value.data))
                    .style("stroke", value.stroke)
                    .style("fill", "none")
                    .style("stroke-width", value.strokeWidth);
        });
    };

  return _dchartLine;

})(_dchart2D);

app.directive("dchartLine", function() {

    var chart = new _dchartLine();

    // Angular Link Function
    _dchartLine.prototype.link = function(scope, element, attrs) {

        scope.margin = {top: 50, right: 50, bottom: 50, left: 50};

        chart.initializeAxis(scope)
            .initializeData(scope)
            .parseTransclude(scope);

        chart.createSvg(scope, element[0]);

        // Todo:
        // Isolate the directives

        scope.$watch('[data, axis]', function(newVal,oldVal,scope) {
            chart.drawAxis(scope);
            chart.drawData(scope);
        } ,true);
    };

    return chart;
});
