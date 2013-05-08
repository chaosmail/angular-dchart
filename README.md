Angular/D3.js Chart Directives
==============================

A Demo can be found here: http://chaosmail.at/2013/angular-dchart/

Line Chart
----------

```html
<dchart-line width="600" height="300">
<axis>
    <x align="bottom" range="auto">f(x) [m/s²]</x>
    <y align="left" range="auto">x [m²]</y>
</axis>
<data-set stroke="green" stroke-width="1.5">
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
    <x align="bottom" ticks="12" domain="[0,10]">f(x) [m/s²]</x>
    <y align="left" range="auto">x [m²]</y>
</axis>
<data-set stroke="blue" fill="orange" fill-opacity="0.8" stroke-width="0.5">
    <point x="2" y="4"></point>
    <point x="4" y="8"></point>
    <point x="6" y="15"></point>
    <point x="8" y="25"></point>
</data-set>
</dchart-histo>
```