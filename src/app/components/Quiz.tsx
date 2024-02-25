"use client";
import { Country, countries } from "@/data/countries";
import { AutocompleteChangeReason, Autocomplete, TextField, Button } from "@mui/material";
import { useState, useEffect, SyntheticEvent } from "react";
import Buttons from "./Buttons";
import Flag from "./Flag";
import ResultText from "./ResultText";

export type CorrectType = "Correct!" | "Incorrect!";

export default function Quiz(props: { countries: Country[] }) {
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
      <div className="w-fit flex flex-col h-max items-center p-12">
      
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
    )
  }

