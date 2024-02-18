import { countries } from "@/data/countries";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      
        <CountrySelector />
    </main>
  );
}

function CountrySelector() {
  return (<select name="countries" id="countries">
            {countries.map(country => <option value={country.Name}>{country.Emoji} - {country.Name}</option>)}
          </select>)
}
