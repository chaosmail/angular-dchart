var dchartLine = (function(_super) {
    __extends(dchartLine, _super);

    function dchartLine() {
        var self = this;
        var _ref = dchartLine.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    // Draw the Chart Data 
    dchartLine.prototype.drawData = function(scope) {

        var line = d3.svg.line()
            .x(function(d) { return scope.xScale(d.x); })
            .y(function(d) { return scope.yScale(d.y); });

        angular.forEach(scope.data, function(value, key) {
            scope.svg
                .append("g")
                .attr("class", "data")
                .append("svg:path")
                .attr("d", line(value.data))
                .style("stroke", value.stroke)
                .style("fill", "none")
                .style("stroke-width", value.strokeWidth);
        });

        return this;
    };

  return dchartLine;

})(_dchart2D);

app.directive("dchartLine", function() {

    var chart = new dchartLine();

    // Angular Link Function
    dchartLine.prototype.link = function(scope, element, attrs) {

        scope.margin = {top: 50, right: 50, bottom: 50, left: 50};

        chart.initializeAxis(scope)
            .initializeData(scope)
            .parseTransclude(scope);

        chart.createSvg(scope, element[0])
            .drawAxis(scope)
            .drawData(scope);

    };

    return chart;
});
