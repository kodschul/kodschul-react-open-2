import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CharacterPage = () => {
  const { id } = useParams();

  let navigate = useNavigate();

  const [character, setCharacter] = useState<any>({});
  const [isLoading, setLoading] = useState(true);

  const fetchCharacter = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      setCharacter(response.data);
    } catch (e) {
      // handle error
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  return (
    <div style={styles.main}>
      <h1>{character.name}</h1>

      {isLoading && <p>Loading...</p>}
      <img src={character?.image} width={100} />

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default CharacterPage;
