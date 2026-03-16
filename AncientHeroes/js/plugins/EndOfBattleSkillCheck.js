/*:
 * @target MZ MV
 * @plugindesc Runs custom JavaScript at the end of each turn for battlers with states that have a <EndTurnScript> note tag.
 * @author Generated
 *
 * @help
 * ================================
 * How to Use
 * ================================
 * In the database, open a State and put this in the Note box:
 *
 * <EndTurnScript>
 * battler.gainHp(50); // Heal 50 HP
 * battler.addState(10); // Apply another state
 * console.log(battler.name() + " triggered end turn script!");
 * </EndTurnScript>
 *
 * - The code inside will run at the end of each turn for any battler
 *   (actor or enemy) that has that state.
 * - You can use `battler` to refer to the battler with the state.
 *
 * ================================
 * Example:
 * ================================
 * <EndTurnScript>
 * if (battler.hpRate() < 0.5) {
 *     battler.gainHp(100); // Heal if HP below 50%
 * }
 * </EndTurnScript>
 *
 * ================================
 * Compatibility:
 * ================================
 * Works with RPG Maker MV and MZ.
 */

(() => {
    // Helper: Extract script from note tags
    function getEndTurnScript(state) {
        if (!state || !state.note) return null;
        const match = state.note.match(/<EndTurnScript>([\s\S]*?)<\/EndTurnScript>/i);
        return match ? match[1].trim() : null;
    }

    const _BattleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
        // Check all actors
        $gameParty.members().forEach(battler => {
            battler.states().forEach(state => {
                const script = getEndTurnScript(state);
                if (script) {
                    try {
                        eval(script);
                    } catch (e) {
                        console.error(`EndTurnScript Error in state ${state.id}:`, e);
                    }
                }
            });
        });

        // Check all enemies
        $gameTroop.members().forEach(battler => {
            battler.states().forEach(state => {
                const script = getEndTurnScript(state);
                if (script) {
                    try {
                        eval(script);
                    } catch (e) {
                        console.error(`EndTurnScript Error in state ${state.id}:`, e);
                    }
                }
            });
        });

        _BattleManager_endTurn.call(this);
    };
})();
