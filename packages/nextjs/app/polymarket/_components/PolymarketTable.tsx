"use client";

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Address } from "~~/components/scaffold-eth";

// pages/polymarket/PolymarketTable.tsx

const POLYMARKET_TRADES_QUERY = gql`
  query GetPolymarketTrades {
    orderFilleds(first: 25, orderBy: blockTimestamp, orderDirection: desc) {
      id
      orderHash
      maker
      taker
      makerAssetId
      takerAssetId
      makerAmountFilled
      takerAmountFilled
      fee
      blockTimestamp
    }
  }
`;

const PolymarketTable = () => {
  const { data, loading, error } = useQuery(POLYMARKET_TRADES_QUERY, { fetchPolicy: "network-only" });

  if (loading) {
    return <p>Loading Polymarket data...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error loading Polymarket data.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-2xl rounded-xl mt-6">
      <table className="table bg-base-100 table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Maker</th>
            <th>Taker</th>
            <th>Maker Asset ID</th>
            <th>Taker Asset ID</th>
            <th>Maker Amount Filled</th>
            <th>Taker Amount Filled</th>
            <th>Fee</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.orderFilleds.map((trade: any, index: number) => (
            <tr key={trade.id}>
              <td>{index + 1}</td>
              <td>
                <Address address={trade.maker} />
              </td>
              <td>
                <Address address={trade.taker} />
              </td>
              <td>{trade.makerAssetId.toString()}</td>
              <td>{trade.takerAssetId.toString()}</td>
              <td>{trade.makerAmountFilled.toString()}</td>
              <td>{trade.takerAmountFilled.toString()}</td>
              <td>{trade.fee.toString()}</td>
              <td>{new Date(parseInt(trade.blockTimestamp) * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolymarketTable;
