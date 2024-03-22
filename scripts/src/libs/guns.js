import { system, world } from '@minecraft/server';
import { support } from './support/support';
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

    /**
     * Array to store weapons data.
     */
    static pool_weapon = []

    static on_use_item = false;

    constructor(weapons) {
        this.weapons = weapons;
        /**
         * ID of the interval used to control the periodic execution of damage.
         */
        this.intervalId = null;
        /**
         * Linked method to handle the initiation of the use of an item by a player.
         * @type {Function}
         */
        this.handleItemStartUse = this.handleItemStartUse.bind(this);
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
            WeaponLibrary.pool_weapon.push({
                player, item, weapon
            })
        }
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
        WeaponLibrary.on_use_item = true;
    }
    handleItemStopUse() {
        WeaponLibrary.on_use_item = false;
    }
}

// Run interval to clear weapon pool
system.runInterval(() => {
    WeaponLibrary.pool_weapon.forEach((element, index) => {
        const { player, item, weapon } = element;
        if (WeaponLibrary.on_use_item == false)
            delete WeaponLibrary.pool_weapon[index]
        if (weapon.ammo != null) {
            if (support.scoreboard(player, weapon.ammo, { return: 'return' }) > 0) {
                support.actionbar(player, `${support.scoreboard(player, weapon.ammo, { return: 'remove', value: 1 })}`)
                const entities = player.getEntitiesFromViewDirection({ maxDistance: 20 });
                const victim = entities.find(result => result.entity.getComponent('health'));
                if (victim) {
                    victim.entity.applyDamage(weapon.damage);
                }
            }
        } else {
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 20 });
            const victim = entities.find(result => result.entity.getComponent('health'));
            if (victim) {
                victim.entity.applyDamage(weapon.damage);
            }
        }
    })
});
