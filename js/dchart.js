var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

/*
    _dchart
    *******************
*/
var _dchart = (function() {

    function _dchart() {

        var self = this;

        this.restrict = 'E';
        this.transclude = true;
        this.scope = {
            w:"=width",
            h:"=height"
        };
    }

    // Get a Random Color
    _dchart.prototype.getRandomColor = function() {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
    };

    // Get Min and Max Values from Datasets
    _dchart.prototype.getMinMaxValues = function(data) {

        var minValues = {x:0,y:0},
            maxValues = {x:0,y:0};

        if (data === undefined || data === null)
            return [minValues, maxValues];

        angular.forEach(data, function (value, key) {
            if (value !== null) {
                angular.forEach(value.data, function (point) {
                    if (point.x > maxValues.x) maxValues.x = point.x;
                    else if (point.x < minValues.x) minValues.x = point.x;

                    if (point.y > maxValues.y) maxValues.y = point.y;
                    else if (point.y < minValues.y) minValues.y = point.y;
                });
            }
        });

        return [minValues, maxValues];
    };

    // Parse all Transclude Elements
    _dchart.prototype.parseTransclude = function(scope) {

        var transclude = this.transcludeData(scope),
            self = this;

        if (transclude === undefined || transclude === null)
            return;

        angular.forEach(transclude, function (value, key) {
            if (value.nodeName.match(/^axis/i)) self.parseAxis(scope.axis, value);
            else if (value.nodeName.match(/^data-set/i)) self.parseData(scope.data, value);
        });
    };

    // Create the basic SVG Element
    _dchart.prototype.createSvg = function(scope, elem) {
        if (scope.svg !== undefined && scope.svg !== null) return;

        var svg = d3.select(elem)
                    .append("svg")
                    .attr("width", scope.w + scope.margin.left + scope.margin.right)
                    .attr("height", scope.h + scope.margin.top + scope.margin.bottom)
                    .append("g").attr("class","dchart-container")
                    .attr("transform","translate("+ scope.margin.left +", "+ scope.margin.top +")");

        scope.svg = svg;
    };

    // Angular Compile Function
    _dchart.prototype.compile = function( element, attributes, transclude ) {

        function F() {}
        F.prototype = this;
        F.prototype.transcludeData = transclude;

        return( new F().link );
    };

    return _dchart;
})();

/*
    _dchart2D
    *******************
*/
var _dchart2D = (function(_super) {
    __extends(_dchart2D, _super);

    function _dchart2D() {
        var self = this;
        var _ref = _dchart2D.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    // Parse all Data from Transclude Elem
    _dchart2D.prototype.parseData = function(data, elem) {
        if (elem === null) return;

        var set = {label:"",stroke:this.getRandomColor(),fill:"#000",opacity:1,fillOpacity:1,strokeWidth:1,data:[]},
            self = this;

        angular.forEach(elem.attributes, function (value, key) {
            if (value.nodeName.match(/^label$/i)) {
                set.label = value.nodeValue;
            }
            else if (value.nodeName.match(/^stroke$/i)) {
                set.stroke = value.nodeValue;
            }
            else if (value.nodeName.match(/^fill$/i)) {
                set.fill = value.nodeValue;
            }
            else if (value.nodeName.match(/^stroke-width$/i)) {
                set.strokeWidth = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^fill-opacity$/i)) {
                set.fillOpacity = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^opacity$/i)) {
                set.opacity = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^data$/i)) {
                // Access the Data from Element's parent scope
                var scope = angular.element(elem).scope();

                if (scope.$parent.hasOwnProperty(value.nodeValue)) {
                    set.data = scope.$parent[value.nodeValue];
                }
            }
        });

        angular.forEach(elem.children, function (value, key) {
            if (value.nodeName.match(/^point/i)) {
                var point = self.parseDataPoint(value);

                if (point !== null) {
                    set.data.push(point);
                }
            }
        });
        data.push(set);
    };

    // Parse all Attributes from a Point
    _dchart2D.prototype.parseDataPoint = function(elem) {
        if (elem === null) return null;

        // x and y .. Coordinates
        // w .. Weight of a single point
        // label .. Caption of a single point
        var point = {x:0,y:0,w:1,label:elem.innerText},
            self = this;

        angular.forEach(elem.attributes, function (value, key) {
            if (value.nodeName.match(/^x$/i)) {
                point.x = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^y$/i)) {
                point.y = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^w$/i)) {
                point.w = parseFloat(value.nodeValue);
            }
        });

        return point;
    };

    // Parse all Axis from Transclude Elem
    _dchart2D.prototype.parseAxis = function(axis, elem) {
        if (elem === null) return;

        var self = this;

        angular.forEach(elem.children, function (value, key) {
            if (value.nodeName.match(/^x/i)) self.parseAxisAttributes(axis.x, value);
            else if (value.nodeName.match(/^y/i)) self.parseAxisAttributes(axis.y, value);
        });
    };

    // Parse all Attributes from an Axis
    _dchart2D.prototype.parseAxisAttributes = function(axis, elem) {
        if (elem === null) return;

        axis.label = elem.innerText;

        angular.forEach(elem.attributes, function (value, key){
            if (value.nodeName.match(/^ticks$/i)) {
                axis.ticks = parseInt(value.nodeValue,10);
            }
            else if (value.nodeName.match(/^range$/i)) {
                axis.range = value.nodeValue;
            }
            else if (value.nodeName.match(/^domain$/i)) {
                axis.domain = value.nodeValue.replace(/[\[\]]/g,"").split(",");
            }
            else if (value.nodeName.match(/^align$/i)) {
                var align = value.nodeValue;

                if (axis.type === "x" && ["top","center","bottom"].indexOf(align)>=0) {
                    axis.align = align;
                }
                else if (axis.type === "y" && ["left","center","right"].indexOf(align)>=0) {
                    axis.align = align;
                }
            }
            else if (value.nodeName.match(/^label-pos$/i)) {
                var labelPos = value.nodeValue;

                if (["start","middle","end"].indexOf(labelPos)>=0) {
                    axis.labelPos = labelPos;
                }
            }
        });
    };

    // Initialize the Axis and Axis Attributes
    _dchart2D.prototype.initializeAxis = function(scope) {
        if (scope.axis !== undefined && scope.axis !== null) return;

        scope.axis = {
            x: {type:"x",domain:[0,10],label:"",align:"bottom",ticks:10,labelPos:"middle"},
            y: {type:"y",domain:[0,10],label:"",align:"left",ticks:10,labelPos:"middle"}
        };

        return this;
    };

    // Initialize the Data and Data Attributes
    _dchart2D.prototype.initializeData = function(scope) {
        if (scope.data !== undefined && scope.data !== null) return;

        scope.data = [];

        return this;
    };

    // Draw the Axis
    _dchart2D.prototype.drawAxis = function(scope) {

        var rangeValues = _dchart.prototype.getMinMaxValues(scope.data);

        if (scope.axis.x.range === "auto") {
            scope.axis.x.domain = [rangeValues[0].x,rangeValues[1].x];
        }

        if (scope.axis.y.range === "auto") {
            scope.axis.y.domain = [rangeValues[0].y,rangeValues[1].y];
        }

        var xAxisPos = scope.axis.x.align === "center" ? scope.h*0.5 :
                      scope.axis.x.align === "top" ? 0 :
                      scope.h,
            xLabelOrient = scope.axis.x.align === "top" ? "top" : "bottom",
            xLabelPos = scope.axis.x.labelPos === "start" ? 0 :
                        scope.axis.x.labelPos === "middle" ? scope.w*0.5 :
                        scope.w;

        var yAxisPos = scope.axis.y.align === "center" ? scope.w*0.5 :
                      scope.axis.y.align === "right" ? scope.w :
                      0,
            yLabelOrient = scope.axis.y.align === "right" ? "right" : "left",
            yLabelPos = scope.axis.y.labelPos === "start" ? scope.h :
                        scope.axis.y.labelPos === "middle" ? scope.h*0.5 :
                        0;

        scope.xScale = d3.scale.linear().domain(scope.axis.x.domain).range([0, scope.w]);
        scope.yScale = d3.scale.linear().domain(scope.axis.y.domain).range([scope.h, 0]);

        var xAxis = d3.svg.axis().scale(scope.xScale).orient(xLabelOrient).ticks(scope.axis.x.ticks),
            yAxis = d3.svg.axis().scale(scope.yScale).orient(yLabelOrient).ticks(scope.axis.y.ticks);

        if (scope.svgXAxis === undefined || scope.svgXAxis === null) {
            scope.svgXAxis = scope.svg.append("g").attr("class", "axis")
                .call(xAxis);

            scope.svgXAxisLabel = scope.svg.append("g")
                .attr("class", "axis-label")
                .append("text")
                .attr("text-anchor", scope.axis.x.labelPos)
                .attr("x", xLabelPos)
                .attr("y", scope.h + 34);
        }

        if (scope.svgYAxis === undefined || scope.svgYAxis === null) {
            scope.svgYAxis = scope.svg.append("g").attr("class", "axis")
                .call(yAxis);

            scope.svgYAxisLabel = scope.svg.append("g")
                .attr("class", "axis-label")
                .append("text")
                .attr("text-anchor", scope.axis.y.labelPos)
                .attr("x", -yLabelPos)
                .attr("y", -34)
                .attr("transform", "rotate(-90)");
        }

        scope.svgXAxis
            .transition()
            .duration(150)
            .ease("cubicin")
            .attr("transform", "translate(0," + xAxisPos + ")").call(xAxis);

        scope.svgYAxis
            .transition()
            .duration(150)
            .ease("cubicin")
            .attr("transform", "translate(" + yAxisPos + ",0)").call(yAxis);

        scope.svgXAxisLabel.text(scope.axis.x.label);
        scope.svgYAxisLabel.text(scope.axis.y.label);
    };

    return _dchart2D;

})(_dchart);
