import axios from "axios";
import type { LoaderFunctionArgs } from "react-router";
import { API_BASE_URL, type Character } from "../../../shared/character";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

// DEMO-SCHALTER: true simuliert ein langsames Netz (2 Sekunden Verzögerung pro Anfrage).
// Damit lässt sich "erst Seite, dann Daten" gegen "erst Daten, dann Seite" vergleichen.
export const SLOW_DEMO = false;

export const fetchCharacterDemo = async (id: string): Promise<Character> => {
  if (SLOW_DEMO) await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};

// Der Loader läuft vor dem Rendern der Route; params enthält die Werte aus dem Pfad (:id).
export const characterLoader = ({ params }: LoaderFunctionArgs) =>
  fetchCharacterDemo(params.id ?? "");
