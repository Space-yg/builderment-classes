/**
 * @author Space.yg
 */
export const Space = {
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
//// Classes
export { Base } from "./classes/Base.js";
export { Item } from "./classes/Item.js";
export { Seed } from "./classes/Seed.js";
export { Technology } from "./classes/Technology.js";
// Buildings
export { Decoration } from "./classes/buildings/Decoration.js";
export { Factory } from "./classes/buildings/Factory.js";
export { PowerPlant } from "./classes/buildings/PowerPlant.js";
export { Transportation } from "./classes/buildings/Transportation.js";
// Designs
export { Design } from "./classes/design/Design.js";
export { Requirements } from "./classes/design/Requirements.js";
export { Balancer } from "./classes/design/Balancer.js";
export { Splitter } from "./classes/design/Splitter.js";
export { FactorySplitter } from "./classes/design/FactorySplitter.js";
export { Valve } from "./classes/design/Valve.js";
export { LabBalancer } from "./classes/design/LabBalancer.js";
//// Objects
export * as items from "./objects/items.js";
export * as technologies from "./objects/technologies.js";
// Buildings
export * as decorations from "./objects/buildings/decorations.js";
export * as factories from "./objects/buildings/factories.js";
export * as other from "./objects/buildings/other.js";
export * as powerPlants from "./objects/buildings/powerPlants.js";
export * as transportations from "./objects/buildings/transportations.js";
// Designs
export * as balancers from "./objects/design/balancers.js";
export * as factorySplitters from "./objects/design/factorySplitters.js";
export * as labBalancers from "./objects/design/labBalancers.js";
export * as splitters from "./objects/design/splitters.js";
export * as valves from "./objects/design/valves.js";
