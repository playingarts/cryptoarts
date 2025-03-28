declare namespace GQL {

type Maybe<T> = T | undefined;
type InputMaybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: { [key: string]: any }; output: { [key: string]: any }; }
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
  cardByImg?: Maybe<Card>;
  heroCards: Array<Card>;
  products: Array<Product>;
  convertEurToUsd?: Maybe<Scalars['Float']['output']>;
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
  ratings: Array<Rating>;
}


interface QueryDeckArgs {
  slug: Scalars['String']['input'];
}


interface QueryArtistArgs {
  id: Scalars['ID']['input'];
}


interface QueryArtistsArgs {
  hasPodcast?: InputMaybe<Scalars['Boolean']['input']>;
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}


interface QueryCardsArgs {
  withoutDeck?: InputMaybe<Array<Scalars['ID']['input']>>;
  deck?: InputMaybe<Scalars['ID']['input']>;
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  losers?: InputMaybe<Scalars['Boolean']['input']>;
  edition?: InputMaybe<Scalars['String']['input']>;
}


interface QueryRandomCardsArgs {
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}


interface QueryCardArgs {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  deckSlug?: InputMaybe<Scalars['String']['input']>;
}


interface QueryCardByImgArgs {
  img: Scalars['ID']['input'];
}


interface QueryHeroCardsArgs {
  deck?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}


interface QueryProductsArgs {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
}


interface QueryConvertEurToUsdArgs {
  eur: Scalars['Float']['input'];
}


interface QueryOwnedAssetsArgs {
  deck: Scalars['ID']['input'];
  address: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}


interface QueryOpenseaArgs {
  deck?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}


interface QueryHoldersArgs {
  deck?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}


interface QueryDealArgs {
  hash: Scalars['String']['input'];
  deckId: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}


interface QueryPodcastsArgs {
  name?: InputMaybe<Scalars['String']['input']>;
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}


interface QueryContractArgs {
  name?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  deck?: InputMaybe<Scalars['ID']['input']>;
}


interface QueryLosersValuesArgs {
  deck: Scalars['ID']['input'];
}


interface QueryLosersArgs {
  deck: Scalars['ID']['input'];
}


interface QueryListingsArgs {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenIds?: InputMaybe<Array<Scalars['String']['input']>>;
}


interface QueryRatingsArgs {
  title?: InputMaybe<String>;
}

interface String {
  _fake?: InputMaybe<Scalars['String']['input']>;
}

interface Deck {
  __typename?: 'Deck';
  _id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  short: Scalars['String']['output'];
  info: Scalars['String']['output'];
  intro: Scalars['String']['output'];
  slug: Scalars['ID']['output'];
  openseaCollection?: Maybe<OpenseaCollection>;
  cardBackground?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  properties: Scalars['JSON']['output'];
  description?: Maybe<Scalars['String']['output']>;
  backgroundImage?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  editions?: Maybe<Array<Edition>>;
  labels?: Maybe<Array<Scalars['String']['output']>>;
  previewCards?: Maybe<Array<Card>>;
}

interface Edition {
  __typename?: 'Edition';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
  img?: Maybe<Scalars['String']['output']>;
}

interface OpenseaCollection {
  __typename?: 'OpenseaCollection';
  name: Scalars['String']['output'];
  address: Scalars['String']['output'];
}

interface LoserArtist {
  __typename?: 'LoserArtist';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  userpic?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  shop?: Maybe<Scalars['String']['output']>;
  podcast?: Maybe<Podcast>;
  social?: Maybe<Socials>;
  country?: Maybe<Scalars['String']['output']>;
}

interface Artist {
  __typename?: 'Artist';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  info?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  userpic: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
  shop?: Maybe<Scalars['String']['output']>;
  podcast?: Maybe<Podcast>;
  social: Socials;
  country?: Maybe<Scalars['String']['output']>;
}

interface Socials {
  __typename?: 'Socials';
  instagram?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  behance?: Maybe<Scalars['String']['output']>;
  dribbble?: Maybe<Scalars['String']['output']>;
  foundation?: Maybe<Scalars['String']['output']>;
  superrare?: Maybe<Scalars['String']['output']>;
  makersplace?: Maybe<Scalars['String']['output']>;
  knownorigin?: Maybe<Scalars['String']['output']>;
  rarible?: Maybe<Scalars['String']['output']>;
  niftygateway?: Maybe<Scalars['String']['output']>;
  showtime?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
}

interface Card {
  __typename?: 'Card';
  _id: Scalars['ID']['output'];
  img: Scalars['String']['output'];
  video?: Maybe<Scalars['String']['output']>;
  artist: Artist;
  info?: Maybe<Scalars['String']['output']>;
  deck: Deck;
  suit: Scalars['String']['output'];
  value: Scalars['String']['output'];
  background?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  erc1155?: Maybe<Erc1155>;
  reversible?: Maybe<Scalars['Boolean']['output']>;
  edition?: Maybe<Scalars['String']['output']>;
  animator?: Maybe<Artist>;
  cardBackground?: Maybe<Scalars['String']['output']>;
}

interface Erc1155 {
  __typename?: 'ERC1155';
  contractAddress: Scalars['String']['output'];
  token_id: Scalars['String']['output'];
}

interface Currencies {
  __typename?: 'Currencies';
  eur: Scalars['Float']['output'];
  usd: Scalars['Float']['output'];
}

interface Product {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  deck?: Maybe<Deck>;
  decks?: Maybe<Array<Product>>;
  labels?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  price: Currencies;
  fullPrice?: Maybe<Currencies>;
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  image: Scalars['String']['output'];
  image2: Scalars['String']['output'];
  info?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  short: Scalars['String']['output'];
}

interface Nft {
  __typename?: 'Nft';
  identifier: Scalars['String']['output'];
  contract: Scalars['String']['output'];
  token_standard: Scalars['String']['output'];
  name: Scalars['String']['output'];
  description: Scalars['String']['output'];
  traits?: Maybe<Array<Trait>>;
  owners: Array<Owner>;
}

interface OpenseaContract {
  __typename?: 'OpenseaContract';
  address: Scalars['String']['output'];
}

interface Trait {
  __typename?: 'Trait';
  trait_type: Scalars['String']['output'];
  value: Scalars['String']['output'];
}

interface Owner {
  __typename?: 'Owner';
  address: Scalars['String']['output'];
  quantity: Scalars['String']['output'];
}

interface Opensea {
  __typename?: 'Opensea';
  id: Scalars['ID']['output'];
  volume: Scalars['Float']['output'];
  floor_price: Scalars['Float']['output'];
  num_owners: Scalars['String']['output'];
  total_supply: Scalars['String']['output'];
  on_sale: Scalars['String']['output'];
}

interface Holders {
  __typename?: 'Holders';
  fullDecks: Array<Scalars['String']['output']>;
  fullDecksWithJokers: Array<Scalars['String']['output']>;
  spades: Array<Scalars['String']['output']>;
  diamonds: Array<Scalars['String']['output']>;
  hearts: Array<Scalars['String']['output']>;
  clubs: Array<Scalars['String']['output']>;
  jokers: Array<Scalars['String']['output']>;
}

interface Deal {
  __typename?: 'Deal';
  _id: Scalars['ID']['output'];
  code: Scalars['String']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  decks?: Maybe<Scalars['Int']['output']>;
  deck?: Maybe<Deck>;
  claimed?: Maybe<Scalars['Boolean']['output']>;
}

interface Podcast {
  __typename?: 'Podcast';
  image?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
  apple?: Maybe<Scalars['String']['output']>;
  spotify?: Maybe<Scalars['String']['output']>;
  episode: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  podcastName?: Maybe<Scalars['String']['output']>;
  desc: Scalars['String']['output'];
  time: Scalars['String']['output'];
}

interface Contract {
  __typename?: 'Contract';
  name: Scalars['String']['output'];
  address: Scalars['String']['output'];
  deck: Deck;
}

interface Loser {
  __typename?: 'Loser';
  _id?: Maybe<Scalars['ID']['output']>;
  img?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
  artist: LoserArtist;
  info?: Maybe<Scalars['String']['output']>;
  deck?: Maybe<Deck>;
  suit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  erc1155?: Maybe<Erc1155>;
  reversible?: Maybe<Scalars['Boolean']['output']>;
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
  token: Scalars['String']['output'];
  identifierOrCriteria: Scalars['String']['output'];
}

interface Price {
  __typename?: 'Price';
  current: Current;
}

interface Current {
  __typename?: 'Current';
  value: Scalars['String']['output'];
}

interface Rating {
  __typename?: 'Rating';
  _id: Scalars['ID']['output'];
  who: Scalars['String']['output'];
  review: Scalars['String']['output'];
  title: Scalars['String']['output'];
}
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  string: String;
  Deck: ResolverTypeWrapper<Deck>;
  Edition: ResolverTypeWrapper<Edition>;
  OpenseaCollection: ResolverTypeWrapper<OpenseaCollection>;
  LoserArtist: ResolverTypeWrapper<LoserArtist>;
  Artist: ResolverTypeWrapper<Artist>;
  Socials: ResolverTypeWrapper<Socials>;
  Card: ResolverTypeWrapper<Card>;
  ERC1155: ResolverTypeWrapper<Erc1155>;
  Currencies: ResolverTypeWrapper<Currencies>;
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
  Rating: ResolverTypeWrapper<Rating>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  JSON: Scalars['JSON']['output'];
  Query: {};
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Float: Scalars['Float']['output'];
  string: String;
  Deck: Deck;
  Edition: Edition;
  OpenseaCollection: OpenseaCollection;
  LoserArtist: LoserArtist;
  Artist: Artist;
  Socials: Socials;
  Card: Card;
  ERC1155: Erc1155;
  Currencies: Currencies;
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
  Rating: Rating;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  decks?: Resolver<Array<ResolversTypes['Deck']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType, RequireFields<QueryDeckArgs, 'slug'>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  artists?: Resolver<Array<Maybe<ResolversTypes['Artist']>>, ParentType, ContextType, Partial<QueryArtistsArgs>>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, Partial<QueryCardsArgs>>;
  randomCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, Partial<QueryRandomCardsArgs>>;
  card?: Resolver<Maybe<ResolversTypes['Card']>, ParentType, ContextType, Partial<QueryCardArgs>>;
  cardByImg?: Resolver<Maybe<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardByImgArgs, 'img'>>;
  heroCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, Partial<QueryHeroCardsArgs>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsArgs>>;
  convertEurToUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType, RequireFields<QueryConvertEurToUsdArgs, 'eur'>>;
  ownedAssets?: Resolver<Array<Maybe<ResolversTypes['Nft']>>, ParentType, ContextType, RequireFields<QueryOwnedAssetsArgs, 'deck' | 'address' | 'signature'>>;
  opensea?: Resolver<ResolversTypes['Opensea'], ParentType, ContextType, Partial<QueryOpenseaArgs>>;
  holders?: Resolver<Maybe<ResolversTypes['Holders']>, ParentType, ContextType, Partial<QueryHoldersArgs>>;
  deal?: Resolver<Maybe<ResolversTypes['Deal']>, ParentType, ContextType, RequireFields<QueryDealArgs, 'hash' | 'deckId' | 'signature'>>;
  dailyCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
  podcasts?: Resolver<Array<Maybe<ResolversTypes['Podcast']>>, ParentType, ContextType, Partial<QueryPodcastsArgs>>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, Partial<QueryContractArgs>>;
  losersValues?: Resolver<Array<ResolversTypes['Loser']>, ParentType, ContextType, RequireFields<QueryLosersValuesArgs, 'deck'>>;
  losers?: Resolver<Array<ResolversTypes['Loser']>, ParentType, ContextType, RequireFields<QueryLosersArgs, 'deck'>>;
  listings?: Resolver<Array<Maybe<ResolversTypes['Listing']>>, ParentType, ContextType, Partial<QueryListingsArgs>>;
  ratings?: Resolver<Array<ResolversTypes['Rating']>, ParentType, ContextType, Partial<QueryRatingsArgs>>;
};

export type DeckResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  short?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  intro?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  previewCards?: Resolver<Maybe<Array<ResolversTypes['Card']>>, ParentType, ContextType>;
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
  cardBackground?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Erc1155Resolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['ERC1155'] = ResolversParentTypes['ERC1155']> = {
  contractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrenciesResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Currencies'] = ResolversParentTypes['Currencies']> = {
  eur?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  usd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType>;
  decks?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Currencies'], ParentType, ContextType>;
  fullPrice?: Resolver<Maybe<ResolversTypes['Currencies']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  desc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type RatingResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  who?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  review?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  Currencies?: CurrenciesResolvers<ContextType>;
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
  Rating?: RatingResolvers<ContextType>;
};


}
