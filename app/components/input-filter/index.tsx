'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function InputFilter() {

  const router = useRouter()

  const [search, setSearch] = React.useState("");

  function change(e: any) {
    setSearch(e.target.value)
  }

  function clean(e: any) {
    if (e.target.value === "") {
      setSearch("")
    }
  }

  function searching() {
    router.push(`/?search=${search}`)
  }

  return (
    <section className="flex flex-row mt-8">
      <input
        type="text"
        placeholder="Pesquisa"
        className="w-full text-center p-2"
        onChange={change}
        onKeyUp={clean}
        value={search}
      />

      <button
        type="button"
        className="w-full text-center p-2 bg-gray-600 text-white rounded-xl"
        onClick={searching}
      >
        Filtrar
      </button>
    </section>
  )
}
