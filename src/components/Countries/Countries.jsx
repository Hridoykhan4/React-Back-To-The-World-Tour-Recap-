import { useEffect, useState } from "react";
import Country from "../Country/Country";
import VisitedCountries from "../VisitedCountries/VisitedCountries";
import { addToDB, getStoredCountries, removeFromDB } from "../../utils/localDB";

const Countries = ({ countries = [], currentCountries = [] }) => {
  const [visitedCountries, setVisitedCountries] = useState([]);

  const handleVisitedCountries = (country, visitStatus) => {
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
    const storedIds = getStoredCountries();
    const matchedCountries = storedIds
      .map((id) => countries.find((c) => c.numericCode === id))
      .filter(Boolean);
    setVisitedCountries(matchedCountries);
  }, [countries]);

  return (
    <div className="space-y-7">
      {/* Title Section */}
      <h2 className="text-center font-semibold text-lg sm:text-2xl lg:text-4xl underline text-primary">
        Traveling Countries: {countries?.length}
      </h2>

      {/* Visited Summary */}
      <div className="text-center text-base sm:text-lg">
        <h3 className="font-medium">
          Traveled so far:{" "}
          <span className="text-primary font-semibold">
            {visitedCountries?.length}
          </span>
        </h3>
      </div>

      {/* Visited List */}
      {visitedCountries.length > 0 && (
        <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base">
          {visitedCountries.map((country) => (
            <VisitedCountries key={country.numericCode} country={country} />
          ))}
        </ol>
      )}

      {/* Country Cards */}
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCountries.map((country) => (
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
