import axios from "axios";
import { API_BASE_URL, type Character, type CharacterPage } from "../../../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

export const fetchCharacterPage = async (page: number): Promise<CharacterPage> => {
  const response = await api.get<CharacterPage>("/character", { params: { page } });
  return response.data;
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};
