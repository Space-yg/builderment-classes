/**
 * @author Space.yg
 */

import { BaseOptions, PriceOptions } from "../../classes/Base.js"

interface StorageOptions {

    // Properties

    /** The name of the storage */
    name: string,
    /** The price of the storage */
    price: PriceOptions,
    /** The description of the storage */
    description: "Storage buildings can only store one type of item at a time. Max capacity can be upgraded.",
    /** The minimum tier of the storage */
    minTier: 1,
    /** The maximum tier of the storage */
    maxTier: 4,
    /** The tiers of the storage */
    tiers: {
        [tier: number]: {
            /** The amount of storage at that tier */
            storage: number
            /** The price of storage at that tier */
            price: PriceOptions
            /** The URL to the image of storage at that tier */
            image: string
        }
    }

    // Methods

    /**
     * Get the total price to get to a tier
     * @param tier The tier
     */
    getTotalPrice(tier: number): PriceOptions
    /**
     * Get the total price to get to the max tier
     * @readonly
     */
    get maxPrice(): PriceOptions

    /**
     * Get the total storage at a tier
     * @param tier The tier
     */
    getTotalStorage(tier: number): number
    /**
     * Get the total storage at the maximum tier
     * @readonly
     */
    get maxStorage(): number
}

interface itemCollector extends BaseOptions {
    /** The description of the build */
    description: string,
    /** The limit how many of the build can be build */
    limit: number,
    /** The amount of inputs of the build */
    inputs: number,
}

export const storage: StorageOptions = {
    name: "Storage",
    price: { gold: 500, gems: 0 },
    description: "Storage buildings can only store one type of item at a time. Max capacity can be upgraded.",
    minTier: 1,
    maxTier: 4,
    tiers: {
        1: {
            price: { gold: 500, gems: 0 },
            storage: 250,
            image: "https://static.wikia.nocookie.net/builderment/images/4/43/Storage_1.png",
        },
        2: {
            price: { gold: 500, gems: 0 },
            storage: 250,
            image: "https://static.wikia.nocookie.net/builderment/images/8/8a/Storage_2.png",
        },
        3: {
            price: { gold: 1000, gems: 0 },
            storage: 500,
            image: "https://static.wikia.nocookie.net/builderment/images/4/48/Storage_3.png",
        },
        4: {
            price: { gold: 2000, gems: 0 },
            storage: 1000,
            image: "https://static.wikia.nocookie.net/builderment/images/c/c1/Storage_4.png",
        },
    },

    // Methods

    getTotalPrice(tier: number) {
        var total: PriceOptions = { gold: 0, gems: 0 }
        if (tier < this.minTier) throw new Error("Tier cannot be less than minimum tier.")
        if (tier > this.maxTier) throw new Error("Tier cannot be greater than maximum tier.")
        for (let i = this.minTier; i <= tier; i++) for (const currency in total) total[currency as keyof PriceOptions]! += this.tiers[i].price[currency as keyof PriceOptions]!
        return total
    },
    get maxPrice() { return this.getTotalPrice(this.maxTier) },

    getTotalStorage(tier: number) {
        var total = 0
        if (tier < this.minTier) throw new Error("Tier cannot be less than minimum tier.")
        if (tier > this.maxTier) throw new Error("Tier cannot be greater than maximum tier.")
        for (let i = this.minTier; i <= tier; i++) total += this.tiers[i].storage
        return total
    },
    get maxStorage() { return this.getTotalStorage(this.maxTier) },
}
export const researchLab: itemCollector = {
    name: "Research Lab",
    price: { gold: 1000, gems: 0 },
    image: "https://static.wikia.nocookie.net/builderment/images/f/fd/Research_lab.png",
    description: "Item sent into the Research Lab can be used to unlock technology. Items not used for research will give you gold instead.",
    limit: 1,
    inputs: 4,
}
export const goldVault: itemCollector = {
    name: "Gold Vault",
    price: { gold: 100, gems: 0 },
    image: "https://static.wikia.nocookie.net/builderment/images/f/fd/Research_lab.png",
    description: "Item sent into the Gold Vault converted into gold that can be used to build your factory.",
    limit: 3,
    inputs: 4,
}