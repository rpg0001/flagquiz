import { Link } from "@mui/material";

export default function Home() {
  return (
    <><h2>Home</h2><div className="flex flex-col m-4 p-4 gap-4 text-center">
      <p>Welcome, which quiz would you like to play?</p>
      <Link href="/all-countries">All countries</Link>
    </div></>
  );
}