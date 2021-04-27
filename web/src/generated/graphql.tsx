import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
};

export type CreateQuoteInput = {
  author: Scalars['String'];
  country: Scalars['String'];
  job: Scalars['String'];
  text: Scalars['String'];
};

export type CreateUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type Favorite = {
  __typename?: 'Favorite';
  userId: Scalars['Float'];
  quoteId: Scalars['Float'];
  user: User;
  quote: Quote;
};

export type Mutation = {
  __typename?: 'Mutation';
  likeQuote: Scalars['Boolean'];
  createQuote: Quote;
  updateQuote: Quote;
  deleteQuote: Scalars['Boolean'];
  createUser: User;
  login: User;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: User;
  createFavorite: Scalars['Boolean'];
};


export type MutationLikeQuoteArgs = {
  value: Scalars['Int'];
  quoteId: Scalars['Int'];
};


export type MutationCreateQuoteArgs = {
  data: CreateQuoteInput;
};


export type MutationUpdateQuoteArgs = {
  data: UpdateQuoteInput;
  id: Scalars['Int'];
};


export type MutationDeleteQuoteArgs = {
  id: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
  token: Scalars['String'];
};


export type MutationCreateFavoriteArgs = {
  quoteId: Scalars['Int'];
};

export type PaginatedQuotes = {
  __typename?: 'PaginatedQuotes';
  quotes: Array<Quote>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getQuotes: PaginatedQuotes;
  getQuote: Array<Quote>;
  getToptenQuotes: Array<Quote>;
  searchQuote: Array<Quote>;
  getMe?: Maybe<User>;
  getFavorits: Array<Favorite>;
  getFavorite: Favorite;
};


export type QueryGetQuotesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetQuoteArgs = {
  category?: Maybe<Scalars['String']>;
  job?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
};


export type QuerySearchQuoteArgs = {
  serchArgs: Scalars['String'];
};


export type QueryGetFavoriteArgs = {
  quoteId: Scalars['Int'];
};

export type Quote = {
  __typename?: 'Quote';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  author: Scalars['String'];
  country: Scalars['String'];
  job: Scalars['String'];
  text: Scalars['String'];
  likeCount: Scalars['Float'];
  category: Scalars['String'];
  likeStatus?: Maybe<Scalars['Int']>;
  hasFavorite?: Maybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  createUserReceived: User;
};

export type UpdateQuoteInput = {
  author?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  job?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type QuoteResponseFragment = (
  { __typename?: 'Quote' }
  & Pick<Quote, 'id' | 'author' | 'country' | 'job' | 'text' | 'likeCount' | 'likeStatus' | 'hasFavorite'>
);

export type UserResponseFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'User' }
    & UserResponseFragment
  ) }
);

export type CreateFavoriteMutationVariables = Exact<{
  quoteId: Scalars['Int'];
}>;


export type CreateFavoriteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createFavorite'>
);

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & UserResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LikeQuoteMutationVariables = Exact<{
  value: Scalars['Int'];
  quoteId: Scalars['Int'];
}>;


export type LikeQuoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likeQuote'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & UserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type GetFavoritsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavoritsQuery = (
  { __typename?: 'Query' }
  & { getFavorits: Array<(
    { __typename?: 'Favorite' }
    & { quote: (
      { __typename?: 'Quote' }
      & QuoteResponseFragment
    ) }
  )> }
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { getMe?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type GetQuoteQueryVariables = Exact<{
  author?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  job?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
}>;


export type GetQuoteQuery = (
  { __typename?: 'Query' }
  & { getQuote: Array<(
    { __typename?: 'Quote' }
    & QuoteResponseFragment
  )> }
);

export type GetQuotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetQuotesQuery = (
  { __typename?: 'Query' }
  & { getQuotes: (
    { __typename?: 'PaginatedQuotes' }
    & Pick<PaginatedQuotes, 'hasMore'>
    & { quotes: Array<(
      { __typename?: 'Quote' }
      & QuoteResponseFragment
    )> }
  ) }
);

export type GetToptenQuotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetToptenQuotesQuery = (
  { __typename?: 'Query' }
  & { getToptenQuotes: Array<(
    { __typename?: 'Quote' }
    & QuoteResponseFragment
  )> }
);

export type SearchQuoteQueryVariables = Exact<{
  searchArgs: Scalars['String'];
}>;


export type SearchQuoteQuery = (
  { __typename?: 'Query' }
  & { searchQuote: Array<(
    { __typename?: 'Quote' }
    & QuoteResponseFragment
  )> }
);

export const QuoteResponseFragmentDoc = gql`
    fragment quoteResponse on Quote {
  id
  author
  country
  job
  text
  likeCount
  likeStatus
  hasFavorite
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment userResponse on User {
  id
  username
}
    `;
export const ChangePasswordDocument = gql`
    mutation changePassword($data: ChangePasswordInput!, $token: String!) {
  changePassword(data: $data, token: $token) {
    ...userResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateFavoriteDocument = gql`
    mutation createFavorite($quoteId: Int!) {
  createFavorite(quoteId: $quoteId)
}
    `;
export type CreateFavoriteMutationFn = Apollo.MutationFunction<CreateFavoriteMutation, CreateFavoriteMutationVariables>;

/**
 * __useCreateFavoriteMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteMutation, { data, loading, error }] = useCreateFavoriteMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *   },
 * });
 */
export function useCreateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument, options);
      }
export type CreateFavoriteMutationHookResult = ReturnType<typeof useCreateFavoriteMutation>;
export type CreateFavoriteMutationResult = Apollo.MutationResult<CreateFavoriteMutation>;
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($data: CreateUserInput!) {
  createUser(data: $data) {
    ...userResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LikeQuoteDocument = gql`
    mutation likeQuote($value: Int!, $quoteId: Int!) {
  likeQuote(value: $value, quoteId: $quoteId)
}
    `;
export type LikeQuoteMutationFn = Apollo.MutationFunction<LikeQuoteMutation, LikeQuoteMutationVariables>;

/**
 * __useLikeQuoteMutation__
 *
 * To run a mutation, you first call `useLikeQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeQuoteMutation, { data, loading, error }] = useLikeQuoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      quoteId: // value for 'quoteId'
 *   },
 * });
 */
export function useLikeQuoteMutation(baseOptions?: Apollo.MutationHookOptions<LikeQuoteMutation, LikeQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeQuoteMutation, LikeQuoteMutationVariables>(LikeQuoteDocument, options);
      }
export type LikeQuoteMutationHookResult = ReturnType<typeof useLikeQuoteMutation>;
export type LikeQuoteMutationResult = Apollo.MutationResult<LikeQuoteMutation>;
export type LikeQuoteMutationOptions = Apollo.BaseMutationOptions<LikeQuoteMutation, LikeQuoteMutationVariables>;
export const LoginDocument = gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...userResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetFavoritsDocument = gql`
    query getFavorits {
  getFavorits {
    quote {
      ...quoteResponse
    }
  }
}
    ${QuoteResponseFragmentDoc}`;

/**
 * __useGetFavoritsQuery__
 *
 * To run a query within a React component, call `useGetFavoritsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoritsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoritsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavoritsQuery(baseOptions?: Apollo.QueryHookOptions<GetFavoritsQuery, GetFavoritsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavoritsQuery, GetFavoritsQueryVariables>(GetFavoritsDocument, options);
      }
export function useGetFavoritsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavoritsQuery, GetFavoritsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavoritsQuery, GetFavoritsQueryVariables>(GetFavoritsDocument, options);
        }
export type GetFavoritsQueryHookResult = ReturnType<typeof useGetFavoritsQuery>;
export type GetFavoritsLazyQueryHookResult = ReturnType<typeof useGetFavoritsLazyQuery>;
export type GetFavoritsQueryResult = Apollo.QueryResult<GetFavoritsQuery, GetFavoritsQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  getMe {
    id
    username
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetQuoteDocument = gql`
    query getQuote($author: String, $country: String, $job: String, $category: String) {
  getQuote(author: $author, country: $country, job: $job, category: $category) {
    ...quoteResponse
  }
}
    ${QuoteResponseFragmentDoc}`;

/**
 * __useGetQuoteQuery__
 *
 * To run a query within a React component, call `useGetQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuoteQuery({
 *   variables: {
 *      author: // value for 'author'
 *      country: // value for 'country'
 *      job: // value for 'job'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetQuoteQuery(baseOptions?: Apollo.QueryHookOptions<GetQuoteQuery, GetQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuoteQuery, GetQuoteQueryVariables>(GetQuoteDocument, options);
      }
export function useGetQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuoteQuery, GetQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuoteQuery, GetQuoteQueryVariables>(GetQuoteDocument, options);
        }
export type GetQuoteQueryHookResult = ReturnType<typeof useGetQuoteQuery>;
export type GetQuoteLazyQueryHookResult = ReturnType<typeof useGetQuoteLazyQuery>;
export type GetQuoteQueryResult = Apollo.QueryResult<GetQuoteQuery, GetQuoteQueryVariables>;
export const GetQuotesDocument = gql`
    query getQuotes($limit: Int!, $cursor: String) {
  getQuotes(limit: $limit, cursor: $cursor) {
    hasMore
    quotes {
      ...quoteResponse
    }
  }
}
    ${QuoteResponseFragmentDoc}`;

/**
 * __useGetQuotesQuery__
 *
 * To run a query within a React component, call `useGetQuotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuotesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetQuotesQuery(baseOptions: Apollo.QueryHookOptions<GetQuotesQuery, GetQuotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuotesQuery, GetQuotesQueryVariables>(GetQuotesDocument, options);
      }
export function useGetQuotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuotesQuery, GetQuotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuotesQuery, GetQuotesQueryVariables>(GetQuotesDocument, options);
        }
export type GetQuotesQueryHookResult = ReturnType<typeof useGetQuotesQuery>;
export type GetQuotesLazyQueryHookResult = ReturnType<typeof useGetQuotesLazyQuery>;
export type GetQuotesQueryResult = Apollo.QueryResult<GetQuotesQuery, GetQuotesQueryVariables>;
export const GetToptenQuotesDocument = gql`
    query getToptenQuotes {
  getToptenQuotes {
    ...quoteResponse
  }
}
    ${QuoteResponseFragmentDoc}`;

/**
 * __useGetToptenQuotesQuery__
 *
 * To run a query within a React component, call `useGetToptenQuotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetToptenQuotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetToptenQuotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetToptenQuotesQuery(baseOptions?: Apollo.QueryHookOptions<GetToptenQuotesQuery, GetToptenQuotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetToptenQuotesQuery, GetToptenQuotesQueryVariables>(GetToptenQuotesDocument, options);
      }
export function useGetToptenQuotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetToptenQuotesQuery, GetToptenQuotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetToptenQuotesQuery, GetToptenQuotesQueryVariables>(GetToptenQuotesDocument, options);
        }
export type GetToptenQuotesQueryHookResult = ReturnType<typeof useGetToptenQuotesQuery>;
export type GetToptenQuotesLazyQueryHookResult = ReturnType<typeof useGetToptenQuotesLazyQuery>;
export type GetToptenQuotesQueryResult = Apollo.QueryResult<GetToptenQuotesQuery, GetToptenQuotesQueryVariables>;
export const SearchQuoteDocument = gql`
    query searchQuote($searchArgs: String!) {
  searchQuote(serchArgs: $searchArgs) {
    ...quoteResponse
  }
}
    ${QuoteResponseFragmentDoc}`;

/**
 * __useSearchQuoteQuery__
 *
 * To run a query within a React component, call `useSearchQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuoteQuery({
 *   variables: {
 *      searchArgs: // value for 'searchArgs'
 *   },
 * });
 */
export function useSearchQuoteQuery(baseOptions: Apollo.QueryHookOptions<SearchQuoteQuery, SearchQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuoteQuery, SearchQuoteQueryVariables>(SearchQuoteDocument, options);
      }
export function useSearchQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuoteQuery, SearchQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuoteQuery, SearchQuoteQueryVariables>(SearchQuoteDocument, options);
        }
export type SearchQuoteQueryHookResult = ReturnType<typeof useSearchQuoteQuery>;
export type SearchQuoteLazyQueryHookResult = ReturnType<typeof useSearchQuoteLazyQuery>;
export type SearchQuoteQueryResult = Apollo.QueryResult<SearchQuoteQuery, SearchQuoteQueryVariables>;