# comfort-temperature
To calculate the comfort air temperature from the standard of ASHRAE-55

Core code comes from https://github.com/CenterForTheBuiltEnvironment/comfort_tool  

## Usage

```js
var ct = require('comfort-temperature').ComportTemperature;

var ta = 15;    // air temperature, [C]
var tr = 25;    // mean radiant temperature, [C]
var vel = 0.8;  // air speed, [m/s]
var rh = 40;    // relative humidity, [%]
var met = 1;    // metabolic rate, [met]
var clo = 0.6;  // clothing level, [clo]
var wme = 0;    // external work, [met]


var result = ct.Calculate(ta, tr, vel, rh, met, clo, wme); 

console.log(result);
```

Output would be 
```js
{
  pmv: -4.558394498497179,
  ppd: 99.999999470295,
  set: 13.537207469450086,
  ta_adj: 8.775882545393353,
  tr_adj: 18.77588254539335,
  cooling_effect: 6.224117454606647,
  target_temp: 30
}
```  

The `target_temp: 30 °C` would be the suggested best comfortable air temperature.

You can double check the result from this web tool: https://comfort.cbe.berkeley.edu/  

Put all parameters in the form, then change the **Air temperature** with the value of `target_temp`, you will see the `PMV with elevated air speed` is the lowest. Which means it's the best comfortable air temperature. https://en.wikipedia.org/wiki/Thermal_comfort#PMV/PPD_method  