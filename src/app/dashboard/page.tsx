import { ALink } from "../../components/aria/link";
import TestForm from "./_scaffold/form";

export default function Dashboard() {
  return (
    <main className="block w-full pt-32 px-8 h-screen">
      <h1>Dashboard page!</h1>
      <TestForm />
      <ALink href="/">Back to main page</ALink>
    </main>
  );
};
