"use client";

import React, { useMemo, useState } from "react";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import polysf_client from "../../substream-apollo-client";
import { gql } from "@apollo/client";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required chart components
ChartJS.register(LineController, LineElement, PointElement, LinearScale, ChartTooltip, Legend, CategoryScale);

// Define TypeScript types for the data
interface PayoutRedemption {
  id: string;
  payout: string;
  blockNumber: string;
  transactionHash: string;
}

interface PayoutRedemptionsData {
  payoutRedemptions: PayoutRedemption[];
}

const DATA_QUERY = gql`
  {
    payoutRedemptions {
      id
      payout
      blockNumber
      transactionHash
    }
  }
`;

async function fetchData(): Promise<PayoutRedemptionsData> {
  const { data } = await polysf_client.query<{ payoutRedemptions: PayoutRedemption[] }>({
    query: DATA_QUERY,
  });
  return data;
}

export default function ProfitLossPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: "payout",
    direction: "descending",
  });

  const [data, setData] = useState<PayoutRedemptionsData | null>(null);

  useMemo(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      setData(data);
    };
    fetchDataAsync();
  }, []);

  if (!data) return <div className="m-10">Loading...</div>;

  const sortedRedemptions = [...data.payoutRedemptions].sort((a, b) => {
    const aValue = parseFloat(a[sortConfig.key as keyof PayoutRedemption] as string);
    const bValue = parseFloat(b[sortConfig.key as keyof PayoutRedemption] as string);

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

  // Process data for the chart
  const chartDataPoints = data.payoutRedemptions
    .map(redemption => {
      const blockNumber = parseInt(redemption.blockNumber);
      const payoutAmount = parseFloat(redemption.payout) / 1e6; // Adjust units if needed
      return { x: blockNumber, y: payoutAmount };
    })
    .sort((a, b) => a.x - b.x);

  // Prepare data and options for the chart
  const chartData = {
    datasets: [
      {
        label: "Payout Amount",
        data: chartDataPoints,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Block Number",
        },
      },
      y: {
        title: {
          display: true,
          text: "Payout Amount",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const yValue = context.parsed.y;
            return `${label}: ${yValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Payout Redemptions Data</h1>

      {/* Chart Section */}
      <section className="mb-8">
        <div style={{ width: "100%", height: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* Table Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payout Redemptions</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("payout")}>
                  Payout
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("blockNumber")}>
                  Block Number
                </th>
                <th className="px-4 py-2">Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {sortedRedemptions.map(redemption => (
                <tr key={redemption.id} className="border-t">
                  <td className="px-4 py-2">
                    {(parseFloat(redemption.payout) / 1e6).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-2">{redemption.blockNumber}</td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={redemption.transactionHash} />
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
