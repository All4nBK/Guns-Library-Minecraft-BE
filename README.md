# Guns Library Minecraft BE
This class provides functionality for registering and controlling weapons in a Minecraft Bedrock Edition environment. 
It allows players to use weapons and cause damage to entities based on the weapon used.
## Example use
```js
import { world } from '@minecraft/server';
import {WeaponLibrary} from './guns';

//  Object Json containing the weapon and its information (damage, ammo). Remember that the ammo must be a scoreboard for the code to work and the item used must be one that can be consumed.
const weapons = {
    "minecraft:apple": { damage: 5, ammo: "famas" },
    "minecraft:carrot": { damage: 13, ammo: "famas" },
};

const weaponLib = new WeaponLibrary(weapons);

world.afterEvents.itemStartUse.subscribe((event) => {
    weaponLib.handleItemStartUse(event);
    weaponLib.startDamageLoop();
});

world.afterEvents.itemStopUse.subscribe((event) => {
    weaponLib.handleItemStopUse(event);
    weaponLib.stopDamageLoop();
});

```
## Warning
For this library to work it needs another library called [support](https://github.com/All4nBK/Support-Script-Bedrock) for Minecraft Bedrock Edition
![animation_me2](https://github.com/All4nBK/Guns-Library-Minecraft-BE/assets/101974432/0a6117fa-4f05-486f-ba62-05d8722ea525)
