import { system, world } from '@minecraft/server';
import { scoreboard, actionbar } from '.support/support';
/**
 * Guns Library Minecraft BE.
 * 
 * This class provides functionality for registering and controlling weapons in a Minecraft Bedrock Edition environment.
 * It allows players to use weapons and cause damage to entities based on the weapon used.
 * 
 * @class WeaponLibrary
 * @author Discord: allan.z
 * 
 * Github: {@link https://github.com/All4nBK} 
 * @version 1.0
 */

export class WeaponLibrary {
    /**
     * Creates a new instance of WeaponLibrary.
     * 
     * @constructor
     * @param {object} weapons - An object containing the available weapons, where the keys are the names of the weapons and the values are objects containing information about each weapon.
     */
    constructor(weapons) {
        this.weapons = weapons;
        /**
         * Map that keeps track of players and their weapons.
         */
        this.playersWithWeapons = new Map();
        /**
         * ID of the interval used to control the periodic execution of damage.
         */
        this.intervalId = null;
        /**
         * Linked method to handle the initiation of the use of an item by a player.
         * @type {Function}
         */
        this.handleItemStartUse = this.handleItemStartUse.bind(this);
        /**
         * Linked method to handle the termination of a player's use of an item.
         * @type {Function}
         */
        this.handleItemStopUse = this.handleItemStopUse.bind(this);
    }

    /**
     * Register a weapon for a player.
     * 
     * @param {any} player - The player using the weapon.
     * @param {any} item - The item (weapon) used by the player.
     */
    registerWeapon(player, item) {
        const weaponName = item.typeId;
        const weapon = this.weapons[weaponName];
        if (weapon) {
            this.playersWithWeapons.set(player.nameTag, { player, item, weapon });
        }
    }

    /**
     * Removes the registration of a weapon for a player.
     * 
     * @param {any} player - The player whose weapon registration should be removed.
     */
    unregisterWeapon(player) {
        this.playersWithWeapons.delete(player.nameTag);
    }

    /**
     * Deals with a player starting to use an item.
     * 
     * @param {any} event - The event that triggered the start of the item's use.
     */
    handleItemStartUse(event) {
        const player = event.source;
        const item = event.itemStack;
        this.registerWeapon(player, item);
    }

    /**
     * Deals with the termination of a player's use of an item.
     * 
     * @param {any} event - The event that triggered the termination of the item's use.
     */
    handleItemStopUse(event) {
        const player = event.source;
        this.unregisterWeapon(player);
    }

    /**
     * Starts a loop to periodically apply damage caused by players' weapons.
     */
    startDamageLoop() {
        this.intervalId = system.runInterval(() => {
            this.playersWithWeapons.forEach(({ player, weapon }) => {
                if ( scoreboard(player,weapon.ammo,{return: 'returnNumber'}) > 0 ) {
                    actionbar(player,`${scoreboard(player, weapon.ammo, { return: "remove", value: 1 })}`)
                    const entities = player.getEntitiesFromViewDirection({ maxDistance: 20 });
                    const victim = entities.find(result => result.entity.getComponent('health'));
                    if (victim) {
                        victim.entity.applyDamage(weapon.damage);
                    }
                }
            });
        }, 10);
    }

    /**
     * For the periodic damage application loop.
     */
    stopDamageLoop() {
        if (this.intervalId !== null) {
            system.clearRun(this.intervalId);
            this.intervalId = null;
        }
    }
}
