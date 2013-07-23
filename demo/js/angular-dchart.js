/** angular-dchart - v0.0.2 - Tue Jul 23 2013 23:11:39
 *  (c) 2013 Christoph Körner, office@chaosmail.at, http://chaosmail.at
 *  License: MIT
 */
var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (Array.prototype.replace === undefined) {
    Array.prototype.replace = function(newArray) {
        this.splice(0,this.length);
        for(var i=0;i<newArray.length;i++)
            this.push(newArray[i]);
    };
}
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
            else if (value.nodeName.match(/^data-set/i)) self.parseDataSet(scope.data, value, scope.axis);
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

        var self = this,
            transcludeFn = transclude;

        self.ngCompile(element, attrs, transclude);

        return function(scope, element, attrs) {

            scope.margin = {top: 0, right: 0, bottom: 0, left: 0};

            self.ngLink(scope, element, attrs);

            self.initializeAxis(scope);
            self.initializeData(scope);

            self.parseTransclude(transcludeFn, scope);
            self.calculateFnData(scope);

            self.createSvg(scope, element[0]);

            scope.$watch('[data]', function(newVal, oldVal, scope) {
                self.prepareChart(scope);
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

    _dchart2D.prototype.prepareChart = function(scope) {
        if (scope.data === undefined || scope.data === null) return;

        var self = this,
            _drawData = [],
            i = 0;

        angular.forEach(scope.data, function (dataSet, key){
            // Deep Copy Object
            var _dataSet = JSON.parse(JSON.stringify(dataSet));
            self.prepareDataSet(_dataSet, i);
            _drawData.push(_dataSet);
            self.prepareAxis(scope.axis, _dataSet, i);
            i++;
        });

        scope.drawDataSets = _drawData;
    };

    _dchart2D.prototype.prepareAxis = function(axis, dataSet, count) {
        if (dataSet === undefined || dataSet === null) return;
    };

    _dchart2D.prototype.prepareDataSet = function(dataSet, count) {
        if (dataSet === undefined || dataSet === null) return;

        var self = this,
            i = 0;

        angular.forEach(dataSet.data, function (data, key){
            self.prepareData(data, i);
            i++;
        });
    };

    _dchart2D.prototype.prepareData = function(data, count) {
        if (data === undefined || data === null) return;
    };

    // Parse all Data from Transclude Elem
    _dchart2D.prototype.parseDataSet = function(data, elem, axis) {
        if (elem === null) return;

        var set = { label:"",
                    stroke:this.getRandomColor(),
                    fill:"#000",
                    opacity:1,
                    fillOpacity:1,
                    strokeWidth:1,
                    fn:undefined,
                    min:0,
                    max:0,
                    interpolate:"linear",
                    data:[],
                    dataFn:undefined
                },
            self = this
            xAxis = axis.x;

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
            else if (value.nodeName.match(/^min$/i)) {
                set.min = parseFloat(value.nodeValue);
            }
            else if (value.nodeName.match(/^max$/i)) {
                set.max = parseFloat(value.nodeValue);
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
                if (value.nodeValue===undefined || value.nodeValue === null)
                    return;

                // Access the Data from Element's parent scope
                var scope = angular.element(elem).scope(),
                    _scopeVars = value.nodeValue.split('.'),
                    scopeDataElem = scope.$parent,
                    scopeDataFound = 0;

                // Map the Data Element scope._dataSets.dataSet
                angular.forEach(_scopeVars, function (scopeVar, k) {
                    if (scopeDataElem.hasOwnProperty(scopeVar)) {
                        scopeDataElem = scopeDataElem[scopeVar];
                        scopeDataFound++;
                    }
                });

                if (!scopeDataFound) {
                    return;
                }
                else if (typeof(scopeDataElem) === "function") {
                    set.fn = scopeDataElem;
                }
                else {
                    set.data = scopeDataElem;
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

    _dchart2D.prototype.solveFn = function(set, axis) {
        if (set.fn === undefined || set.fn === null)
            return;

        var xAxis = axis.x,
            min = set.min ? set.min : xAxis.range[0] ? parseFloat(xAxis.range[0]) : 0,
            max = set.max ? set.max : xAxis.range[1] ? parseFloat(xAxis.range[1]) : 180,
            ticks = xAxis.ticks ? parseFloat(xAxis.ticks) : 10,
            range = (max - min) / ticks;

        set.data.replace((new _solver()).solve(set.fn,min,max,range));
    };

    _dchart2D.prototype.calculateFnData = function(scope) {
        if (scope.data === undefined || scope.data.length ===0)
            return;

        var self = this;

        angular.forEach(scope.data, function (set, key){
            if (set.fn !== undefined) {

                self.solveFn(set,scope.axis);
            }
        });

        scope.drawDataSets = scope.data;
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
                axis.rangeOpt = value.nodeValue.replace(/[\[\]]/g,"").split(",");
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
        if (scope.axis !== undefined && scope.axis !== null) return this;

        scope.axis = {
            x: {type:"x",range:[0,1],rangeOpt:"auto",label:"",align:"bottom",ticks:10,ticksFormat:[],labelPos:"middle"},
            y: {type:"y",range:[0,1],rangeOpt:"auto",label:"",align:"left",ticks:10,ticksFormat:[],labelPos:"middle"}
        };

        return this;
    };

    // Initialize the Data and Data Attributes
    _dchart2D.prototype.initializeData = function(scope) {
        if (scope.data !== undefined && scope.data !== null) return this;

        scope.data = [];

        return this;
    };

    // Draw the Axis
    _dchart2D.prototype.drawAxis = function(scope) {

        var rangeValues = _dchart.prototype.getMinMaxValues(scope.drawDataSets);

        if (scope.axis.x.rangeOpt === "auto") {
            scope.axis.x.range = [rangeValues[0].x,rangeValues[1].x];
        }
        else {
            scope.axis.x.range = scope.axis.x.rangeOpt;
        }

        if (scope.axis.y.rangeOpt === "auto") {
            scope.axis.y.range = [rangeValues[0].y,rangeValues[1].y];
        }
        else {
            scope.axis.y.range = scope.axis.y.rangeOpt;
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

        scope.xScale = d3.scale.linear().domain(scope.axis.x.range).range([0, scope.w]);
        scope.yScale = d3.scale.linear().domain(scope.axis.y.range).range([scope.h, 0]);

        var xAxis = d3.svg.axis().scale(scope.xScale).orient(xLabelOrient).ticks(scope.axis.x.ticks),
            yAxis = d3.svg.axis().scale(scope.yScale).orient(yLabelOrient).ticks(scope.axis.y.ticks);

        if (scope.axis.x.ticksFormat.length > 0) {
            xAxis.tickFormat(function (d, i) {
                return scope.axis.x.ticksFormat[d];
            });
        }

        if (scope.axis.y.ticksFormat.length > 0) {
            xAxis.tickFormat(function (d, i) {
                return scope.axis.y.ticksFormat[d];
            });
        }

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

/*
    _solver
    *******************
*/
var _solver = (function() {

    function _solver() {

    }

    _solver.prototype.solve = function (fn,min,max,step) {

        var data = [];

        for (var x=min; x<=max; x+=step) {
            data.push({x:x, y:fn(x)});
        }

        return data;
    };

    return _solver;

})();

angular.module('dchart.solver', [])
.service("dchartSolver",function(){

    return new _solver();
});
var _dchartHisto = (function(_super) {
    __extends(_dchartHisto, _super);

    function _dchartHisto() {
        var self = this;
        var _ref = _dchartHisto.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    _dchartHisto.prototype.prepareAxis = function(axis, dataSet, count) {
        if (dataSet === undefined || dataSet === null) return;

        axis.x.ticks = dataSet.data.length;
        axis.x.ticksFormat = [""];

        angular.forEach(dataSet.data, function (data, key){
            axis.x.ticksFormat.push(data.label);
        });

        if (axis.y.align === "left") {
            //axis.y.ticksFormat.unshift("");
        }

        if (axis.y.align === "right") {
            //axis.y.ticksFormat.push("");
        }
    };

    _dchartHisto.prototype.prepareData = function(data, count){
        if (data === undefined || data === null) return;

        if (!data.hasOwnProperty("x")) {
            data["x"] = count + 1;
        }
    };

    _dchartHisto.prototype.ngLink = function(scope, element, attrs) {
        scope.margin = {top: 50, right: 50, bottom: 50, left: 50};
    };

    _dchartHisto.prototype.ngWatch = function(newVal, oldVal, scope) {

    };

    // Draw the Chart Data 
    _dchartHisto.prototype.drawData = function(scope) {

        var numDataSets = scope.drawDataSets.length,
            histoWidth = scope.w / scope.axis.x.ticks * 1/numDataSets * 0.8,
            actDataSet = 0;

        if (scope.svgData === undefined || scope.svgData === null)
            scope.svgData = [];

        angular.forEach(scope.drawDataSets, function(value, key) {

            if (scope.svgData[key] === undefined || scope.svgData[key]  === null) {
                scope.svgData[key] = scope.svg
                                            .append("g")
                                            .attr("class", "data");
            }

            var dataSet = scope.svgData[key].selectAll("rect")
                                    .data(value.data, function(d) {
                                        return d.x + " - " + d.y ;
                                    });

            // Update the x-Position and width of Existing bars
            dataSet
                //.transition() // <-- This is not working
                //.duration(150)
                //.ease('cubicin')
                .attr("x", function(d) { return scope.xScale(d.x) - histoWidth*0.5*numDataSets + actDataSet*histoWidth; } )
                .attr("width", function(d) { return histoWidth; } );

            dataSet.enter()
                .append("rect")
                .style("stroke", value.stroke)
                .style("fill", function(d) { return d.hasOwnProperty("color") ? d.color : value.fill; })
                .style("opacity", value.opacity)
                .style("fill-opacity", value.fillOpacity)
                .style("stroke-width", value.strokeWidth)
                .attr("x", function(d) { return scope.xScale(d.x) - histoWidth*0.5*numDataSets + actDataSet*histoWidth; } )
                .attr("y", scope.h )
                .attr("width", function(d) { return histoWidth; } )
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

            actDataSet ++;
        });
    };

  return _dchartHisto;

})(_dchart2D);

angular.module('dchart.histo', [])
    .directive("dchartHisto", function() {

    return new _dchartHisto();
});

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
