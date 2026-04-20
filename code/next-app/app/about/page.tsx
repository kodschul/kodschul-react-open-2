import React from "react";

const fetchCharacters = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");

  const data = await res.json();
  return data;
};

const AboutPage = async () => {
  // const [count, setCount] = useState(0);
  const characters = await fetchCharacters();
  return (
    <div>
      This is the about page fetched
      {JSON.stringify(characters)}
      {/* <button onClick={() => setCount(count + 1)}> {count} </button> */}
    </div>
  );
};

export default AboutPage;
