import { ApolloClient, InMemoryCache } from "@apollo/client";

const substream_apollo_client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/92068/polymarket_conditional_tokens/version/latest",
  cache: new InMemoryCache(),
});

export default substream_apollo_client;
