"use client";

import React from "react";
import client from "../../apollo-client";
import ExpandableCopyField from "../../components/ExpandableCopyField";
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
interface UserPosition {
  id: string;
  user: string;
  tokenId: string;
  amount: string;
}

interface ProfitLossData {
  userPositions: UserPosition[];
}

const DATA_QUERY = gql`
  {
    userPositions(first: 20, orderBy: amount, orderDirection: desc) {
      id
      user
      tokenId
      amount
    }
  }
`;

async function fetchData(): Promise<ProfitLossData> {
  const { data } = await client.query<{ userPositions: UserPosition[] }>({
    query: DATA_QUERY,
  });
  return data;
}

export default async function ProfitLossPage() {
  const data = await fetchData();

  // Process data for the chart
  const chartDataPoints = data.userPositions.map(position => {
    const xValue = position.tokenId; // Use tokenId as x-axis
    const yValue = parseFloat(position.amount) / 1e6; // Convert amount to USDC units
    return { x: xValue, y: yValue };
  });

  // Prepare data and options for the chart
  const chartData = {
    labels: data.userPositions.map(() => ""),
    datasets: [
      {
        label: "Amount in USDC",
        data: chartDataPoints.map(point => point.y),
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
        title: {
          display: false,
          text: "Token ID",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount in USDC",
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profit and Loss Data</h1>

      {/* Chart Section */}
      <section className="mb-8">
        <div style={{ width: "100%", height: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Positions</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Token ID</th>
                <th className="px-4 py-2">Amount in USDC</th>
              </tr>
            </thead>
            <tbody>
              {data.userPositions.map(position => (
                <tr key={position.id} className="border-t">
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={position.id} />
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`https://polygonscan.com/address/${position.user}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {position.user}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <ExpandableCopyField value={position.tokenId} />
                  </td>
                  <td className="px-4 py-2">
                    {(parseFloat(position.amount) / 1e6).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
