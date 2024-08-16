const SearchBar = () => {
  return (
    <form className="max-w-md mx-auto my-3 w-full">   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only bg-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-300 " aria-hidden="true"  fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm  border border-gray-300 rounded-lg bg-neutral-800 focus:ring-blue-900 focus:border-blue-900" placeholder="Buscar Pokemon" required />
      </div>
    </form>
  )
}

export default SearchBar