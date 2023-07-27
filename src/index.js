import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Context from './Context'
import { setContext } from '@apollo/client/link/context'
import { GQL_URL } from './config/serverurl'

const authLink = setContext((_, { headers }) => {
  const token = window.sessionStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})
const httpLink = createHttpLink({
  uri: GQL_URL + '/graphql'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('app')
)
