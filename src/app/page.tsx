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
        
        <Flag emoji={country?.emoji} />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countries}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select country" />}
          onChange={handleChange}
        />

        <Buttons 
          answered={answered} 
          selectedCountry={selectedCountry} 
          checkAnswer={checkAnswer}
          reset={reset} 
        />

        <ResultText
          answered={answered}
          countryLabel={country?.label}
        />

      </div>
    </main>
  );
}

function Flag(props: { 
  emoji: string | undefined
}) {
  return (
    <p className="text-9xl m-4">{props.emoji}</p>
  )
}

function Buttons(props: {
  answered: CorrectType | null | undefined,
  selectedCountry: Country | null | undefined,
  checkAnswer: () => void,
  reset: () => void
}) {
  return (
    <div className="w-full flex flex-col items-center p-2 gap-2">
      {!props.selectedCountry || props.answered ? 
        <Button className=" bg-blue-500 w-full " disabled variant="contained" onClick={props.checkAnswer} disableElevation>Check answer</Button>
        :
        <Button className=" bg-blue-500 w-full " variant="contained" onClick={props.checkAnswer} disableElevation>Check answer</Button>
      }
      
      
      {!props.answered ?
        <Button className=" bg-blue-500 w-full " disabled variant="contained" onClick={props.reset} disableElevation>Reset</Button>
        :
        <Button className=" bg-blue-500 w-full " variant="contained" onClick={props.reset} disableElevation>Reset</Button>
      }
    </div>
  )
}

function ResultText(props: { 
  countryLabel: string | undefined, 
  answered: CorrectType | undefined | null
}) {
  return(<>
    <p className={"p-2 font-bold text-4xl " + (props.answered === "Correct!" ? "text-green-600" : "text-red-600")}>{props.answered}</p>
    <p className={props.answered === "Incorrect!" ? "p-2" : "hidden"}>The answer was <b>{props.countryLabel}</b></p>
  </>)     
}