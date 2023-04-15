"use strict";

/**
 * @author Space.yg
 */

/**
 * A Discord User object type
 * @typedef {Object} Discord
 * @property {String} id the user's id
 * @property {String} username the user's username, not unique across the platform
 * @property {String} discriminator the user's 4-digit discord-tag
 * @property {String} [avatar] the user's avatar hash
 * @property {boolean} bot whether the user belongs to an OAuth2 application
 * @property {boolean} system whether the user is an Official Discord System user (part of the urgent message system)
 * @property {String} [banner] the user's banner hash
 * @property {Number} [accentColor] the user's banner color encoded as an integer representation of hexadecimal color code
 * @property {Number} flags the flags on a user's account
 */

/**
 * The author a.k.a me :)
 * @typedef {Object} author
 * @property {Discord} Discord My discord information
 */

export const Space = {
    /** @type {author} */
    yg: {
        Discord: {
            id: "710012954736590908",
            username: "Space.yg#4936",
            discriminator: "4936",
            avatar: "c6e77d918ce84cc49664ca505fab3727",
            bot: false,
            system: false,
            flags: 64,
            banner: undefined,
            accentColor: undefined,
        },
    },
};

// Classes
export { Base } from "./classes/Base.js";
export { Decoration } from "./classes/Decoration.js";
export { Factory } from "./classes/Factory.js";
export { Item } from "./classes/Item.js";
export { PowerPlant } from "./classes/PowerPlant.js";
export { Seed } from "./classes/Seed.js";
export { Technology } from "./classes/Technology.js";
export { Transportation } from "./classes/Transportation.js";

// Objects
export * as decorations from "./objects/decorations.js";
export * as factories from "./objects/factories.js";
export * as items from "./objects/items.js";
export * as other from "./objects/other.js";
export * as powerPlants from "./objects/powerPlants.js";
export * as technologies from "./objects/technologies.js";
export * as transportations from "./objects/transportations.js";