import { Country } from "@/data/countries"
import { CorrectType } from "./Quiz"
import { Button } from "@mui/material"
import React from "react"

export default function Buttons(props: {
    answered: CorrectType | null | undefined,
    selectedCountry: Country | null | undefined,
    checkAnswer: () => void,
    next: () => void
}) {
    return (
        <div className="w-full flex flex-col items-center p-2 gap-2">
        {!props.selectedCountry || props.answered ? 
            <Button className=" bg-blue-500 w-full " disabled variant="contained" onClick={props.checkAnswer} disableElevation>Check answer</Button>
            :
            <Button className=" bg-blue-500 w-full " variant="contained" onClick={props.checkAnswer} disableElevation>Check answer</Button>
        }
        
        
        {!props.answered ?
            <Button className=" bg-blue-500 w-full " disabled variant="contained" onClick={props.next} disableElevation>Next</Button>
            :
            <Button className=" bg-blue-500 w-full " variant="contained" onClick={props.next} disableElevation>Next</Button>
        }
        </div>
    )
}