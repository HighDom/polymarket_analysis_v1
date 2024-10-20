"use client";

import React, { useState } from "react";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import poly_apollo_client from "../../poly-apollo-client";
import { gql } from "@apollo/client";
import { FaUserCircle } from "react-icons/fa";

// Importing an icon

// Define TypeScript types for the data
interface MarketProfit {
  id: string;
  profit: string;
}

interface AccountData {
  id: string;
  creationTimestamp: string;
  lastSeenTimestamp: string;
  collateralVolume: string;
  lastTradedTimestamp: string;
  numTrades: string;
  profit: string;
  scaledCollateralVolume: string;
  marketProfits: MarketProfit[];
}

const ACCOUNT_QUERY = gql`
  query ($id: ID!) {
    account(id: $id) {
      id
      creationTimestamp
      lastSeenTimestamp
      collateralVolume
      lastTradedTimestamp
      numTrades
      profit
      scaledCollateralVolume
      marketProfits(orderBy: profit, orderDirection: desc) {
        id
        profit
      }
    }
  }
`;

async function fetchData(id: string): Promise<{ account: AccountData }> {
  const { data } = await poly_apollo_client.query<{ account: AccountData }>({
    query: ACCOUNT_QUERY,
    variables: { id },
  });
  return data;
}

function getBackgroundColorTrade(profitValue: number): string {
  if (profitValue > 0) {
    return "bg-green";
  } else if (profitValue < 0) {
    return "bg-red";
  } else {
    return "";
  }
}

export default function ProfitLossPage() {
  const [id, setId] = useState("0x569454cb394f29627f8ab5a673f9da99be8e0aa5");
  const [data, setData] = useState<{ account: AccountData } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const fetchedData = await fetchData(id);
      setData(fetchedData);
    } catch (error) {
      console.error(error);
      setData(null);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value.toLowerCase());
  };

  // Function to convert UNIX timestamp to human-readable date
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString(undefined, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaUserCircle />
        Account Data
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2">
          <span className="text-lg font-semibold">Account ID:</span>
          <input type="text" value={id} onChange={handleInputChange} className="border p-2 w-full mt-1 rounded" />
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2">
          Fetch Data
        </button>
      </form>

      {loading && <p className="text-center text-lg font-semibold">Loading...</p>}

      {data && data.account ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: "ID", value: data.account.id },
              {
                label: "Creation Timestamp",
                value: formatTimestamp(data.account.creationTimestamp),
              },
              {
                label: "Last Seen Timestamp",
                value: formatTimestamp(data.account.lastSeenTimestamp),
              },
              {
                label: "Last Traded Timestamp",
                value: formatTimestamp(data.account.lastTradedTimestamp),
              },
              {
                label: "Profit in USDC",
                value: (parseFloat(data.account.profit) / 1e6).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              },
              {
                label: "Scaled Collateral Volume",
                value: data.account.scaledCollateralVolume,
              },
            ].map((item, index) => (
              <div key={index} className="bg-white shadow rounded p-4 flex items-center">
                <div>
                  <p className="text-gray-600">{item.label}:</p>
                  <p className="font-semibold break-all">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Market Profits</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-sm shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Background Color</th>
                  <th className="px-4 py-2">Profit in USDC</th>
                </tr>
              </thead>
              <tbody>
                {data.account.marketProfits.map(mp => {
                  const profitValue = parseFloat(mp.profit) / 1e6;
                  const rowBackgroundColor = getBackgroundColorTrade(profitValue) || "";

                  return (
                    <tr key={mp.id} className={`border-t hover:bg-gray-100  ${rowBackgroundColor}`}>
                      <td className="px-4 py-2">
                        <ExpandableCopyField value={mp.id} />
                      </td>
                      <td className="px-4 py-2">{rowBackgroundColor}</td>
                      <td className="px-4 py-2">
                        {profitValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
