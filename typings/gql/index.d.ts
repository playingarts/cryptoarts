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
}

interface Query {
  __typename?: 'Query';
  decks: Array<Deck>;
  deck?: Maybe<Deck>;
  artist?: Maybe<Artist>;
  cards: Array<Card>;
  card?: Maybe<Card>;
}


interface QueryDeckArgs {
  slug: Scalars['String'];
}


interface QueryCardsArgs {
  deck?: Maybe<Scalars['ID']>;
}


interface QueryCardArgs {
  id: Scalars['ID'];
}

interface Deck {
  __typename?: 'Deck';
  _id: Scalars['ID'];
  title: Scalars['String'];
  info: Scalars['String'];
  slug: Scalars['String'];
}

interface Artist {
  __typename?: 'Artist';
  id: Scalars['ID'];
  name: Scalars['String'];
  country: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  userpic: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  shop?: Maybe<Scalars['String']>;
  social: Socials;
}

interface Socials {
  __typename?: 'Socials';
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  behance?: Maybe<Scalars['String']>;
  foundation?: Maybe<Scalars['String']>;
  superrare?: Maybe<Scalars['String']>;
  makersplace?: Maybe<Scalars['String']>;
  hicetnunc?: Maybe<Scalars['String']>;
  knownorigin?: Maybe<Scalars['String']>;
  rarible?: Maybe<Scalars['String']>;
  showtime?: Maybe<Scalars['String']>;
  niftygw?: Maybe<Scalars['String']>;
  dribbble?: Maybe<Scalars['String']>;
}

interface Card {
  __typename?: 'Card';
  _id: Scalars['ID'];
  img: Scalars['String'];
  video?: Maybe<Scalars['String']>;
  artist: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  deck?: Maybe<Scalars['String']>;
  suit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  opensea?: Maybe<Scalars['String']>;
}
import { GraphQLResolveInfo } from 'graphql';
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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Deck: ResolverTypeWrapper<Deck>;
  Artist: ResolverTypeWrapper<Artist>;
  Socials: ResolverTypeWrapper<Socials>;
  Card: ResolverTypeWrapper<Card>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  ID: Scalars['ID'];
  Deck: Deck;
  Artist: Artist;
  Socials: Socials;
  Card: Card;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  decks?: Resolver<Array<ResolversTypes['Deck']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['Deck']>, ParentType, ContextType, RequireFields<QueryDeckArgs, 'slug'>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardsArgs, never>>;
  card?: Resolver<Maybe<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardArgs, 'id'>>;
};

export type DeckResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userpic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social?: Resolver<ResolversTypes['Socials'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialsResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Socials'] = ResolversParentTypes['Socials']> = {
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  behance?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  foundation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  superrare?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  makersplace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hicetnunc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  knownorigin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarible?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showtime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  niftygw?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dribbble?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardResolvers<ContextType = { req: Request, res: Response }, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  img?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  opensea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = { req: Request, res: Response }> = {
  Query?: QueryResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  Socials?: SocialsResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = { req: Request, res: Response }> = Resolvers<ContextType>;

}
