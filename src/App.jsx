import { useEffect, useState } from "react";
import "./App.css";
import Countries from "./components/Countries/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25
  const pages = Math.ceil(countries.length / pageSize);


  const startIndex= (currentPage - 1) * pageSize;
  const currentCountries = [...countries].slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    fetch(`../countries.json`)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <main className="w-11/12 mx-auto py-4">
      <Countries countries={countries} currentCountries={currentCountries}></Countries>
      <div className="flex gap-3 flex-wrap justify-center items-center py-10">
        {[...Array(pages)].map((_, i) => (
          <button
           key={i}
            onClick={() => {
              setCurrentPage(i + 1);
            }}
            className={`btn ${
              currentPage === i + 1 ? "btn-warning text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
