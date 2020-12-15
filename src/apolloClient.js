import { provideApolloClient } from '@vue/apollo-composable'
import { createProvider } from '@/vue-apollo'
const apolloProvider = createProvider();
const client = apolloProvider.defaultClient

export const apolloClient = provideApolloClient(client)
