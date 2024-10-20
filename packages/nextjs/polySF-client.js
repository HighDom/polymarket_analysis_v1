import { ApolloClient, InMemoryCache } from "@apollo/client";

const polysf_client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/92067/polymarket-sf24-v2/version/latest",
  cache: new InMemoryCache(),
});

export default polysf_client;
