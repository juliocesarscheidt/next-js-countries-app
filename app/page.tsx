import CountryCard from './components/country-card';
import InputFilter from './components/input-filter';

export type Country = {
  name: {
    common: string
    official: string
  }
  capital: string[]
  region: string
  subregion: string
  languages: { [key: string]: string }
  currencies: { [key: string]: { name: string, symbol: string } }
  population: number
  timezones: string[]
  continents: string[]
  flags: {
    png: string
    svg: string
    alt: string
  }
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
  translations: {
    [key: string]: {
      common: string
      official: string
    }
  }
  borders: string[]
}

async function getCountries(search?: string): Promise<Country[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    let countries = await response.json()
    countries = countries.map((country: Country) => country)
    if (search) {
      countries = countries.filter((country: Country) => {
        return (
          country.name.common.toLowerCase().includes(search.toLowerCase()) ||
          country.translations.por.common.toLowerCase().includes(search.toLowerCase())
        )
      })
    }
    return countries
  } catch (error: any) {
    console.error(error)
    return []
  }
}

export default async function Home({ searchParams }: { [key: string]: string | string[] | undefined }) {
  let countries: Country[] = []
  if (searchParams?.search && typeof searchParams?.search === 'string') {
    countries = await getCountries(searchParams?.search.trim())
  } else {
    countries = await getCountries()
  }

  return (
    <div>
      <InputFilter />
      { countries.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-8">
          {
            countries.map((country: Country) => (
              <CountryCard country={country} />
            ))
          }
        </section>
      )}
      { countries.length === 0 && (
        <section className="w-full container mt-8">
          <h1 className="text-2xl font-bold text-center">Nenhum país encontrado</h1>
        </section>
      )}
    </div>
  )
}
