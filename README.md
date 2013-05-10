Angular/D3.js Chart Directives
==============================

A Demo can be found here: http://chaosmail.at/2013/angular-dchart/

Line Chart
----------

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