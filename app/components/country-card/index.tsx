import { Country } from "@/app/page";
import Link from "next/link";
import Image from "next/image";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link href={`/pais/${country.name.common}`}>
      <article
        key={country.name.common}
        className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-gray-400 transition-all hover:shadow-xl cursor-pointer"
      >
        <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
          <Image
            src={country.flags.svg}
            alt={country.flags?.alt || 'Bandeira'}
            fill
            className="object-cover"
          />
        </div>
        {/* <h1>{country.name.common}</h1> */}
        <h1 className="font-bold text-xl text-center mt-2">
          {country.translations.por.common}
        </h1>
      </article>
    </Link>
  )
}
