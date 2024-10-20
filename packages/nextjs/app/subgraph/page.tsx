"use client";

import React, { useState } from "react";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import poly_apollo_client from "../../poly-apollo-client";
import { gql } from "@apollo/client";
import { BarElement, CategoryScale, Chart as ChartJS, Tooltip as ChartTooltip, Legend, LinearScale } from "chart.js";
// Import charting libraries
import { Bar } from "react-chartjs-2";
import { FaUserCircle } from "react-icons/fa";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

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
      marketProfits {
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
    return "bg-green-200";
  } else if (profitValue < 0) {
    return "bg-red-200";
  } else {
    return "";
  }
}

export default function ProfitLossPage() {
  const [id, setId] = useState("0x1f2dd6d473f3e824cd2f8a89d9c69fb96f6ad0cf");
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

  // Process data for the bar chart
  let chartComponent = null;
  if (data && data.account) {
    const profits = data.account.marketProfits.map(mp => parseFloat(mp.profit) / 1e6);

    // Prepare data for the bar chart
    const chartData = {
      labels: profits.map(() => ``),
      datasets: [
        {
          label: "Profit in USDC",
          data: profits,
          backgroundColor: profits.map(value => (value >= 0 ? "rgba(75,192,192,0.6)" : "rgba(255,99,132,0.6)")),
          borderColor: profits.map(value => (value >= 0 ? "rgba(75,192,192,1)" : "rgba(255,99,132,1)")),
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          title: {
            display: true,
            text: "Trades",
          },
        },
        y: {
          title: {
            display: true,
            text: "Profit in USDC",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.parsed.y;
              return `Profit: ${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} USDC`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    chartComponent = (
      <div className="mb-8" style={{ width: "100%", height: 400 }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-0 flex items-center">
        <span className="mr-2">
          <FaUserCircle />
        </span>{" "}
        Analyze Specific Polymarket Account
      </h1>
      <p className="mb-6 text-gray-500">
        This page allows you to search for a Polymarket account and view its analytics, including creation timestamp,
        last seen timestamp, profit in USDC, and collateral volume.
      </p>
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2">
          <span className="text-lg font-semibold">Polymarket Account Address:</span>
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

          {/* Chart Section */}
          <h2 className="text-2xl font-semibold mb-4">Market Position Magnitudes</h2>
          {chartComponent}

          {/* Existing table code */}
          <h2 className="text-2xl font-semibold mb-4">Market Positions</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-sm shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Profit in USDC</th>
                </tr>
              </thead>
              <tbody>
                {data.account.marketProfits.map(mp => {
                  const profitValue = parseFloat(mp.profit) / 1e6;
                  const rowBackgroundColor = getBackgroundColorTrade(profitValue) || "";

                  return (
                    <tr key={mp.id} className={`border-t hover:bg-gray-100 ${rowBackgroundColor}`}>
                      <td className="px-4 py-2">
                        <ExpandableCopyField value={mp.id} />
                      </td>
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
