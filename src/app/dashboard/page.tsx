import { AriaLink } from "../../components/aria/link";
import TestForm from "./_scaffold/form";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard page!</h1>
      <TestForm />
      <AriaLink href="/">Back to main page</AriaLink>
    </main>
  );
};
