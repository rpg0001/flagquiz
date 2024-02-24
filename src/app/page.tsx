"use client";
import { Country, countries } from "@/data/countries";
import { SyntheticEvent, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';

type CorrectType = "Correct!" | "Incorrect!";
const disabledButtonStyle = "hover:cursor-auto disabled opacity-40";
const activeButtonStyle = "hover:opacity-70 hover:cursor-pointer";
const buttonBaseStyle = "p-2 rounded border-2 border-black";

export default function Home() {
  const [country, setCountry] = useState<Country>();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>();
  const [answered, setAnswered] = useState<CorrectType | null>();

  function getRandomCountry(): Country {
    const randomInteger = Math.floor(Math.random() * 250);
    return countries[randomInteger];
  };

  useEffect(() => {
    setCountry(getRandomCountry());
  }, []);

  function handleChange(
    event: SyntheticEvent<Element, Event>, 
    value: Country | null, 
    reason: AutocompleteChangeReason
  ) {;
    if (value) setSelectedCountry(value);
  };

  function checkAnswer() {
    if (country === selectedCountry) {
      setAnswered("Correct!");
    } else {
      setAnswered("Incorrect!");
    }
  }

  function reset() {
    setSelectedCountry(null);
    setAnswered(null);
    setCountry(getRandomCountry());
  }

  function getCheckButtonStyle(): string {
    const base = buttonBaseStyle + " bg-green-400 ";
    if (!selectedCountry || answered) {
      return base + disabledButtonStyle;
    } else {
      return base + activeButtonStyle;
    }
  }

  function getResetButtonStyle(): string {
    const base = buttonBaseStyle + " bg-red-400 ";
    if (!answered) {
      return base + disabledButtonStyle;
    } else {
      return base + activeButtonStyle;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <p className="text-9xl m-4">{country?.emoji}</p>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countries}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Countries" />}
          onChange={handleChange}
        />
       
        <button 
          className={getCheckButtonStyle()} 
          onClick={checkAnswer}>
            Check
        </button>
        
        <p className={"p-2 font-bold text-4xl " + (answered==="Correct!" ? "text-green-600" : "text-red-600")}>{answered}</p>
        
        <p className={answered === "Incorrect!" ? "p-2" : "hidden"}>The answer was {country?.label}</p>
        
        <button 
          className={getResetButtonStyle()} 
          onClick={reset}>
            Reset
        </button>
    </main>
  );
}