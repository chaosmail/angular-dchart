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
    <point x="7" y="7"></point>
    <point x="17" y="3"></point>
    <point x="8" y="12"></point>
    <point x="22" y="15"></point>
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
    <point x="2" y="4"></point>
    <point x="4" y="8"></point>
    <point x="6" y="15"></point>
    <point x="8" y="25"></point>
</data-set>
</dchart-histo>
```