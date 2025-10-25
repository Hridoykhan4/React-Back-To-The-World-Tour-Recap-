import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Countries from "./components/Countries/Countries";

function App() {
  const [countries, setCountries] = useState([]);
   const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const pages = Math.ceil(countries.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentCountries = useMemo(
    () => [...countries].slice(startIndex, startIndex + pageSize),
    [countries, startIndex]
  );

  useEffect(() => {
    fetch(`../countries.json`)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <main className="w-11/12 mx-auto py-4">
      <Countries
      searchValue={searchValue}
      setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        countries={countries}
        currentCountries={currentCountries}
      ></Countries>
      {!searchValue.trim() && (
        <div className="flex gap-3 flex-wrap justify-center items-center py-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-primary"
          >
            ⬅️ Prev
          </button>
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                // window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`btn ${
                currentPage === i + 1 ? "btn-warning text-white" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === pages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-primary"
          >
            Next ➡️
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
