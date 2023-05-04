/**
 * @author Space.yg
 */
/** The base of some classes */
class Base {
    // Properties
    /** The name */
    name;
    /** The price */
    price = {
        gold: 0,
        gems: 0,
    };
    /** The URL to the image */
    image;
    // Static properties
    /** Total bases that has been created */
    static #amount = 0;
    /**
     * Total bases that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the bases that has been created */
    static #bases = {};
    /**
     * All the bases that has been created
     * @readonly
     */
    static get bases() { return this.#bases; }
    /**
     * Constructs a Base
     * @param options The Base options
     */
    constructor(options) {
        this.name = options.name;
        for (const currency in this.price)
            this.price[currency] = ((options.price[currency] === undefined) ? 0 : options.price[currency]);
        this.image = options.image;
        Base.#amount++;
        if (!Base.#bases[options.name])
            Base.#bases[options.name] = [this];
        else
            Base.#bases[options.name].push(this);
    }
}
export { Base };
