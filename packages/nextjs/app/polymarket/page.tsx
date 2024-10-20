"use client";

import React, { useMemo, useState } from "react";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import polysf_client from "../../polysf-client";
import { gql } from "@apollo/client";

// Define TypeScript types for the data
interface OrderMatched {
  id: string;
  makerAssetId: string;
  makerAmountFilled: string;
  takerAmountFilled: string;
  takerAssetId: string;
  takerOrderHash: string;
  takerOrderMaker: string;
  transactionHash: string;
  blockTimestamp: string;
  blockNumber: string;
}

interface OrdersMatchedData {
  ordersMatcheds: OrderMatched[];
}

const DATA_QUERY = gql`
  {
    ordersMatcheds {
      makerAssetId
      makerAmountFilled
      id
      takerAmountFilled
      takerAssetId
      takerOrderHash
      takerOrderMaker
      transactionHash
      blockTimestamp
      blockNumber
    }
  }
`;

async function fetchData(): Promise<OrdersMatchedData> {
  const { data } = await polysf_client.query<{ ordersMatcheds: OrderMatched[] }>({
    query: DATA_QUERY,
  });
  return data;
}

export default function ProfitLossPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: "makerAmountFilled",
    direction: "descending",
  });

  const [data, setData] = useState<OrdersMatchedData | null>(null);

  useMemo(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      setData(data);
    };
    fetchDataAsync();
  }, []);

  if (!data) return <div>Loading...</div>;

  const sortedOrders = [...data.ordersMatcheds].sort((a, b) => {
    const aValue = parseFloat(a[sortConfig.key as keyof OrderMatched] as string);
    const bValue = parseFloat(b[sortConfig.key as keyof OrderMatched] as string);

    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profit and Loss Data</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Orders Matched</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("id")}>
                  ID
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("makerAssetId")}>
                  Maker Asset ID
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("makerAmountFilled")}>
                  Maker Amount Filled
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("takerAssetId")}>
                  Taker Asset ID
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("takerAmountFilled")}>
                  Taker Amount Filled
                </th>
                <th className="px-4 py-2">Taker Order Hash</th>
                <th className="px-4 py-2">Taker Order Maker</th>
                <th className="px-4 py-2">Transaction Hash</th>
                <th className="px-4 py-2">Block Timestamp</th>
                <th className="px-4 py-2">Block Number</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.id} />
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.makerAssetId} />
                  </td>
                  <td className="px-4 py-2">
                    {order.makerAssetId === "0" ? (
                      `${(parseFloat(order.makerAmountFilled) / 1e6).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} USDC`
                    ) : (
                      <ExpandableCopyField value={order.makerAmountFilled} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.takerAssetId} />
                  </td>
                  <td className="px-4 py-2">
                    {order.takerAssetId === "0" ? (
                      `${(parseFloat(order.takerAmountFilled) / 1e6).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} USDC`
                    ) : (
                      <ExpandableCopyField value={order.takerAmountFilled} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.takerOrderHash} />
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.takerOrderMaker} />
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.transactionHash} />
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.blockTimestamp} />
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={order.blockNumber} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
