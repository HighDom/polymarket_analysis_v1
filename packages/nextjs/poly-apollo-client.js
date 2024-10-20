import { ApolloClient, InMemoryCache } from "@apollo/client";

const poly_apollo_client = new ApolloClient({
  uri: "https://gateway.thegraph.com/api/da2f1e3f756e36b4ec56026f7aa773a3/subgraphs/id/81Dm16JjuFSrqz813HysXoUPvzTwE7fsfPk2RTf66nyC",
  cache: new InMemoryCache(),
});

export default poly_apollo_client;
