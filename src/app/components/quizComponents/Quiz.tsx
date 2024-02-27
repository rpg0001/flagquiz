"use client";
import { Country } from "@/data/countries";
import { AutocompleteChangeReason, Autocomplete, TextField, Button, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState, useEffect, SyntheticEvent } from "react";
import Buttons from "./Buttons";
import Flag from "./Flag";
import ResultText from "./ResultText";
import Loading from "../Loading";

export type CorrectType = "Correct!" | "Incorrect!";

export default function SetupQuiz(props: { allCountries: Country[] }) {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [startedQuiz, setStartedQuiz] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>();

  function startQuiz() {
    const chosenCountries = getCountries(numberOfQuestions);
    setCountries(chosenCountries);
    setStartedQuiz(true);
  }

  function handleChangeNumberOfQuestions(event: SelectChangeEvent) {
    const value = parseInt(event.target.value) ?? 10;
    setNumberOfQuestions(value);
  }

  function getCountries(numberOfCountries: number) {
    const chosenCountries: Country[] = [];
    for (let i = 0; i < numberOfCountries; i++) {
      const randomInteger = Math.floor(Math.random() * props.allCountries.length);
      const randomCountry = props.allCountries[randomInteger];
      if (!chosenCountries.includes(randomCountry)) {
        chosenCountries.push(randomCountry);
      } else {
        i--;
      }
    }
    return chosenCountries;
  }

  return (
    <>
      {!startedQuiz ? 
        <div className="flex flex-col gap-3">
          <InputLabel id="demo-simple-select-label">Number of questions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={(numberOfQuestions ?? 10).toString()}
            label="Age"
            onChange={handleChangeNumberOfQuestions}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={props.allCountries.length}>{props.allCountries.length} (all)</MenuItem>
          </Select>
          
          <Button className="bg-blue-500 text-white" variant="contained" onClick={startQuiz}>Start</Button> 
        </div>
        :
        countries ? 
        <Quiz countries={countries} infinite={false} />
        :
        <p className="text-red-500">Oh no, something went wrong :(</p>
      }
    </>
  )
}

function Quiz(props: { 
  countries: Country[],
  infinite: boolean 
}) {
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [country, setCountry] = useState<Country>();
  const [remainingCountries, setRemainingCountries] = useState<Country[]>(props.countries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>();
  const [answered, setAnswered] = useState<CorrectType | null>();

  function getRandomCountry(): Country {
    const randomInteger = Math.floor(Math.random() * remainingCountries.length);
    return remainingCountries[randomInteger];
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
    setRemainingCountries(remainingCountries.filter(c => c.label != country?.label))
    setQuestionsAnswered(questionsAnswered + 1);
    if (country === selectedCountry) {
      setAnswered("Correct!");
    } else {
      setAnswered("Incorrect!");
    }
  }

  function next() {
    setSelectedCountry(null);
    setAnswered(null);
    setCountry(getRandomCountry());
  }

  return (
    <>
    <div className="w-fit flex flex-col h-max items-center p-4">

      <p>Answered: {questionsAnswered}  Total: {props.infinite ? "♾️" : props.countries.length}</p>


      {country ? <Flag emoji={country?.emoji} /> : <Loading />}

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.countries}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select country" />}
        onChange={handleChange} />

      <Buttons
        answered={answered}
        selectedCountry={selectedCountry}
        checkAnswer={checkAnswer}
        next={next} />

      <ResultText
        answered={answered}
        countryLabel={country?.label} />

    </div></>
  )
}

