import { Country } from "@/app/page";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import CountryCard from "@/app/components/country-card";

async function getCountriesByCode(code: string): Promise<Country> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const countries = await response.json()
    if (!countries || !countries[0]) {
      throw new Error('Country not found')
    }
    return countries[0]

  } catch (error: any) {
    console.error(error)
    throw new Error('Error searching country')
  }
}

async function getCountryByName(name: string): Promise<Country> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const countries = await response.json()
    if (!countries || !countries[0]) {
      throw new Error('Country not found')
    }
    return countries[0]

  } catch (error: any) {
    console.error(error)
    throw new Error('Error searching country')
  }
}

export default async function CountryPage({ params: { name } }: { params: { name: string } })  {
  const country = await getCountryByName(name)

  let borders: Country[] = []
  if (country.borders) {
    const promises = []
    for (let border of country.borders) {
      promises.push(getCountriesByCode(border.toLowerCase()))
    }
    borders = await Promise.all(promises)
  }

  const numberFormatter = Intl.NumberFormat('pt-BR', { notation: 'compact' })

  return (
    <section className="flex flex-col container">
      <h1 className="text-center text-5xl font-bold text-gray-800 my-16">
        {country.translations.por.common}
      </h1>
      <Link href="/" className="flex items-center py-2">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mr-2"
          style={{ width: "20px", height: "20px" }}
        />
        Voltar
      </Link>
      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          <h2 className="text-xl text-gray-800">
            <b>🏙️ Capital: </b>
            {
              country.capital && country.capital[0]
                ? country.capital[0]
                : 'Não disponível'
            }
          </h2>
          <h2 className="text-xl text-gray-800">
            <b>🗺️ Continente: </b>
            {country.region}
          </h2>
          <h2 className="text-xl text-gray-800">
            <b>👨‍👩‍👧‍👦 População: </b>
            {numberFormatter.format(country.population)}
          </h2>
          <h2 className="text-xl text-gray-800">
            <b>🗣️ Línguas faladas: </b>
            <br />
            {
              country.languages ?
                Object.entries(country.languages)
                  .map(([idx, language]: any) => (
                    <span
                      key={idx}
                      className="inline-block px-2 mr-2 text-white text-sm rounded-full bg-gray-400"
                    >
                      {language}
                    </span>
                  ))
                : 'Não disponível'
            }
          </h2>
        </section>
        <div className="relative h-48 md:h-auto md:order-last order-first my-2 w-96 shadow-md">
          <Image
            src={country.flags.svg}
            alt={country.flags?.alt || 'Bandeira'}
            fill
            className="object-cover"
          />
        </div>
      </article>
      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">
          Países que fazem fronteira
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-2">
          {
            borders && borders.length > 0 ?
              borders.map((border: Country) => (
                <CountryCard country={border} />
              ))
              : 'Não disponível'
          }
        </div>
      </section>
    </section>
  )
}