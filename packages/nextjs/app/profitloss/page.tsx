"use client";

import React from "react";
import client from "../../apollo-client";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import { gql } from "@apollo/client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
// Import chart components
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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
    userPositions(orderBy: amount, orderDirection: desc) {
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

  // Process data for the doughnut chart
  const topPositions = data.userPositions.slice(0, 5); // Get top 5 positions
  const otherPositions = data.userPositions.slice(5);

  // Calculate total amount of other positions
  const otherAmount = otherPositions.reduce((sum, position) => {
    return sum + parseFloat(position.amount) / 1e6;
  }, 0);

  // Prepare labels and amounts
  const labels = topPositions.map(position => `${position.user.substring(0, 6)}...`);
  if (otherAmount > 0) {
    labels.push("Others");
  }

  const amounts = topPositions.map(position => parseFloat(position.amount) / 1e6);
  if (otherAmount > 0) {
    amounts.push(otherAmount);
  }

  // Define colors for the chart
  const backgroundColors = [
    "#FF6384", // red
    "#36A2EB", // blue
    "#FFCE56", // yellow
    "#4BC0C0", // teal
    "#9966FF", // purple
    "#C9CBCF", // grey for 'Others'
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: backgroundColors.slice(0, labels.length),
        hoverBackgroundColor: backgroundColors.slice(0, labels.length),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Top User Positions",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} USDC`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profit and Loss Data</h1>

      {/* Chart Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Positions Distribution</h2>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* Existing table code */}
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
