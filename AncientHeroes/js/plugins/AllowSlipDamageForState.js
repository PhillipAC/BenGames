/*:
 * @target MZ MV
 * @plugindesc Ignores optSlipDeath for specific states
 * @author Generated
 *
 * @param State IDs
 * @type string
 * @min 1
 * @desc The ID of the state that triggers the script call.
 * @default empty
 *
 * @help
 * ================================
 * How to Use
 * ================================
 * Add the state separated by commas that should ignore the optSlipDeath option.
 */

(() => {
	const parameters = PluginManager.parameters('AllowSlipDamageForState');
	const stateIds = stringToNumberArray(parameters['State IDs']);

	function stringToNumberArray(str) {
		if (typeof str !== 'string') {
			throw new TypeError('Input must be a string.');
		}

		return str
			.split(',')                 // Split by commas
			.map(s => s.trim())         // Remove extra spaces
			.filter(s => s !== '')      // Remove empty entries
			.map(s => {
				const num = Number(s);
				if (Number.isNaN(num)) {
					throw new Error(`Invalid number: "${s}"`);
				}
				return num;
			});
	}

	Game_Battler.prototype.maxSlipDamage = function () {
		var ignoreOptSlipDeath = false;
		for (var i = 0; i < stateIds.length; i++) {
			console.log(this);
			console.log(i);
			console.log(stateIds[i]);
			console.log(this.isStateAffected(stateIds[i]))
			if (this.isStateAffected(stateIds[i])) {
				ignoreOptSlipDeath = true;
			}
		}
		return ($dataSystem.optSlipDeath || ignoreOptSlipDeath) ? this.hp : Math.max(this.hp - 1, 0);
	}
})();