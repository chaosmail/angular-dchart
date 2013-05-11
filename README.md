Angular/D3.js Chart Directives
==============================

A Demo can be found here: http://chaosmail.at/2013/angular-dchart/

Line Chart
----------
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/line.png "Line Chart Demo")
```html
<dchart-line width="600" height="300">
<axis>
    <x align="bottom" range="auto" label-pos="end">x Axis</x>
    <y align="left" range="auto" label-pos="end">y Axis</y>
</axis>
<data-set stroke="orange" stroke-width="2" data="dataSetLine1">
</data-set>
<data-set stroke="green" stroke-width="1.5" data="dataSetLine2">
</data-set>
<data-set stroke="blue" stroke-width="1.5">
    <data x="7" y="7"></data>
    <data x="17" y="3"></data>
    <data x="8" y="12"></data>
    <data x="22" y="15"></data>
</data-set>
</dchart-line>
```
Histogramm
----------
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/histo.png "Histogramm Demo")
```html
<dchart-histo width="600" height="300">
<axis>
    <x align="bottom" ticks="20" range="auto">f(x) [m/s²]</x>
    <y align="left" range="auto">x [m²]</y>
</axis>
<data-set stroke="blue" fill="green" fill-opacity="0.8" stroke-width="1" data="dataSetLine1">
</data-set>
<data-set stroke="orange" fill="yellow" fill-opacity="0.8" stroke-width="0.5"  data="dataSetLine2">
</data-set>
<data-set stroke="red" fill="orange" fill-opacity="0.8" stroke-width="0.5">
    <data x="2" y="4"></data>
    <data x="4" y="8"></data>
    <data x="6" y="15"></data>
    <data x="8" y="25"></data>
</data-set>
</dchart-histo>
```
Scatterplot
-----------
![alt text](https://raw.github.com/chaosmail/angular-dchart/master/img/scatter.png "Scatterplot Demo")
```html
<dchart-scatter width="600" height="300">
<axis>
    <x align="bottom" range="auto">x Axis</x>
    <y align="left" range="auto">y Axis</y>
</axis>
<data-set stroke="blue" fill="green" fill-opacity="0.8" stroke-width="1" data="dataSetLine1">
</data-set>
<data-set stroke="orange" fill="yellow" fill-opacity="0.8" stroke-width="0.5"  data="dataSetLine2">
</data-set>
<data-set stroke="red" fill="orange" fill-opacity="0.8" stroke-width="0.5">
    <data x="2" y="4"></data>
    <data x="4" y="8"></data>
    <data x="6" y="15"></data>
    <data x="8" y="25"></data>
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