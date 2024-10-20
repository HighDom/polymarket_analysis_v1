"use client";

import React, { useMemo, useState } from "react";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import polysf_client from "../../polysf-client";
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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-moment";
import moment from "moment";
import { Line } from "react-chartjs-2";

// Register the required chart components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  ChartTooltip,
  Legend,
  CategoryScale,
);

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

  // Process data for the chart
  const chartDataPoints = data.ordersMatcheds
    .filter(order => order.makerAssetId === "0" || order.takerAssetId === "0")
    .map(order => {
      const timestamp = parseInt(order.blockTimestamp) * 1000; // Convert to milliseconds
      const date = new Date(timestamp);
      const usdcAmount =
        order.makerAssetId === "0"
          ? parseFloat(order.makerAmountFilled) / 1e6
          : parseFloat(order.takerAmountFilled) / 1e6;
      return { x: date, y: usdcAmount };
    })
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  // Get first and last dates for X-axis label
  const firstDate = chartDataPoints[0]?.x;
  const lastDate = chartDataPoints[chartDataPoints.length - 1]?.x;

  const formattedFirstDate = firstDate ? moment(firstDate).format("DD-MMM") : "";
  const formattedLastDate = lastDate ? moment(lastDate).format("DD-MMM") : "";

  // Prepare data and options for the chart
  const chartData = {
    datasets: [
      {
        label: "USDC Used",
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
        type: "time" as const,
        time: {
          unit: "day" as const,
          tooltipFormat: "DD-MMM",
          displayFormats: {
            day: "DD-MMM",
          },
        },
        title: {
          display: true,
          text: `${formattedFirstDate} - ${formattedLastDate}`,
        },
      },
      y: {
        title: {
          display: true,
          text: "USDC Amount",
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
      <h1 className="text-3xl font-bold mb-6">Largest Order Filled</h1>

      {/* Chart Section */}
      <section className="mb-8">
        <div style={{ width: "100%", height: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* Existing table code */}
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
