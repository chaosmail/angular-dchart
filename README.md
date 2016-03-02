Angular/D3.js Chart Directives (not maintained)
==============================

This library was a proof of concept and is not maintained anymore. Please check out https://github.com/n3-charts/line-chart instead!

Features
--------
+ Angular Directives for different Chart types
+ Data Binding
+ Fully customizable Options (Axes, Datasets) via Html tags
+ Autorescaling
+ Plot datasets or functions
+ Easy Extensibility (Checkout the source of the different Chart types, generally they only need a drawData() function)

Controller
----------
```javascript
var app = angular.module('dchart.demo', ['dchart.line', 'dchart.histo', 'dchart.scatter']);

app.controller("MainCtrl", ['$scope', function($scope) {

$scope.fn = {};
$scope.fn.sin = function(x) { return Math.sin(x*Math.PI/180); };
$scope.fn.cos = function(x) { return Math.cos(x*Math.PI/180); };
$scope.fn.tan = function(x) { return Math.tan(x*Math.PI/180); };

$scope.fn.rnd = function(x) { return Math.random()*100; };

$scope.histoDataSet1 = [
    {label:"monday",y:$scope.fn.rnd()},
    {label:"tuesday",y:$scope.fn.rnd()},
    {label:"wednesday",y:$scope.fn.rnd()},
    {label:"thursday",y:$scope.fn.rnd()},
    {label:"friday",y:$scope.fn.rnd()},
    {label:"saturday",y:$scope.fn.rnd()},
    {label:"sunday",y:$scope.fn.rnd()}
];

$scope.histoDataSet2 = [
    {label:"06:30-07:00",y:$scope.fn.rnd()},
    {label:"07:00-07:30",y:$scope.fn.rnd()},
    {label:"07:30-08:00",y:$scope.fn.rnd()},
    {label:">08:00",y:$scope.fn.rnd()}
];

$scope.createScatterDataSet = function(max,m) {
    var data = [];

    for(var i=0; i<max; i++) {
        data.push({x:Math.random()*m,y:Math.random()*m,w:Math.random()});
    }

    return data;
};

$scope.scatterDataSet1 = $scope.createScatterDataSet(100,100);
$scope.scatterDataSet2 = $scope.createScatterDataSet(100,100);
$scope.scatterDataSet3 = $scope.createScatterDataSet(50,50);
$scope.scatterDataSet4 = $scope.createScatterDataSet(50,50);
}]);
```

Line Chart
----------
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/line.png "Line Chart Demo")
```html
<dchart-line width="600" height="300">
    <axis>
        <x align="right" range="[0,360]" ticks="18" label-pos="end">x Axis</x>
        <y align="top" label-pos="end">y Axis</y>
    </axis>
    <data-set interpolate="linear" stroke="mediumslateblue" stroke-width="2" data="fn.rnd">
    </data-set>
    <data-set interpolate="cardinal" stroke="orange" stroke-width="2" data="fn.rnd">
    </data-set>
    <data-set interpolate="cardinal" stroke="green" stroke-width="2" data="fn.rnd">
    </data-set>
</dchart-line>
```
```html
<dchart-line width="300" height="300">
    <axis>
        <x align="center" range="[0,360]" ticks="18">x Axis</x>
        <y align="center" range="[-1,1]">y Axis</y>
    </axis>
    <data-set stroke="firebrick" stroke-width="2" data="fn.sin" interpolate="cardinal">
    </data-set>
    <data-set stroke="deepskyblue" stroke-width="2" data="fn.cos" interpolate="cardinal">
    </data-set>
</dchart-line>
```
Histogramm
----------
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/histo.png "Histogramm Demo")
```html
<dchart-histo width="600" height="300">
    <axis>
        <x align="bottom" range="[0,20]" ticks="19">x Axis</x>
        <y align="left">y Axis</y>
    </axis>
    <data-set stroke="firebrick" fill="coral" min="1" fill-opacity="0.8" stroke-width="0.8" data="fn.rnd">
    </data-set>
    <data-set stroke="lightseagreen" fill="lightskyblue" min="1" fill-opacity="0.8" stroke-width="0.8"  data="fn.rnd">
    </data-set>
    <data-set stroke="darkgreen" fill="green" min="1" fill-opacity="0.8" stroke-width="0.8"  data="fn.rnd">
    </data-set>
</dchart-histo>
```
```html
<dchart-histo width="300" height="300">
    <axis>
        <x align="top" range="[0,90]" ticks="25" label-pos="start">x Axis</x>
        <y align="right" range="[0,1.5]" label-pos="middle">y Axis</y>
    </axis>
    <data-set stroke="navy" fill="blue" fill-opacity="0.8" stroke-width="0.5" data="fn.sin">
    </data-set>
    <data-set stroke="slategrey" fill="silver" fill-opacity="0.8" stroke-width="0.5"  data="fn.cos">
    </data-set>
</dchart-histo>
```
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/histo2.png "Histogramm Demo")
```html
<dchart-histo width="600" height="300">
    <axis>
        <x align="bottom">weekdays</x>
        <y align="left">values</y>
    </axis>
    <data-set stroke="firebrick" fill="coral" min="1" fill-opacity="0.8" stroke-width="0.8" data="histoDataSet1">
    </data-set>
</dchart-histo>
```
```html
<dchart-histo width="300" height="300">
    <axis>
        <x align="bottom" label-pos="end">wake up time</x>
        <y align="left" label-pos="middle">people</y>
    </axis>
    <data-set stroke="navy" fill="blue" fill-opacity="0.8" stroke-width="0.5" data="histoDataSet2">
    </data-set>
</dchart-histo>
```
Scatterplot
-----------
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/scatter.png "Scatterplot Demo")
```html
<dchart-scatter width="600" height="300">
    <axis>
        <x align="bottom">x Axis</x>
        <y align="left">y Axis</y>
    </axis>
    <data-set stroke="darkgreen" fill="green" min="0" max="5" fill-opacity="0.8" stroke-width="0.5" data="scatterDataSet1">
    </data-set>
    <data-set stroke="darkorange" fill="orange" fill-opacity="0.8" stroke-width="0.5"  data="scatterDataSet2">
    </data-set>
</dchart-scatter>
```
```html
<dchart-scatter width="300" height="300">
    <axis>
        <x align="center" range="[-50,50]">x Axis</x>
        <y align="center" range="[-50,50]">y Axis</y>
    </axis>
    <data-set fill="green" stroke="darkgreen" fill-opacity="0.7" stroke-width="0.5" data="scatterDataSet3">
    </data-set>
    <data-set fill="orange" stroke="darkorange" fill-opacity="0.7" stroke-width="0.5" data="scatterDataSet4">
    </data-set>
</dchart-scatter>
```
Development
-----------
Get the source and install the dependencies.
```
clone https://github.com/chaosmail/angular-dchart.git
npm install
```
Run tests and create dist
```
grunt
```
Optional: Run the Karma tests
```
npm test
```
Optional: Build the dist
```
grunt dist
```
Optional: Update the libs
```
grunt lib
```
Todo
----
+ Add opportunity for time values on x-Axis
+ Add different scaling-options for Axis
+ Add more Chart types
+ Add Labels for data
+ Add Chart legend
+ Improve the demos
+ Improve unit tests
+ Add e2e tests

License
-------
> Copyright (c) 2013 Christoph Körner

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
