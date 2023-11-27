'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Error() {
  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">
        Ops, houve um erro ao carregar este país!
      </h1>
      <Link href="/" className="flex items-center py-2">
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ width: "20px", height: "20px" }}
        />
        Voltar
      </Link>
    </section>
  )
}
