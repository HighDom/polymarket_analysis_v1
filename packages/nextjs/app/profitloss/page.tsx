import React from "react";
import client from "../../apollo-client";
import ExpandableCopyField from "../../components/ExpandableCopyField";
import { gql } from "@apollo/client";

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
    userPositions {
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profit and Loss Data</h1>

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
                      <ExpandableCopyField value={position.user} />
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
