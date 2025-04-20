/**
 * @author Space.yg
 */

interface DiscordUser {
	/** The user's id */
	id: string
	/** The user's username, not unique across the platform */
	username: string
	/** The user's Discord-tag */
	discriminator: string
	/** The user's display name, if it is set. For bots, this is the application name */
	global_name: string | null
	/** The user's avatar hash */
	avatar: string | null
	/** Whether the user belongs to an OAuth2 application */
	bot?: boolean
	/** Whether the user is an Official Discord System user (part of the urgent message system) */
	system?: boolean
	/** Whether the user has two factor enabled on their account */
	mfa_enabled?: boolean
	/** The user's banner hash */
	banner?: string | null
	/** The user's banner color encoded as an integer representation of hexadecimal color code */
	accentColor?: number | null
	/** The user's chosen language option */
	locale?: string
	/** Whether the email on this account has been verified */
	verified?: boolean
	/** The user's email */
	email?: string | null
	/** The flags on a user's account */
	flags?: number
	/** The type of Nitro subscription on a user's account */
	premium_type?: number
	/** The public flags on a user's account */
	public_flags?: number
	/** The user's avatar decoration hash */
	avatar_decoration?: string | null
}

export const Space: {
	/** The author a.k.a me :) */
	yg: {
		/** My Discord information */
		Discord: DiscordUser
		/** My GitHub account */
		GitHub: string,
		/** My Instagram account */
		Instagram: string,
		/** My X (Twitter) account */
		X: string,
	}
} = {
	yg: {
		Discord: {
			id: '710012954736590908',
			bot: false,
			system: false,
			flags: 4194368,
			username: 'space.yg',
			global_name: 'Space.yg',
			discriminator: '0',
			avatar: 'c6e77d918ce84cc49664ca505fab3727',
			banner: null,
			accentColor: null,
			avatar_decoration: null,
		},
		GitHub: "space-yg",
		Instagram: "space.yg",
		X: "space_yag",
	},
}

// Later
// TODO: Add .clone method to all classes
// TODO: Add .delete method to all classes
// TODO: Add Symbols to all classes

//// Utils
export {
	type InGameBaseResource,
	InGameBaseResources,
	type InGameNonBaseResource,
	InGameNonBaseResources,
	type InGameResource,
	InGameResources,
	type InGameAltResource,
	InGameAltResources,
	type MaxItem,
} from "./utils/resources"

//// Classes
export {
	Area,
	type AreaParams,
} from "./classes/Area"
export {
	Base,
	type BaseParams,
} from "./classes/Base"
export type {
	InputOptions,
	InputMap,
} from "./classes/Input"
export {
	Item,
	type ItemParams,
} from "./classes/Item"
export {
	Price,
	type PriceParams,
} from "./classes/Price"
export {
	Seed,
	type AdvancedWorldSetting,
	type ResourcesParams,
	type SeedParams,
} from "./classes/Seed"
export {
	Technology,
	type BuildTierOptions,
	type TechnologyParams,
} from "./classes/Technology"

//* Buildings
export {
	Decoration,
	type DecorationParams,
} from "./classes/buildings/Decoration"
export {
	ItemCollector,
	type ItemCollectorParams,
} from "./classes/buildings/ItemCollector"
export {
	PowerPlant,
	type PowerPlantParams,
} from "./classes/buildings/PowerPlant"

//* Tiers
export {
	Tier,
	type TierParams,
} from "./classes/buildings/tiers/Tier"
export {
	Tiers,
	type TiersParams,
} from "./classes/buildings/tiers/Tiers"

//? DistanceTier
export {
	DistanceTier,
	type DistanceTierParams,
} from "./classes/buildings/tiers/distance-tiers/DistanceTier"
export {
	DistanceTiers,
	type DistanceTiersParams,
} from "./classes/buildings/tiers/distance-tiers/DistanceTiers"
export {
	TransportationDistance,
	type TransportationDistanceParams,
} from "./classes/buildings/tiers/distance-tiers/TransportationDistance"

//? OutputTier
export {
	OutputTier,
	type OutputTierParams,
} from "./classes/buildings/tiers/output-tiers/OutputTier"
export {
	OutputTiers,
	type OutputTiersParams,
} from "./classes/buildings/tiers/output-tiers/OutputTiers"
export {
	Factory,
	type FactoryParams,
} from "./classes/buildings/tiers/output-tiers/Factory"

//? SpeedTier
export {
	SpeedTier,
	type SpeedTierParams,
} from "./classes/buildings/tiers/speed-tier/SpeedTier"
export {
	SpeedTiers,
	type SpeedTiersParams,
} from "./classes/buildings/tiers/speed-tier/SpeedTiers"
export {
	TransportationSpeed,
	type TransportationSpeedParams,
} from "./classes/buildings/tiers/speed-tier/TransportationSpeed"

//? StorageTier
export {
	StorageTier,
	type StorageTierParams,
} from "./classes/buildings/tiers/storage-tiers/StorageTier"
export {
	StorageTiers,
	type StorageTiersParams,
} from "./classes/buildings/tiers/storage-tiers/StorageTiers"
export {
	Storage,
	type StorageParams,
} from "./classes/buildings/tiers/storage-tiers/Storage"

//// Objects
export * as currencies from "./objects/currencies"
export * as items from "./objects/items"
export * as technologies from "./objects/technologies"

// Buildings
export * as decorations from "./objects/buildings/decorations"
export * as factories from "./objects/buildings/factories"
export * as itemCollectors from "./objects/buildings/item-collectors"
export * as powerPlants from "./objects/buildings/power-plants"
export * as others from "./objects/buildings/storages"
export * as transportations from "./objects/buildings/transportations"