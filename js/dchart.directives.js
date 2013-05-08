app.directive("dchartLine", function() {
     dchartDirective = {
        restrict: 'E',
        transclude: true,
        scope: {
            w:"=width",
            h:"=height"
        },
        // Parse all Transclude Elements
        parseTransclude: function(scope) {
            var transclude = dchartDirective.transcludeData(scope),
                dataElem = [];

            if (transclude === undefined || transclude === null)
                return;

            angular.forEach(transclude, function (value, key) {
                if (value.nodeName.match(/^axis/i)) dchartDirective.parseAxis(scope.axis, value);
                if (value.nodeName.match(/^data/i)) dataElem.push(value);
            });
        },
        // Parse all Data from Transclude Elem
        parseData: function(data, elem) {

        },
        // Parse all Axis from Transclude Elem
        parseAxis: function(axis, elem) {
            if (elem === null) return;

            angular.forEach(elem.children, function (value, key) {
                if (value.nodeName.match(/^x/i)) dchartDirective.parseAxisAttributes(axis.x, value);
                if (value.nodeName.match(/^y/i)) dchartDirective.parseAxisAttributes(axis.y, value);
            });
        },
        // Parse all Attributes from an Axis
        parseAxisAttributes: function(axis, elem) {
            if (elem === null) return;

            axis.label = elem.innerText;

            angular.forEach(elem.attributes, function (value, key){
                if (value.nodeName.match(/^ticks/i)) {
                    axis.ticks = parseInt(value.nodeValue,10);
                }
                if (value.nodeName.match(/^align/i)) {
                    var align = value.nodeValue;

                    if (axis.type === "x" && ["top","center","bottom"].indexOf(align)>=0) {
                        axis.align = align;
                    }
                    if (axis.type === "y" && ["left","center","right"].indexOf(align)>=0) {
                        axis.align = align;
                    }
                }
                if (value.nodeName.match(/^labelpos/i)) {
                    var labelPos = value.nodeValue;

                    if (["start","middle","end"].indexOf(labelPos)>=0) {
                        axis.labelPos = labelPos;
                    }
                }
            });
        },
        // Initialize the Axis and Axis Attributes
        initializeAxis: function(scope) {
            if (scope.axis !== undefined && scope.axis !== null) return;

            scope.axis = {
                x: {type:"x",domain:[0,100],label:"",align:"bottom",range:"auto",ticks:"10",labelPos:"middle"},
                y: {type:"y",domain:[0,100],label:"",align:"left",range:"auto",ticks:"10",labelPos:"middle"}
            };
        },
        // Initialize the Data and Data Attributes
        initializeData: function(scope) {
            if (scope.data !== undefined && scope.data !== null) return;

            scope.data = [];
        },
        // Create the basic SVG Element
        createSvg: function(scope, elem) {
            if (scope.svg !== undefined && scope.svg !== null) return;

            var svg = d3.select(elem)
                        .append("svg")
                        .attr("width", scope.w + scope.margin.left + scope.margin.right)
                        .attr("height", scope.h + scope.margin.top + scope.margin.bottom)
                        .append("g").attr("class","dchart-container")
                        .attr("transform","translate("+ scope.margin.left +", "+ scope.margin.top +")");

            scope.svg = svg;
        },
        // Create the Axis
        createAxis: function(scope) {

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

            var xScale = d3.scale.linear().domain(scope.axis.x.domain).range([0, scope.w]),
                yScale = d3.scale.linear().domain(scope.axis.y.domain).range([scope.h, 0]),
                xAxis = d3.svg.axis().scale(xScale).orient(xLabelOrient).ticks(scope.axis.x.ticks),
                yAxis = d3.svg.axis().scale(yScale).orient(yLabelOrient).ticks(scope.axis.y.ticks);

            scope.svg.append("g").attr("class", "axis")
                .attr("transform", "translate(" + yAxisPos + ",0)")
                .call(yAxis);

            scope.svg.append("g").attr("class", "axis")
                .attr("transform", "translate(0," + xAxisPos + ")")
                .call(xAxis);

            scope.svg.append("g")
                .attr("class", "axis-label")
                .append("text")
                .attr("text-anchor", scope.axis.x.labelPos)
                .attr("x", xLabelPos)
                .attr("y", scope.h + 34)
                .text(scope.axis.x.label);

            scope.svg.append("g")
                .attr("class", "axis-label")
                .append("text")
                .attr("text-anchor", scope.axis.y.labelPos)
                .attr("x", -yLabelPos)
                .attr("y", -34)
                .attr("transform", "rotate(-90)")
                .text(scope.axis.y.label);
        },
        // Angular Link Function
        link: function(scope, element, attrs) {

            scope.margin = {top: 50, right: 50, bottom: 50, left: 50};

            dchartDirective.initializeAxis(scope);
            dchartDirective.initializeData(scope);
            dchartDirective.parseTransclude(scope);

            dchartDirective.createSvg(scope, element[0]);
            dchartDirective.createAxis(scope);
        },
        // Angular Compile Function
        compile: function( element, attributes, transclude ) {

            this.transcludeData = transclude;

            return( this.link );
        }
    };
    return dchartDirective;
});