import { CorrectType } from "./Quiz"

export default function ResultText(props: { 
    countryLabel: string | undefined, 
    answered: CorrectType | undefined | null
}) {
    return(<>
        <p className={"p-2 font-bold text-4xl " + (props.answered === "Correct!" ? "text-green-600" : "text-red-600")}>{props.answered}</p>
        <p className={props.answered === "Incorrect!" ? "p-2" : "hidden"}>The answer was <b>{props.countryLabel}</b></p>
    </>)     
}