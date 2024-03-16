import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Linqem - Changelog" },
    {
      name: "description",
      content:
        "Find out what's new with Linqem, an elegant link aggregation repository for the web."
    }
  ];
};

export default function Changelog() {
  return (
    <main>
      <h1>Changelog</h1>
      <h2>Version 1.0.0</h2>
      <ul>
        <li>Added support for creating collections</li>
        <li>Added the home page to view all public collections</li>
        <li>Added support for viewing collections</li>
        <li>Added support for user accounts and authentication</li>
      </ul>
    </main>
  );
}
