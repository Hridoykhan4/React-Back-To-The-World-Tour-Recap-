import "./Country.css";
const Country = ({ country = {}, handleVisitedCountries, isVisited }) => {
  const {
    name,
    capital,
    flags: { png },
    independent,
    population,
  } = country || {};

  const handleVisited = () => {
    const newVisitedState = !isVisited;
    handleVisitedCountries(country, newVisitedState);
  };

  const formattedInWords = (number) => {
    const units = [
      { value: 10000000, symbol: "Crore" },
      { value: 100000, symbol: "Lakh" },
      { value: 1000, symbol: "Thousand" },
    ];

    for (const i of units) {
      if (number >= i.value) {
        const mainPart = Math.floor(number / i.value);
        const mainPartText = `${mainPart} ${i.symbol} `;
        const remainder = number % i.value;
        const remainderText =
          remainder > 0 ? `${formattedInWords(remainder)}` : "";
        return mainPartText + remainderText;
      }
    }
    return number.toString();
  };

  return (
    <div
      className={`card country ${
        isVisited ? "bg-yellow-300" : "bg-base-100"
      }  shadow-sm`}
    >
      <figure className="h-56 object-cover">
        <img className="h-full w-full" src={png} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Capital: {capital}</p>
        <p>{independent ? "Independent" : "Not Independent"}</p>
        <p>
          Population: {population.toLocaleString("en-IN") || "N/A"} (
          {`${formattedInWords(population)}`})
        </p>
        <button
          onClick={handleVisited}
          className={`btn ${isVisited ? "btn-primary" : "btn-outline"}`}
        >
          {isVisited ? "Visited" : "Not Visited"}
        </button>
      </div>
    </div>
  );
};

export default Country;
