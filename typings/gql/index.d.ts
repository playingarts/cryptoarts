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
  ownedAssets: Array<Maybe<Nft>>;
  opensea: Opensea;
  holders?: Maybe<Holders>;
  deal?: Maybe<Deal>;
  dailyCard: Card;
  podcasts: Array<Maybe<Podcast>>;
  contract?: Maybe<Contract>;
  losersValues: Array<Loser>;
  losers: Array<Loser>;
  listings: Array<Maybe<Listing>>;
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
  withoutDeck?: Maybe<Array<Scalars['ID']>>;
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


interface QueryListingsArgs {
  addresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  tokenIds?: Maybe<Array<Scalars['String']>>;
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

interface Nft {
  __typename?: 'Nft';
  identifier: Scalars['String'];
  contract: Scalars['String'];
  token_standard: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  traits?: Maybe<Array<Trait>>;
  owners: Array<Owner>;
}

interface OpenseaContract {
  __typename?: 'OpenseaContract';
  address: Scalars['String'];
}

interface Trait {
  __typename?: 'Trait';
  trait_type: Scalars['String'];
  value: Scalars['String'];
}

interface Owner {
  __typename?: 'Owner';
  address: Scalars['String'];
  quantity: Scalars['String'];
}

interface Opensea {
  __typename?: 'Opensea';
  id: Scalars['ID'];
  volume: Scalars['Float'];
  floor_price: Scalars['Float'];
  num_owners: Scalars['String'];
  total_supply: Scalars['String'];
  on_sale: Scalars['String'];
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

interface Listing {
  __typename?: 'Listing';
  price: Price;
  protocol_data: ProtocolData;
}

interface ProtocolData {
  __typename?: 'ProtocolData';
  parameters: Parameters;
}

interface Parameters {
  __typename?: 'Parameters';
  offer: Array<Offer>;
}

interface Offer {
  __typename?: 'Offer';
  token: Scalars['String'];
  identifierOrCriteria: Scalars['String'];
}

interface Price {
  __typename?: 'Price';
  current: Current;
}

interface Current {
  __typename?: 'Current';
  value: Scalars['String'];
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
  Nft: ResolverTypeWrapper<Nft>;
  OpenseaContract: ResolverTypeWrapper<OpenseaContract>;
  Trait: ResolverTypeWrapper<Trait>;
  Owner: ResolverTypeWrapper<Owner>;
  Opensea: ResolverTypeWrapper<Opensea>;
  Holders: ResolverTypeWrapper<Holders>;
  Deal: ResolverTypeWrapper<Deal>;
  Podcast: ResolverTypeWrapper<Podcast>;
  Contract: ResolverTypeWrapper<Contract>;
  Loser: ResolverTypeWrapper<Loser>;
  Listing: ResolverTypeWrapper<Listing>;
  ProtocolData: ResolverTypeWrapper<ProtocolData>;
  Parameters: ResolverTypeWrapper<Parameters>;
  Offer: ResolverTypeWrapper<Offer>;
  Price: ResolverTypeWrapper<Price>;
  Current: ResolverTypeWrapper<Current>;
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
  Nft: Nft;
  OpenseaContract: OpenseaContract;
  Trait: Trait;
  Owner: Owner;
  Opensea: Opensea;
  Holders: Holders;
  Deal: Deal;
  Podcast: Podcast;
  Contract: Contract;
  Loser: Loser;
  Listing: Listing;
  ProtocolData: ProtocolData;
  Parameters: Parameters;
  Offer: Offer;
  Price: Price;
  Current: Current;
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
  ownedAssets?: Resolver<Array<Maybe<ResolversTypes['Nft']>>, ParentType, ContextType, RequireFields<QueryOwnedAssetsArgs, 'deck' | 'address' | 'signature'>>;
  opensea?: Resolver<ResolversTypes['Opensea'], ParentType, ContextType, RequireFields<QueryOpenseaArgs, 'deck'>>;
  holders?: Resolver<Maybe<ResolversTypes['Holders']>, ParentType, ContextType, RequireFields<QueryHoldersArgs, 'deck'>>;
  deal?: Resolver<Maybe<ResolversTypes['Deal']>, ParentType, ContextType, RequireFields<QueryDealArgs, 'hash' | 'deckId' | 'signature'>>;
  dailyCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
  podcasts?: Resolver<Array<Maybe<ResolversTypes['Podcast']>>, ParentType, ContextType, RequireFields<QueryPodcastsArgs, never>>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QueryContractArgs, never>>;
  losersValues?: Resolver<Array<ResolversTypes['Loser']>, ParentType, ContextType, RequireFields<QueryLosersValuesArgs, 'deck'>>;
  losers?: Resolver<Array<ResolversTypes['Loser']>, ParentType, ContextType, RequireFields<QueryLosersArgs, 'deck'>>;
  listings?: Resolver<Array<Maybe<ResolversTypes['Listing']>>, ParentType, ContextType, RequireFields<QueryListingsArgs, never>>;
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

export type NftResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Nft'] = ResolversParentTypes['Nft']> = {
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contract?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_standard?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  traits?: Resolver<Maybe<Array<ResolversTypes['Trait']>>, ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenseaContractResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['OpenseaContract'] = ResolversParentTypes['OpenseaContract']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TraitResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Trait'] = ResolversParentTypes['Trait']> = {
  trait_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenseaResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Opensea'] = ResolversParentTypes['Opensea']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  floor_price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  num_owners?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_supply?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  on_sale?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type ListingResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Listing'] = ResolversParentTypes['Listing']> = {
  price?: Resolver<ResolversTypes['Price'], ParentType, ContextType>;
  protocol_data?: Resolver<ResolversTypes['ProtocolData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProtocolDataResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['ProtocolData'] = ResolversParentTypes['ProtocolData']> = {
  parameters?: Resolver<ResolversTypes['Parameters'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParametersResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Parameters'] = ResolversParentTypes['Parameters']> = {
  offer?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OfferResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  identifierOrCriteria?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  current?: Resolver<ResolversTypes['Current'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrentResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Current'] = ResolversParentTypes['Current']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  Nft?: NftResolvers<ContextType>;
  OpenseaContract?: OpenseaContractResolvers<ContextType>;
  Trait?: TraitResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  Opensea?: OpenseaResolvers<ContextType>;
  Holders?: HoldersResolvers<ContextType>;
  Deal?: DealResolvers<ContextType>;
  Podcast?: PodcastResolvers<ContextType>;
  Contract?: ContractResolvers<ContextType>;
  Loser?: LoserResolvers<ContextType>;
  Listing?: ListingResolvers<ContextType>;
  ProtocolData?: ProtocolDataResolvers<ContextType>;
  Parameters?: ParametersResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Current?: CurrentResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = { req: Request, res: Response }> = Resolvers<ContextType>;

}
