// Basis-URL der Rick-and-Morty-API. Bei gesperrter API siehe 00-setup-and-installation.md (Fallback).
export const API_BASE_URL = "https://rickandmortyapi.com/api";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type CharacterPage = {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
};
