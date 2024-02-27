"use client";
import { countries } from "@/data/countries";
import Quiz from "../components/quizComponents/Quiz";

export default function AllCountries() {
  return (
    <>
      <h2>All countries</h2>
      <Quiz allCountries={countries} />
    </>
  );
}