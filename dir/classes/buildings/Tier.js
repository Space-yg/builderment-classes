/**
 * @author Space.yg
 */
/** Make a new Tier */
export class Tier {
    // Properties
    /** All tiers */
    tiers = {};
    /** Maximum tier */
    maxTier;
    /** Minimum tier */
    minTier;
    /**
     * Constructs a Factory object
     * @param options The tier options
     */
    constructor(options) {
        // Check for empty properties
        var tiersKeys = new Array(Object.keys(options.tiers).length);
        Object.keys(options.tiers).forEach((tier, i) => tiersKeys[i] = Number(tier));
        var lastImage = options.tiers[Math.min(...tiersKeys)].image;
        if (lastImage === undefined)
            throw new Error("The smallest tier must have an image");
        for (let i = Math.min(...tiersKeys); i <= Math.max(...tiersKeys); i++) {
            // Check if tier exists
            if (!options.tiers[i])
                throw new Error(`The number ${i} is missing from the tiers. The tiers must include all integers from the smallest value (${Math.min(...tiersKeys)}) to the largest value (${Math.max(...tiersKeys)}).`);
            this.tiers[i] = {
                output: options.tiers[i].output,
                price: { gold: 0, gems: 0 },
                image: options.tiers[i].image ?? options.tiers[i - 1].image
            };
            // Price
            if (typeof options.tiers[i].price !== "undefined") {
                if (options.tiers[i].price.gold)
                    this.tiers[i].price.gold = options.tiers[i].price.gold;
                if (options.tiers[i].price.gems)
                    this.tiers[i].price.gems = options.tiers[i].price.gems;
            }
            // Image
            if (typeof options.tiers[i].image === "undefined")
                this.tiers[i].image = lastImage;
            else
                lastImage = options.tiers[i].image;
        }
        // Maximum and minimum Tiers
        this.maxTier = Math.max(...tiersKeys);
        this.minTier = Math.min(...tiersKeys);
    }
    /**
     * Get the total price to get to a tier
     * @param tier The tier
     */
    getTotalPrice(tier) {
        var total = {
            gold: 0,
            gems: 0,
        };
        if (tier < this.minTier)
            throw new Error("Tier cannot be less than minimum tier.");
        if (tier > this.maxTier)
            throw new Error("Tier cannot be greater than maximum tier.");
        for (let i = this.minTier; i <= tier; i++)
            for (const currency in total)
                total[currency] += this.tiers[i].price[currency];
        return total;
    }
    /**
     * Get the total price to get to the maximum tier
     * @readonly
     */
    get maxPrice() { return this.getTotalPrice(this.maxTier); }
    /**
     * Get the total output of a tier
     * @param tier The tier
     */
    getTotalOutput(tier) {
        var total = 1;
        if (tier < this.minTier)
            throw new Error("Tier cannot be less than minimum tier.");
        if (tier > this.maxTier)
            throw new Error("Tier cannot be greater than maximum tier.");
        for (let i = this.minTier; i <= tier; i++)
            total *= this.tiers[i].output;
        return Math.round(total * 100_000_000_000_000) / 100_000_000_000_000;
    }
    /**
     * Get the maximum output
     * @readonly
     */
    get maxOutput() { return this.getTotalOutput(this.maxTier); }
}
