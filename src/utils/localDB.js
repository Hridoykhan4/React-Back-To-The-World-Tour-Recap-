const getStoredCountries = () => {
  const storedCountries = localStorage.getItem("countries-visited");
  return storedCountries ? JSON.parse(storedCountries) : [];
};

const addToDB = (id) => {
  const storedItems = getStoredCountries();
  storedItems.push(id);
  localStorage.setItem("countries-visited", JSON.stringify(storedItems));
};

const removeFromDB = (id) => {
  const storedItems = getStoredCountries();
  const remaining = storedItems.filter((i) => i !== id);
  localStorage.setItem("countries-visited", JSON.stringify(remaining));
};

export { addToDB, getStoredCountries, removeFromDB };
