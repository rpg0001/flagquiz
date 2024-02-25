"use client";
import { Country, countries } from "@/data/countries";
import { SyntheticEvent, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { Button } from "@mui/material";

type CorrectType = "Correct!" | "Incorrect!";

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
  ) {
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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-fit flex flex-col h-max items-center ">
        <p className="text-9xl m-4">{country?.emoji}</p>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countries}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Countries" />}
          onChange={handleChange}
        />

        <div className="w-full flex flex-col items-center p-2">
          {!selectedCountry || answered ? 
            <Button className=" bg-blue-500 w-full m-1 " disabled variant="contained" onClick={checkAnswer} disableElevation>Check answer</Button>
            :
            <Button className=" bg-blue-500 w-full m-1 " variant="contained" onClick={checkAnswer} disableElevation>Check answer</Button>
          }
          
          
          {!answered ?
            <Button className=" bg-blue-500 w-full m-1 " disabled variant="contained" onClick={reset} disableElevation>Reset</Button>
            :
            <Button className=" bg-blue-500 w-full m-1 " variant="contained" onClick={reset} disableElevation>Reset</Button>
          }
        </div>

        <p className={"p-2 font-bold text-4xl " + (answered==="Correct!" ? "text-green-600" : "text-red-600")}>{answered}</p>
        <p className={answered === "Incorrect!" ? "p-2" : "hidden"}>The answer was <b>{country?.label}</b></p>
    
      </div>
    </main>
  );
}