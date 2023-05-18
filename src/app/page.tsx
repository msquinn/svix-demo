import React from "react";
import EventTable from "./EventTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Svix Event Types</h1>
      <EventTable />
    </main>
  );
}
