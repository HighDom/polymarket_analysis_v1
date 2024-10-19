import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://gateway.thegraph.com/api/da2f1e3f756e36b4ec56026f7aa773a3/subgraphs/id/6c58N5U4MtQE2Y8njfVrrAfRykzfqajMGeTMEvMmskVz",
  cache: new InMemoryCache(),
});

export default client;
