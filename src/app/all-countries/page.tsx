"use client";
import { countryData } from "@/data/countries";
import Quiz from "../components/quizComponents/Quiz";

export default function AllCountries() {
  return (
    <>
      <h2>Quiz: All countries</h2>
      <Quiz allCountries={countryData} />
    </>
  );
}