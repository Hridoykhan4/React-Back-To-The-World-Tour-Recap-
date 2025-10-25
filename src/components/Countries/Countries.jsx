import { useEffect, useMemo, useState } from "react";
import Country from "../Country/Country";
import VisitedCountries from "../VisitedCountries/VisitedCountries";
import { addToDB, getStoredCountries, removeFromDB } from "../../utils/localDB";

const Countries = ({
  countries = [],
  currentCountries = [],
  setCurrentPage,
  setSearchValue,
  searchValue,
}) => {
  const [visitedCountries, setVisitedCountries] = useState([]);


  // Handle Search Country
  const filteredCountries = useMemo(() => {
    if (!searchValue.trim()) return currentCountries;
    return countries.filter((c) =>
      c.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [searchValue, countries, currentCountries]);

  // 
  const handleVisitedCountries = (country, visitStatus) => {
    console.log(visitStatus);
    if (visitStatus) {
      const alreadyVisited = visitedCountries.some(
        (c) => c.numericCode === country.numericCode
      );
      if (!alreadyVisited) {
        setVisitedCountries([...visitedCountries, country]);
        addToDB(country.numericCode);
      }
    } else {
      const updatedList = visitedCountries.filter(
        (c) => c.numericCode !== country.numericCode
      );
      setVisitedCountries(updatedList);
      removeFromDB(country.numericCode);
    }
  };

  useEffect(() => {
    const storedId = getStoredCountries();
    const matchedCountries = storedId
      .map((id) => countries.find((c) => c.numericCode === id))
      .filter(Boolean);
    setVisitedCountries(matchedCountries);
  }, [countries]);

  return (
    <div className="space-y-7">
      <h2 className="text-center font-semibold text-lg sm:text-2xl lg:text-4xl underline text-primary">
        Traveling Countries: {countries?.length}
      </h2>

      <div className="text-center text-base sm:text-lg">
        <h3 className="font-medium">
          Traveled so far:{" "}
          <span className="text-primary font-semibold">
            {visitedCountries?.length}
          </span>
        </h3>
      </div>

      {visitedCountries.length > 0 && (
        <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base">
          {visitedCountries.map((country) => (
            <VisitedCountries key={country.numericCode} country={country} />
          ))}
        </ol>
      )}

      <div>
        <input
          type="text"
          placeholder="Search By Name"
          onChange={(e) => {
            setSearchValue(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-info"
        />
      </div>

      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <Country
            isVisited={visitedCountries.some(
              (c) => c.numericCode === country.numericCode
            )}
            key={country.numericCode}
            country={country}
            handleVisitedCountries={handleVisitedCountries}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
