// app/profitloss/page.tsx
import React from "react";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

// Define TypeScript types for the data
interface UserPosition {
  id: string;
  user: string;
  tokenId: string;
  amount: string;
}

interface NegRiskEvent {
  id: string;
  questionCount: number;
}

interface ProfitLossData {
  userPositions: UserPosition[];
  negRiskEvents: NegRiskEvent[];
}

const DATA_QUERY = gql`
  {
    userPositions(first: 5) {
      id
      user
      tokenId
      amount
    }
    negRiskEvents(first: 5) {
      id
      questionCount
    }
  }
`;

async function fetchData(): Promise<ProfitLossData> {
  const { data } = await client.query<{ userPositions: UserPosition[]; negRiskEvents: NegRiskEvent[] }>({
    query: DATA_QUERY,
  });

  return data;
}

export default async function ProfitLossPage() {
  const data = await fetchData();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profit and Loss Data</h1>
      <h2>User Positions</h2>
      <ul>
        {data.userPositions.map(position => (
          <li key={position.id}>
            <strong>ID:</strong> {position.id} | <strong>User:</strong> {position.user} | <strong>Token ID:</strong>{" "}
            {position.tokenId} | <strong>Amount:</strong> {position.amount}
          </li>
        ))}
      </ul>
      <h2>NegRisk Events</h2>
      <ul>
        {data.negRiskEvents.map(event => (
          <li key={event.id}>
            <strong>ID:</strong> {event.id} | <strong>Question Count:</strong> {event.questionCount}
          </li>
        ))}
      </ul>
    </div>
  );
}
