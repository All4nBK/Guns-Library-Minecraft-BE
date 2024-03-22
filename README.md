# ![perfil_small](https://github.com/All4nBK/Guns-Library-Minecraft-BE/assets/101974432/cd5ca498-8625-4da9-a712-4b14b014e2e8)Guns Library Minecraft BE
This class provides functionality for registering and controlling weapons in a Minecraft Bedrock Edition environment. 
It allows players to use weapons and cause damage to entities based on the weapon used.
## Example use
```js
import { world } from '@minecraft/server';
import {WeaponLibrary} from './libs/guns';

//  Object Json containing the weapon and its information (damage, ammo). Remember that the ammo must be a scoreboard for the code to work and the item used must be one that can be consumed.
const weapons = {
    "minecraft:apple": { damage: 5, ammo: null },
    "minecraft:carrot": { damage: 13, ammo: "famas" },
};

const weaponLib = new WeaponLibrary(weapons);

world.afterEvents.itemStartUse.subscribe((event) => {
    weaponLib.handleItemStartUse(event);
});

world.afterEvents.itemStopUse.subscribe((event) => {
    weaponLib.handleItemStopUse();
});
```

![animation_me2](https://github.com/All4nBK/Guns-Library-Minecraft-BE/assets/101974432/0a6117fa-4f05-486f-ba62-05d8722ea525)
