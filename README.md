# Polymarket Analytics

![Home](images/Home.png)

## Short Description

Polymarket Analytics lets you to fetch and analyze trades made by any account on Polymarket, bypassing the platform's viewing limitations. Track profit and loss over time, inspect impactful trades, and uncover trading strategies. Built using custom subgraphs/substreams for insights.

## Features

- **Trade Analysis**: Fetch and analyze all trades made by any account on Polymarket.
- **Profit and Loss Tracking**: Track profit and loss over time.
- **Impactful Trades Inspection**: Inspect most impactful trades of any account.
- **View Big Payout Redemptions**: Custom substream allows you to see the biggest Payout Redemptions on Polymarket.

## The Graph
- Subgraphs Used: 
  - [Profit & Loss Subgraph](https://thegraph.com/explorer/subgraphs/6c58N5U4MtQE2Y8njfVrrAfRykzfqajMGeTMEvMmskVz?view=Query&chain=arbitrum-one)
  - [PolyMarket General Subgraph](https://thegraph.com/explorer/subgraphs/81Dm16JjuFSrqz813HysXoUPvzTwE7fsfPk2RTf66nyC?view=Query&chain=arbitrum-one)
- Subgraph Made: [Polymarket SF Trade Subgraph](https://thegraph.com/studio/subgraph/polymarket-sf24-v2/)
- Substream Powered Subgraph: 
  - See [Substream Powered Subgraph Folder](substreams_powered_subgraph/)
    This graph has not been ublished but has been used in our dashboard. The ABI for the Polymarket CTF Exchange Contract is defective so we had to make due with the Conditional Tokens Contract for data.
    We created the substream using the Codespace Devcontainer and we manually uploaded the relevant files to this github repo. Codespace provided by The Graph can be found [here](https://github.com/codespaces/new/streamingfast/substreams-starter?machine=standardLinux32gb)

## Future Plans
Add functionality to copy trades of other polymarket accounts. Substreams would allow for low latency copying of trades.

## Acknowledgements & Resources

- The Graph (thanks to Giuliano for answering answering our questions even after 12PM!)
- Scaffold-ETH-2
- Polymarket
