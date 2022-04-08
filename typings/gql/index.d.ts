declare namespace GQL {

type Maybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any };
}


interface Query {
  __typename?: 'Query';
  decks: Array<Deck>;
  deck?: Maybe<Deck>;
  artist?: Maybe<Artist>;
  cards: Array<Card>;
  card?: Maybe<Card>;
  products: Array<Product>;
  convertEurToUsd?: Maybe<Scalars['Float']>;
  opensea: Opensea;
  holders: Holders;
  deal?: Maybe<Deal>;
  dailyCard: Card;
}


interface QueryDeckArgs {
  slug: Scalars['String'];
}


interface QueryArtistArgs {
  id: Scalars['ID'];
}


interface QueryCardsArgs {
  deck?: Maybe<Scalars['ID']>;
  shuffle?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
}


interface QueryCardArgs {
  id: Scalars['ID'];
}


interface QueryProductsArgs {
  ids?: Maybe<Array<Scalars['ID']>>;
}


interface QueryConvertEurToUsdArgs {
  eur: Scalars['Float'];
}


interface QueryOpenseaArgs {
  collection: Scalars['String'];
}


interface QueryHoldersArgs {
  contract: Scalars['String'];
}


interface QueryDealArgs {
  hash: Scalars['String'];
  deckId: Scalars['String'];
  signature: Scalars['String'];
}

interface Deck {
  __typename?: 'Deck';
  _id: Scalars['String'];
  title: Scalars['String'];
  short: Scalars['String'];
  info: Scalars['String'];
  slug: Scalars['ID'];
  openseaCollection?: Maybe<Scalars['String']>;
  openseaContract?: Maybe<Scalars['String']>;
  cardBackground?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  properties: Scalars['JSON'];
  description?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
}

interface Artist {
  __typename?: 'Artist';
  _id: Scalars['ID'];
  name: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  userpic: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  shop?: Maybe<Scalars['String']>;
  social: Socials;
  country?: Maybe<Scalars['String']>;
}

interface Socials {
  __typename?: 'Socials';
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  behance?: Maybe<Scalars['String']>;
  dribbble?: Maybe<Scalars['String']>;
  foundation?: Maybe<Scalars['String']>;
  superrare?: Maybe<Scalars['String']>;
  makersplace?: Maybe<Scalars['String']>;
  knownorigin?: Maybe<Scalars['String']>;
  rarible?: Maybe<Scalars['String']>;
  niftygateway?: Maybe<Scalars['String']>;
  showtime?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
}

interface Card {
  __typename?: 'Card';
  _id: Scalars['ID'];
  img: Scalars['String'];
  video?: Maybe<Scalars['String']>;
  artist: Artist;
  info?: Maybe<Scalars['String']>;
  deck: Deck;
  suit?: Maybe<Scalars['String']>;
  value: Scalars['String'];
  opensea?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
}

interface Product {
  __typename?: 'Product';
  _id: Scalars['ID'];
  deck?: Maybe<Deck>;
  title: Scalars['String'];
  price: Scalars['Float'];
  status: Scalars['String'];
  type: Scalars['String'];
  image: Scalars['String'];
  image2: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  short: Scalars['String'];
}

interface Opensea {
  __typename?: 'Opensea';
  id: Scalars['ID'];
  editors: Array<Scalars['String']>;
  payment_tokens: Array<PaymentToken>;
  primary_asset_contracts: Array<PrimaryAssetContract>;
  traits: Scalars['JSON'];
  stats: Stats;
  banner_image_url?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['String']>;
  default_to_fiat?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  dev_buyer_fee_basis_points?: Maybe<Scalars['String']>;
  dev_seller_fee_basis_points?: Maybe<Scalars['String']>;
  discord_url?: Maybe<Scalars['String']>;
  external_url?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  featured_image_url?: Maybe<Scalars['String']>;
  hidden?: Maybe<Scalars['Boolean']>;
  safelist_request_status?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  is_subject_to_whitelist?: Maybe<Scalars['Boolean']>;
  large_image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  only_proxied_transfers?: Maybe<Scalars['Boolean']>;
  opensea_buyer_fee_basis_points?: Maybe<Scalars['String']>;
  opensea_seller_fee_basis_points?: Maybe<Scalars['String']>;
  payout_address?: Maybe<Scalars['String']>;
  require_email?: Maybe<Scalars['Boolean']>;
  slug: Scalars['ID'];
  twitter_username?: Maybe<Scalars['String']>;
  instagram_username?: Maybe<Scalars['String']>;
}

interface PaymentToken {
  __typename?: 'PaymentToken';
  id?: Maybe<Scalars['Int']>;
  symbol?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  eth_price?: Maybe<Scalars['Float']>;
  usd_price?: Maybe<Scalars['Float']>;
}

interface PrimaryAssetContract {
  __typename?: 'PrimaryAssetContract';
  address?: Maybe<Scalars['String']>;
  asset_contract_type?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nft_version?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['Int']>;
  schema_name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  total_supply?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  external_link?: Maybe<Scalars['String']>;
  image_url?: Maybe<Scalars['String']>;
  default_to_fiat?: Maybe<Scalars['Boolean']>;
  dev_buyer_fee_basis_points?: Maybe<Scalars['Int']>;
  dev_seller_fee_basis_points?: Maybe<Scalars['Int']>;
  only_proxied_transfers?: Maybe<Scalars['Boolean']>;
  opensea_buyer_fee_basis_points?: Maybe<Scalars['Int']>;
  opensea_seller_fee_basis_points?: Maybe<Scalars['Int']>;
  buyer_fee_basis_points?: Maybe<Scalars['Int']>;
  seller_fee_basis_points?: Maybe<Scalars['Int']>;
  payout_address?: Maybe<Scalars['String']>;
}

interface Stats {
  __typename?: 'Stats';
  one_day_volume?: Maybe<Scalars['Float']>;
  one_day_change?: Maybe<Scalars['Float']>;
  one_day_sales?: Maybe<Scalars['Float']>;
  one_day_average_price?: Maybe<Scalars['Float']>;
  seven_day_volume?: Maybe<Scalars['Float']>;
  seven_day_change?: Maybe<Scalars['Float']>;
  seven_day_sales?: Maybe<Scalars['Float']>;
  seven_day_average_price?: Maybe<Scalars['Float']>;
  thirty_day_volume?: Maybe<Scalars['Float']>;
  thirty_day_change?: Maybe<Scalars['Float']>;
  thirty_day_sales?: Maybe<Scalars['Float']>;
  thirty_day_average_price?: Maybe<Scalars['Float']>;
  total_volume?: Maybe<Scalars['Float']>;
  total_sales?: Maybe<Scalars['Float']>;
  total_supply?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
  num_owners?: Maybe<Scalars['Int']>;
  average_price?: Maybe<Scalars['Float']>;
  num_reports?: Maybe<Scalars['Int']>;
  market_cap?: Maybe<Scalars['Float']>;
  floor_price?: Maybe<Scalars['Float']>;
}

interface Holders {
  __typename?: 'Holders';
  fullDecks: Array<Scalars['String']>;
  fullDecksWithJokers: Array<Scalars['String']>;
  spades: Array<Scalars['String']>;
  diamonds: Array<Scalars['String']>;
  hearts: Array<Scalars['String']>;
  clubs: Array<Scalars['String']>;
  jokers: Array<Scalars['String']>;
}

interface Deal {
  __typename?: 'Deal';
  _id: Scalars['ID'];
  code: Scalars['String'];
  hash?: Maybe<Scalars['String']>;
  decks?: Maybe<Scalars['Int']>;
  deck?: Maybe<Deck>;
  claimed?: Maybe<Scalars['Boolean']>;
}
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Deck: ResolverTypeWrapper<Deck>;
  Artist: ResolverTypeWrapper<Artist>;
  Socials: ResolverTypeWrapper<Socials>;
  Card: ResolverTypeWrapper<Card>;
  Product: ResolverTypeWrapper<Product>;
  Opensea: ResolverTypeWrapper<Opensea>;
  PaymentToken: ResolverTypeWrapper<PaymentToken>;
  PrimaryAssetContract: ResolverTypeWrapper<PrimaryAssetContract>;
  Stats: ResolverTypeWrapper<Stats>;
  Holders: ResolverTypeWrapper<Holders>;
  Deal: ResolverTypeWrapper<Deal>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  JSON: Scalars['JSON'];
  Query: {};
  String: Scalars['String'];
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  Deck: Deck;
  Artist: Artist;
  Socials: Socials;
  Card: Card;
  Product: Product;
  Opensea: Opensea;
  PaymentToken: PaymentToken;
  PrimaryAssetContract: PrimaryAssetContract;
  Stats: Stats;
  Holders: Holders;
  Deal: Deal;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  decks?: Resolver<Array<ResolversTypes['Deck']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType, RequireFields<QueryDeckArgs, 'slug'>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardsArgs, never>>;
  card?: Resolver<Maybe<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsArgs, never>>;
  convertEurToUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType, RequireFields<QueryConvertEurToUsdArgs, 'eur'>>;
  opensea?: Resolver<ResolversTypes['Opensea'], ParentType, ContextType, RequireFields<QueryOpenseaArgs, 'collection'>>;
  holders?: Resolver<ResolversTypes['Holders'], ParentType, ContextType, RequireFields<QueryHoldersArgs, 'contract'>>;
  deal?: Resolver<Maybe<ResolversTypes['Deal']>, ParentType, ContextType, RequireFields<QueryDealArgs, 'hash' | 'deckId' | 'signature'>>;
  dailyCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
};

export type DeckResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  short?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  openseaCollection?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  openseaContract?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cardBackground?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  properties?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backgroundImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userpic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social?: Resolver<ResolversTypes['Socials'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialsResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Socials'] = ResolversParentTypes['Socials']> = {
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  behance?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dribbble?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  foundation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  superrare?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  makersplace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  knownorigin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarible?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  niftygateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showtime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  img?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['Artist'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType>;
  suit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opensea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  short?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenseaResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Opensea'] = ResolversParentTypes['Opensea']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  editors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  payment_tokens?: Resolver<Array<ResolversTypes['PaymentToken']>, ParentType, ContextType>;
  primary_asset_contracts?: Resolver<Array<ResolversTypes['PrimaryAssetContract']>, ParentType, ContextType>;
  traits?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  banner_image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  default_to_fiat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dev_buyer_fee_basis_points?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dev_seller_fee_basis_points?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  external_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featured?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  featured_image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  safelist_request_status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  is_subject_to_whitelist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  large_image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  only_proxied_transfers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  opensea_buyer_fee_basis_points?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  opensea_seller_fee_basis_points?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payout_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  require_email?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  twitter_username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram_username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentTokenResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['PaymentToken'] = ResolversParentTypes['PaymentToken']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  usd_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryAssetContractResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['PrimaryAssetContract'] = ResolversParentTypes['PrimaryAssetContract']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset_contract_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nft_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  schema_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_supply?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  external_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  default_to_fiat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dev_buyer_fee_basis_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dev_seller_fee_basis_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  only_proxied_transfers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  opensea_buyer_fee_basis_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  opensea_seller_fee_basis_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  buyer_fee_basis_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seller_fee_basis_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  payout_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = {
  one_day_volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  one_day_change?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  one_day_sales?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  one_day_average_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seven_day_volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seven_day_change?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seven_day_sales?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  seven_day_average_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  thirty_day_volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  thirty_day_change?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  thirty_day_sales?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  thirty_day_average_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_sales?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_owners?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  average_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_reports?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  floor_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HoldersResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Holders'] = ResolversParentTypes['Holders']> = {
  fullDecks?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  fullDecksWithJokers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  spades?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  diamonds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  hearts?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  clubs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  jokers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DealResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Deal'] = ResolversParentTypes['Deal']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType>;
  claimed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = { req: Request, res: Response }> = {
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  Socials?: SocialsResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Opensea?: OpenseaResolvers<ContextType>;
  PaymentToken?: PaymentTokenResolvers<ContextType>;
  PrimaryAssetContract?: PrimaryAssetContractResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Holders?: HoldersResolvers<ContextType>;
  Deal?: DealResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = { req: Request, res: Response }> = Resolvers<ContextType>;

}
