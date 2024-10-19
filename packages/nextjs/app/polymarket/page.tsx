import React from "react";
import PolymarketTable from "./_components/PolymarketTable";
import type { NextPage } from "next";

const PolymarketPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Polymarket Trades</h1>
      <PolymarketTable />
    </div>
  );
};

export default PolymarketPage;
