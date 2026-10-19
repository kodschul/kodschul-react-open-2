import axios from "axios";
import { API_BASE_URL, type Character, type CharacterPage } from "../../../shared/character";

const api = axios.create({ baseURL: API_BASE_URL });

export type StatusFilter = "" | "alive" | "dead" | "unknown";

// Unbekannte Werte aus der URL fallen auf "alle" zurück.
export const parseStatus = (value: string | null): StatusFilter =>
  value === "alive" || value === "dead" || value === "unknown" ? value : "";

// axios lässt params mit undefined weg: ?page=2 statt ?page=2&status=
export const fetchCharacters = async (page: number, status: StatusFilter): Promise<CharacterPage> => {
  const { data } = await api.get<CharacterPage>("/character", {
    params: { page, status: status || undefined },
  });
  return data;
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
};
