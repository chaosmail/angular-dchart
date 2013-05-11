var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

/*
    _dchart
    *******************
*/
var _dchart = (function() {

    function _dchart() {

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
    _dchart.prototype.getMinMaxValues = function (_dataSets) {

        var minValues = {x:0,y:0},
            maxValues = {x:0,y:0};

        if (_dataSets === undefined || _dataSets === null)
            return [minValues, maxValues];

        angular.forEach(_dataSets, function (dataSet, key) {
            if (dataSet !== null) {
                angular.forEach(dataSet.data, function (data, key) {
                    if (data.x > maxValues.x) maxValues.x = data.x;
                    else if (data.x < minValues.x) minValues.x = data.x;

                    if (data.y > maxValues.y) maxValues.y = data.y;
                    else if (data.y < minValues.y) minValues.y = data.y;
                });
            }
        });

        return [minValues, maxValues];
    };

    // Parse all Transclude Elements
    _dchart.prototype.parseTransclude = function(transcludeFn, scope) {

        var self = this;

        var transcludeData = transcludeFn(scope);

        if (transcludeData === undefined || transcludeData === null)
            return;

        angular.forEach(transcludeData, function (value, key) {
            if (value.nodeName.match(/^axis/i)) self.parseAxis(scope.axis, value);
            else if (value.nodeName.match(/^data-set/i)) self.parseDataSet(scope.data, value);
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

    // Custom Angular Compile Function
    _dchart.prototype.ngCompile = function(element, attrs, transclude) {
        return;
    };

    // Custom Angular Link Function
    _dchart.prototype.ngLink = function(scope, element, attrs) {
        return;
    };

    // Custom Angular Watch Function
    _dchart.prototype.ngWatch = function(newVal, oldVal, scope) {
        return;
    };

    // Angular Compile Function
    _dchart.prototype.compile = function( element, attrs, transclude ) {

        var self = this;
        var transcludeFn = transclude;

        self.ngCompile(element, attrs, transclude);

        return function(scope, element, attrs) {

            scope.margin = {top: 0, right: 0, bottom: 0, left: 0};

            self.ngLink(scope, element, attrs);

            self.initializeAxis(scope);
            self.initializeData(scope);
            self.parseTransclude(transcludeFn, scope);

            self.createSvg(scope, element[0]);

            scope.$watch('[data, axis]', function(newVal, oldVal, scope) {
                self.drawAxis(scope);
                self.drawData(scope);
                self.ngWatch(newVal, oldVal, scope);
            } ,true);
        };
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
        var _ref = _dchart2D.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    // Parse all Data from Transclude Elem
    _dchart2D.prototype.parseDataSet = function(data, elem) {
        if (elem === null) return;

        var set = { label:"",
                    stroke:this.getRandomColor(),
                    fill:"#000",
                    opacity:1,
                    fillOpacity:1,
                    strokeWidth:1,
                    interpolate:"linear",
                    data:[]
                },
            self = this;

        angular.forEach(elem.attributes, function (value, key) {
            if (value.nodeName.match(/^label$/i)) {
                set.label = value.nodeValue;
            }
            else if (value.nodeName.match(/^stroke$/i)) {
                set.stroke = value.nodeValue;
            }
            else if (value.nodeName.match(/^interpolate$/i)) {
                set.interpolate = value.nodeValue;
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
            if (value.nodeName.match(/^data/i)) {
                var data = self.parseData(value);

                if (data !== null) {
                    set.data.push(data);
                }
            }
        });
        data.push(set);
    };

    // Parse all Attributes from a Data Elem
    _dchart2D.prototype.parseData = function(elem) {
        if (elem === null) return null;

        // x and y .. coordinates
        // w .. weight
        // t .. time
        // label .. caption
        var data = {x:0,y:0,t:0,w:1,label:elem.innerText},
            self = this;

        angular.forEach(elem.attributes, function (value, key) {
            if (value.nodeName.match(/^x$/i)) {
                data.x = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^(y|val|value)$/i)) {
                data.y = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^(t|time)$/i)) {
                data.t = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^(w|weight)$/i)) {
                data.w = parseFloat(value.nodeValue);
            }
        });

        return data;
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
