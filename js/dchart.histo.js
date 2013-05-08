var _dchartHisto = (function(_super) {
    __extends(_dchartHisto, _super);

    function _dchartHisto() {
        var self = this;
        var _ref = _dchartHisto.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    // Draw the Chart Data 
    _dchartHisto.prototype.drawData = function(scope) {

        var numDataSets = scope.data.length,
            histoWidth = scope.w / scope.axis.x.ticks;

        angular.forEach(scope.data, function(value, key) {

            scope.svg
                .append("g")
                .attr("class", "data")
                .selectAll("rect")
                .data(value.data)
                .enter()
                .append("rect")
                .attr("x", function(d) { return scope.xScale(d.x) - histoWidth; } )
                .attr("y", function(d) { return scope.yScale(d.y); } )
                .attr("width", function(d) { return histoWidth*2; } )
                .attr("height", function(d) { return scope.h - scope.yScale(d.y); } )
                .style("stroke", value.stroke)
                .style("fill", value.fill)
                .style("opacity", value.opacity)
                .style("fill-opacity", value.fillOpacity)
                .style("stroke-width", value.strokeWidth);
        });

        return this;
    };

  return _dchartHisto;

})(_dchart2D);

app.directive("dchartHisto", function() {

    var chart = new _dchartHisto();

    // Angular Link Function
    _dchartHisto.prototype.link = function(scope, element, attrs) {

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
