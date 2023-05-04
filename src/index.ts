/**
 * @author Space.yg
 */

interface Discord {
    /** The user's id */
    id: string
    /** The user's username, not unique across the platform */
    username: string
    /** The user's 4-digit discord-tag */
    discriminator: string
    /** The user's avatar hash */
    avatar?: string
    /** Whether the user belongs to an OAuth2 application */
    bot: boolean
    /** Whether the user is an Official Discord System user (part of the urgent message system) */
    system: boolean
    /** The user's banner hash */
    banner?: string
    /** The user's banner color encoded as an integer representation of hexadecimal color code */
    accentColor?: number
    /** The flags on a user's account */
    flags: number
}

export const Space: { 
    /** The author a.k.a me :) */ 
    yg: {
        /** My discord information */
        Discord: Discord
    }
} = {
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
}

//// Classes
export { Base } from "./classes/Base.js"
export { Item } from "./classes/Item.js"
export { Seed } from "./classes/Seed.js"
export { Technology } from "./classes/Technology.js"
// Buildings
export { Decoration } from "./classes/buildings/Decoration.js"
export { Factory } from "./classes/buildings/Factory.js"
export { PowerPlant } from "./classes/buildings/PowerPlant.js"
export { Transportation } from "./classes/buildings/Transportation.js"
// Designs
export { Design } from "./classes/designs/Design.js"
export { Requirements } from "./classes/designs/Requirements.js"
export { Balancer } from "./classes/designs/Balancer.js"
export { Splitter } from "./classes/designs/Splitter.js"
export { FactorySplitter } from "./classes/designs/FactorySplitter.js"
export { Valve } from "./classes/designs/Valve.js"
export { LabBalancer } from "./classes/designs/LabBalancer.js"

//// Objects
export * as items from "./objects/items.js"
export * as technologies from "./objects/technologies.js"
// Buildings
export * as decorations from "./objects/buildings/decorations.js"
export * as factories from "./objects/buildings/factories.js"
export * as other from "./objects/buildings/other.js"
export * as powerPlants from "./objects/buildings/powerPlants.js"
export * as transportations from "./objects/buildings/transportations.js"
// Designs
export * as balancers from "./objects/designs/balancers.js"
export * as factorySplitters from "./objects/designs/factorySplitters.js"
export * as labBalancers from "./objects/designs/labBalancers.js"
export * as splitters from "./objects/designs/splitters.js"
export * as valves from "./objects/designs/valves.js"