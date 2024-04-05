/**
 * @author Space.yg
 */
export const storage = {
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
    getTotalPrice(tier) {
        var total = { gold: 0, gems: 0 };
        if (tier < this.minTier)
            throw new Error("Tier cannot be less than minimum tier.");
        if (tier > this.maxTier)
            throw new Error("Tier cannot be greater than maximum tier.");
        for (let i = this.minTier; i <= tier; i++)
            for (const currency in total)
                total[currency] += this.tiers[i].price[currency];
        return total;
    },
    get maxPrice() { return this.getTotalPrice(this.maxTier); },
    getTotalStorage(tier) {
        var total = 0;
        if (tier < this.minTier)
            throw new Error("Tier cannot be less than minimum tier.");
        if (tier > this.maxTier)
            throw new Error("Tier cannot be greater than maximum tier.");
        for (let i = this.minTier; i <= tier; i++)
            total += this.tiers[i].storage;
        return total;
    },
    get maxStorage() { return this.getTotalStorage(this.maxTier); },
};
export const researchLab = {
    name: "Research Lab",
    price: { gold: 1000, gems: 0 },
    image: "https://static.wikia.nocookie.net/builderment/images/f/fd/Research_lab.png",
    description: "Item sent into the Research Lab can be used to unlock technology. Items not used for research will give you gold instead.",
    limit: 1,
    inputs: 4,
};
export const goldVault = {
    name: "Gold Vault",
    price: { gold: 100, gems: 0 },
    image: "https://static.wikia.nocookie.net/builderment/images/f/fd/Research_lab.png",
    description: "Item sent into the Gold Vault converted into gold that can be used to build your factory.",
    limit: 3,
    inputs: 4,
};
