"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import type { NextPage } from "next";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home: NextPage = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Personal Account (Example)",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "red");
          gradient.addColorStop(1, "green");
          return gradient;
        },
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Account Performance Over Time",
      },
    },
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Your Personal</span>
          <span className="block text-4xl font-bold">Polymarket Analytics</span>
        </h1>
        <div className="flex justify-center items-center space-x-4 flex-col sm:flex-row">
          <p className="my-2 font-medium">
            We use{" "}
            <a href="https://thegraph.com/" className="font-bold underline">
              The Graph
            </a>{" "}
            to search through all Polymarket transactions and find the ones relevant to you.
          </p>
        </div>
        <div className="my-10">
          <h2 className="text-center text-xl font-semibold mb-4">Account Performance Over Time</h2>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Home;
