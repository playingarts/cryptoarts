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
  artists: Array<Maybe<Artist>>;
  cards: Array<Card>;
  randomCards: Array<Card>;
  card?: Maybe<Card>;
  heroCards: Array<Card>;
  products: Array<Product>;
  convertEurToUsd?: Maybe<Scalars['Float']>;
  ownedAssets: Array<Maybe<Asset>>;
  opensea: Opensea;
  holders?: Maybe<Holders>;
  deal?: Maybe<Deal>;
  dailyCard: Card;
  podcasts: Array<Maybe<Podcast>>;
  contract?: Maybe<Contract>;
  losersValues: Array<Loser>;
  losers: Array<Loser>;
}


interface QueryDeckArgs {
  slug: Scalars['String'];
}


interface QueryArtistArgs {
  id: Scalars['ID'];
}


interface QueryArtistsArgs {
  hasPodcast?: Maybe<Scalars['Boolean']>;
  shuffle?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
}


interface QueryCardsArgs {
  deck?: Maybe<Scalars['ID']>;
  shuffle?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  losers?: Maybe<Scalars['Boolean']>;
  edition?: Maybe<Scalars['String']>;
}


interface QueryRandomCardsArgs {
  shuffle?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
}


interface QueryCardArgs {
  id: Scalars['ID'];
}


interface QueryHeroCardsArgs {
  deck?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
}


interface QueryProductsArgs {
  ids?: Maybe<Array<Scalars['ID']>>;
}


interface QueryConvertEurToUsdArgs {
  eur: Scalars['Float'];
}


interface QueryOwnedAssetsArgs {
  deck: Scalars['ID'];
  address: Scalars['String'];
  signature: Scalars['String'];
}


interface QueryOpenseaArgs {
  deck: Scalars['ID'];
}


interface QueryHoldersArgs {
  deck: Scalars['ID'];
}


interface QueryDealArgs {
  hash: Scalars['String'];
  deckId: Scalars['String'];
  signature: Scalars['String'];
}


interface QueryPodcastsArgs {
  name?: Maybe<Scalars['String']>;
  shuffle?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
}


interface QueryContractArgs {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  deck?: Maybe<Scalars['ID']>;
}


interface QueryLosersValuesArgs {
  deck: Scalars['ID'];
}


interface QueryLosersArgs {
  deck: Scalars['ID'];
}

interface Deck {
  __typename?: 'Deck';
  _id: Scalars['String'];
  title: Scalars['String'];
  short: Scalars['String'];
  info: Scalars['String'];
  slug: Scalars['ID'];
  openseaCollection?: Maybe<OpenseaCollection>;
  cardBackground?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  properties: Scalars['JSON'];
  description?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  editions?: Maybe<Array<Edition>>;
  labels?: Maybe<Array<Scalars['String']>>;
}

interface Edition {
  __typename?: 'Edition';
  name: Scalars['String'];
  url: Scalars['String'];
  img?: Maybe<Scalars['String']>;
}

interface OpenseaCollection {
  __typename?: 'OpenseaCollection';
  name: Scalars['String'];
  address: Scalars['String'];
}

interface LoserArtist {
  __typename?: 'LoserArtist';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  userpic?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  shop?: Maybe<Scalars['String']>;
  podcast?: Maybe<Podcast>;
  social?: Maybe<Socials>;
  country?: Maybe<Scalars['String']>;
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
  podcast?: Maybe<Podcast>;
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
  suit: Scalars['String'];
  value: Scalars['String'];
  background?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  erc1155?: Maybe<Erc1155>;
  reversible?: Maybe<Scalars['Boolean']>;
  edition?: Maybe<Scalars['String']>;
  animator?: Maybe<Artist>;
}

interface Erc1155 {
  __typename?: 'ERC1155';
  contractAddress: Scalars['String'];
  token_id: Scalars['String'];
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

interface Asset {
  __typename?: 'Asset';
  token_id: Scalars['String'];
  name: Scalars['String'];
  top_ownerships: Array<TopOwnerships>;
  seaport_sell_orders?: Maybe<Array<SeaportSellOrders>>;
  traits: Array<Trait>;
  asset_contract: OpenseaContract;
}

interface SeaportSellOrders {
  __typename?: 'SeaportSellOrders';
  order_hash: Scalars['String'];
  current_price: Scalars['String'];
}

interface OpenseaContract {
  __typename?: 'OpenseaContract';
  address: Scalars['String'];
}

interface TopOwnerships {
  __typename?: 'TopOwnerships';
  owner: Owner;
}

interface Trait {
  __typename?: 'Trait';
  trait_type: Scalars['String'];
  value: Scalars['String'];
}

interface Owner {
  __typename?: 'Owner';
  address: Scalars['String'];
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
  onSale?: Maybe<Scalars['Int']>;
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

interface Podcast {
  __typename?: 'Podcast';
  image?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
  apple?: Maybe<Scalars['String']>;
  spotify?: Maybe<Scalars['String']>;
  episode: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  podcastName?: Maybe<Scalars['String']>;
}

interface Contract {
  __typename?: 'Contract';
  name: Scalars['String'];
  address: Scalars['String'];
  deck: Deck;
}

interface Loser {
  __typename?: 'Loser';
  _id?: Maybe<Scalars['ID']>;
  img?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
  artist: LoserArtist;
  info?: Maybe<Scalars['String']>;
  deck?: Maybe<Deck>;
  suit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  erc1155?: Maybe<Erc1155>;
  reversible?: Maybe<Scalars['Boolean']>;
}
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
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
  Edition: ResolverTypeWrapper<Edition>;
  OpenseaCollection: ResolverTypeWrapper<OpenseaCollection>;
  LoserArtist: ResolverTypeWrapper<LoserArtist>;
  Artist: ResolverTypeWrapper<Artist>;
  Socials: ResolverTypeWrapper<Socials>;
  Card: ResolverTypeWrapper<Card>;
  ERC1155: ResolverTypeWrapper<Erc1155>;
  Product: ResolverTypeWrapper<Product>;
  Asset: ResolverTypeWrapper<Asset>;
  SeaportSellOrders: ResolverTypeWrapper<SeaportSellOrders>;
  OpenseaContract: ResolverTypeWrapper<OpenseaContract>;
  TopOwnerships: ResolverTypeWrapper<TopOwnerships>;
  Trait: ResolverTypeWrapper<Trait>;
  Owner: ResolverTypeWrapper<Owner>;
  Opensea: ResolverTypeWrapper<Opensea>;
  PaymentToken: ResolverTypeWrapper<PaymentToken>;
  PrimaryAssetContract: ResolverTypeWrapper<PrimaryAssetContract>;
  Stats: ResolverTypeWrapper<Stats>;
  Holders: ResolverTypeWrapper<Holders>;
  Deal: ResolverTypeWrapper<Deal>;
  Podcast: ResolverTypeWrapper<Podcast>;
  Contract: ResolverTypeWrapper<Contract>;
  Loser: ResolverTypeWrapper<Loser>;
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
  Edition: Edition;
  OpenseaCollection: OpenseaCollection;
  LoserArtist: LoserArtist;
  Artist: Artist;
  Socials: Socials;
  Card: Card;
  ERC1155: Erc1155;
  Product: Product;
  Asset: Asset;
  SeaportSellOrders: SeaportSellOrders;
  OpenseaContract: OpenseaContract;
  TopOwnerships: TopOwnerships;
  Trait: Trait;
  Owner: Owner;
  Opensea: Opensea;
  PaymentToken: PaymentToken;
  PrimaryAssetContract: PrimaryAssetContract;
  Stats: Stats;
  Holders: Holders;
  Deal: Deal;
  Podcast: Podcast;
  Contract: Contract;
  Loser: Loser;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  decks?: Resolver<Array<ResolversTypes['Deck']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType, RequireFields<QueryDeckArgs, 'slug'>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  artists?: Resolver<Array<Maybe<ResolversTypes['Artist']>>, ParentType, ContextType, RequireFields<QueryArtistsArgs, never>>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardsArgs, never>>;
  randomCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryRandomCardsArgs, never>>;
  card?: Resolver<Maybe<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardArgs, 'id'>>;
  heroCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryHeroCardsArgs, never>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsArgs, never>>;
  convertEurToUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType, RequireFields<QueryConvertEurToUsdArgs, 'eur'>>;
  ownedAssets?: Resolver<Array<Maybe<ResolversTypes['Asset']>>, ParentType, ContextType, RequireFields<QueryOwnedAssetsArgs, 'deck' | 'address' | 'signature'>>;
  opensea?: Resolver<ResolversTypes['Opensea'], ParentType, ContextType, RequireFields<QueryOpenseaArgs, 'deck'>>;
  holders?: Resolver<Maybe<ResolversTypes['Holders']>, ParentType, ContextType, RequireFields<QueryHoldersArgs, 'deck'>>;
  deal?: Resolver<Maybe<ResolversTypes['Deal']>, ParentType, ContextType, RequireFields<QueryDealArgs, 'hash' | 'deckId' | 'signature'>>;
  dailyCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
  podcasts?: Resolver<Array<Maybe<ResolversTypes['Podcast']>>, ParentType, ContextType, RequireFields<QueryPodcastsArgs, never>>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QueryContractArgs, never>>;
  losersValues?: Resolver<Array<ResolversTypes['Loser']>, ParentType, ContextType, RequireFields<QueryLosersValuesArgs, 'deck'>>;
  losers?: Resolver<Array<ResolversTypes['Loser']>, ParentType, ContextType, RequireFields<QueryLosersArgs, 'deck'>>;
};

export type DeckResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  short?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  openseaCollection?: Resolver<Maybe<ResolversTypes['OpenseaCollection']>, ParentType, ContextType>;
  cardBackground?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  properties?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backgroundImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  editions?: Resolver<Maybe<Array<ResolversTypes['Edition']>>, ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditionResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Edition'] = ResolversParentTypes['Edition']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenseaCollectionResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['OpenseaCollection'] = ResolversParentTypes['OpenseaCollection']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoserArtistResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['LoserArtist'] = ResolversParentTypes['LoserArtist']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userpic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  podcast?: Resolver<Maybe<ResolversTypes['Podcast']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['Socials']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  podcast?: Resolver<Maybe<ResolversTypes['Podcast']>, ParentType, ContextType>;
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
  suit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  erc1155?: Resolver<Maybe<ResolversTypes['ERC1155']>, ParentType, ContextType>;
  reversible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  edition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  animator?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155Resolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['ERC1155'] = ResolversParentTypes['ERC1155']> = {
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type AssetResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  token_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  top_ownerships?: Resolver<Array<ResolversTypes['TopOwnerships']>, ParentType, ContextType>;
  seaport_sell_orders?: Resolver<Maybe<Array<ResolversTypes['SeaportSellOrders']>>, ParentType, ContextType>;
  traits?: Resolver<Array<ResolversTypes['Trait']>, ParentType, ContextType>;
  asset_contract?: Resolver<ResolversTypes['OpenseaContract'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeaportSellOrdersResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['SeaportSellOrders'] = ResolversParentTypes['SeaportSellOrders']> = {
  order_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  current_price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenseaContractResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['OpenseaContract'] = ResolversParentTypes['OpenseaContract']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopOwnershipsResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['TopOwnerships'] = ResolversParentTypes['TopOwnerships']> = {
  owner?: Resolver<ResolversTypes['Owner'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TraitResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Trait'] = ResolversParentTypes['Trait']> = {
  trait_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  onSale?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type PodcastResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Podcast'] = ResolversParentTypes['Podcast']> = {
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  apple?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  podcastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContractResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Contract'] = ResolversParentTypes['Contract']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoserResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Loser'] = ResolversParentTypes['Loser']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['LoserArtist'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType>;
  suit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  erc1155?: Resolver<Maybe<ResolversTypes['ERC1155']>, ParentType, ContextType>;
  reversible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = { req: Request, res: Response }> = {
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  Edition?: EditionResolvers<ContextType>;
  OpenseaCollection?: OpenseaCollectionResolvers<ContextType>;
  LoserArtist?: LoserArtistResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  Socials?: SocialsResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  ERC1155?: Erc1155Resolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Asset?: AssetResolvers<ContextType>;
  SeaportSellOrders?: SeaportSellOrdersResolvers<ContextType>;
  OpenseaContract?: OpenseaContractResolvers<ContextType>;
  TopOwnerships?: TopOwnershipsResolvers<ContextType>;
  Trait?: TraitResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  Opensea?: OpenseaResolvers<ContextType>;
  PaymentToken?: PaymentTokenResolvers<ContextType>;
  PrimaryAssetContract?: PrimaryAssetContractResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Holders?: HoldersResolvers<ContextType>;
  Deal?: DealResolvers<ContextType>;
  Podcast?: PodcastResolvers<ContextType>;
  Contract?: ContractResolvers<ContextType>;
  Loser?: LoserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = { req: Request, res: Response }> = Resolvers<ContextType>;

}
