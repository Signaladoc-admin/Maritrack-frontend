export interface IPlan {
    id: string;
    name: string;
    billingCycle: string;
    deviceLimit: number;
    priceNGN: number;
    description: string;
    // Percent already baked into `priceNGN` (which is the post-discount amount the
    // user pays). 0 means no discount. Used to derive the slashed "original" price.
    discountPercentage?: number;
}