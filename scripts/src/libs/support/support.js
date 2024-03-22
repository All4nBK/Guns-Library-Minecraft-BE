import { Entity, EntityEquippableComponent, EquipmentSlot, Player, world, system } from '@minecraft/server';


/**
 * Support-Script-Bedrock 
 * 
 * Support class provides utility methods for various tasks in Minecraft server-side scripting.
 * @class Support
 * @author Discord: allan.z
 * 
 * Github: {@link https://github.com/All4nBK} 
 * @version 1.0
 */
class Support {
    /**
     * @typedef {Object} Action
     * @property {'return'|'returnObject'|'add'|'set'|'remove'} Action.return - The action to perform ('return', 'add', 'set', 'remove').
     * @property {number|0} Action.value - The value to use for the action.
     */
    /**
     * Updates a scoreboard for the specified entity.
     * @param {Entity} entity - The entity for which the scoreboard is being updated.
     * @param {Object} scoreboard - The scoreboard to update.
     * @param {Action} action - The action to perform on the scoreboard.
     * @returns {number} - The updated scoreboard value.
     */
    scoreboard(entity, scoreboard, action) {
        const objective = world.scoreboard.getObjective(scoreboard)
        switch (action.return) {
            case 'return':
                return objective.getScore(entity);
                break;
            case 'add':
                return objective.addScore(entity, action.value);
                break;
            case 'set':
                return objective.setScore(entity, action.value);
                break;
            case 'remove':
                return objective.addScore(entity, -action.value);
                break;
        }
    }
    /**
     * Displays a message in the player's action bar for a specified duration.
     * @param {Player} player - The player to display the action bar message to.
     * @param {Object|string} message - The message to display. Can be a rawMessage object or plain text.
     * @param {number} [timer=1] - The duration of the action bar message in seconds.
     * @example
     * ```js
     * const rawMessage = { translate: 'accessibility.list.or.two', with: ['First', 'Second'] };
     * support.actionbar(player, rawMessage, 3);
     * ```
     */
    actionbar(player, message, timer = 1) {
        const interval = system.runInterval(() => {
            player.onScreenDisplay.setActionBar(message)
        });
        system.runTimeout(() => {
            system.clearRun(interval);
        }, 20 * timer)
    }
    /**
     * Sends a debug message to the server console or chat.
     * @param {Array|string} message - The debug message(s) to send.
     */
    debug(message) {
        if (typeof message === 'string') {
            world.sendMessage(`${time()}Aviso: ${message}`);
        } else if (Array.isArray(message)) {
            message.forEach((msg) => {
                world.sendMessage(`${time()}Aviso: ${msg}`);
            })
        } else {
            world.sendMessage(`${typeof message}`)
        }
    }
    /**
     * @typedef {Object} Slot
     * @property {'mainhand'|'offhand'|'helmet'|'chestplace'|'leggings'|'boots'} Slot.slot 
     */
    /**
     * Retrieves the item equipped in the specified slot by the player.
     * @param {Player} player - The player whose item is being retrieved.
     * @param {Slot} slot - The slot from which to retrieve the item.
     * @returns {EntityEquippableComponent|null} - The equipped item in the specified slot, or null if no item is equipped.
     */
    getItem(player, slot) {
        /**
         * @type {EntityEquippableComponent}
         */
        const componet = player.getComponent('minecraft:equippable');
        switch (slot.slot) {
            case 'mainhand':
                const mainhand = componet.getEquipment(EquipmentSlot.Mainhand);
                if (mainhand.typeId != '') {
                    return mainhand;
                } else return
                break
            case 'offhand':
                const offhand = componet.getEquipment(EquipmentSlot.Offhand);
                if (offhand.typeId != '') {
                    return offhand;
                } else return
                break
            case 'helmet':
                const helmet = componet.getEquipment(EquipmentSlot.Head);
                if (helmet.typeId != '') {
                    return helmet;
                } else return
                break
            case 'chestplace':
                const chestplace = componet.getEquipment(EquipmentSlot.Chest);
                if (chestplace.typeId != '') {
                    return chestplace;
                } else return
                break
            case 'leggings':
                const leggings = componet.getEquipment(EquipmentSlot.Legs);
                if (leggings.typeId != '') {
                    return leggings;
                } else return
                break
            case 'boots':
                const boots = componet.getEquipment(EquipmentSlot.Feet);
                if (boots.typeId != '') {
                    return boots;
                } else return
                break
        }

    }

}

/**
 * Utility function to generate formatted time string.
 * @private
 * @returns {string} - The formatted time string.
 */
function time() {
    let secs = parseInt((world.getAbsoluteTime() / 20).toString());
    let min = parseInt((secs / 60).toString());
    secs = (secs % 60);
    return (min & 60) + ":" + (secs < 10 ? "0" + secs : secs);
}

// Instance of Support class
export const support = new Support();