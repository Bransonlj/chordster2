import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")
  const navigate = useNavigate();

  function handleSearch() {
    if (search) {
        navigate(`/song?search=${search}`)
    }
  }

  // keep search query as text in the search bar even after reload
  useEffect(() => {
    if (searchQuery){
        setSearch(searchQuery)
    }

  }, [searchParams])

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  )
}
