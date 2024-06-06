var ComportTemperature = ComportTemperature || {};

if (typeof module !== "undefined" && module.exports) {
    var comf = require("./src/comfort-models.js").comf;
    module.exports.ComportTemperature = ComportTemperature;
}
/** 
 * Returns comfort values for elevated air speeds https://comfort.cbe.berkeley.edu/
 * @param  {Number} ta      air temperature, [C]
 * @param  {Number} tr      mean radiant temperature, [C]
 * @param  {Number} vel     air speed, [m/s]
 * @param  {Number} rh      relative humidity, [%]
 * @param  {Number} met     metabolic rate, [met]
 * @param  {Number} clo     clothing level, [clo]
 * @param  {Number} wme     external work, [met]
 * @return {Class}  r       containing estimated parameters [pmv, ppd, ta_adj, tr_adj, cooling_effect, set, cat]
 *  cat: Comfortable Air Temperature
 */
ComportTemperature.Calculate = function (ta, tr, vel, rh, met, clo, wme) {
    var r = comf.pmvElevatedAirspeed(ta, tr, vel, rh, met, clo, wme);
    var originalR = r;
    var previousR = r;
    var previousTA = ta;

    /**
     * Do a loop, when pmv > 0, set next ta = ta - 0.5, when pmv < 0, set next ta = ta + 0.5
     * While the previous pmv and current pmv have the same sign, keep looping.
     */
    while (Math.sign(previousR.pmv) === Math.sign(r.pmv)) {
        previousR = r;
        previousTA = ta;
        if (r.pmv > 0) {
            ta = ta - 0.5;
        } else {
            ta = ta + 0.5;
        }
        r = comf.pmvElevatedAirspeed(ta, tr, vel, rh, met, clo, wme);
    }

    var result = originalR;
    if (Math.abs(r.pmv) < Math.abs(previousR.pmv)) {
        result.cat = ta;
    } else {
        result.cat = previousTA;
    }

    return result;
};
