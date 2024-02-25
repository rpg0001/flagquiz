"use client";
import { countries } from "@/data/countries";
import Quiz from "./components/Quiz";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center content-between p-12">
      <h1>Flag Quiz</h1>
      <Quiz countries={countries}/>
    </main>
  );
}