// ============================================================
// SCHRITT 2 – Zustand mit persist-Middleware
// ============================================================
//
// persist speichert den Zustand automatisch in localStorage
// (oder sessionStorage, AsyncStorage für React Native).
//
// Ohne persist: State wird bei Page-Reload zurückgesetzt
// Mit persist:  State überlebt Page-Reload und Browser-Neustart
//
// Installation: persist ist in zustand/middleware enthalten
//
// Typische Use Cases:
//   ✓ Theme (dark/light) – soll nach Reload erhalten bleiben
//   ✓ Spracheinstellung
//   ✓ Warenkorb
//   ✓ User-Preferences
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Theme Store mit persist ───────────────────────────────────
type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  // persist() umschließt die Store-Definition
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      // localStorage-Key (einzigartiger Name wählen!)
      name: "theme-store",

      // Optional: Nur bestimmte Felder persistieren
      // partialize: (state) => ({ isDark: state.isDark }),

      // Optional: sessionStorage statt localStorage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// ── Verwendung in Komponenten ─────────────────────────────────
//
// "use client";
//
// export function ThemeToggle() {
//   const { isDark, toggleTheme } = useThemeStore();
//
//   return (
//     <button
//       onClick={toggleTheme}
//       className={`px-4 py-2 rounded ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
//     >
//       {isDark ? "☀️ Hell" : "🌙 Dunkel"}
//     </button>
//   );
// }
//
// → Nach Page-Reload ist isDark noch gesetzt!
//   localStorage.getItem("theme-store") → { "state": { "isDark": true } }

// ============================================================
// Redux vs. Zustand – direkter Vergleich
// ============================================================
//
// DIESELBE Funktionalität, unterschiedlicher Aufwand:
//
// Redux (4 Dateien):
//   store.ts       → configureStore(...)
//   themeSlice.ts  → createSlice({ name, initialState, reducers })
//   Provider.tsx   → <Provider store={store}>
//   Component.tsx  → useSelector + useDispatch + dispatch(toggleTheme())
//
// Zustand (1 Zeile + Component):
//   themeStore.ts  → const useThemeStore = create(persist(...))
//   Component.tsx  → const { isDark, toggleTheme } = useThemeStore()
//
// Fazit:
//   Zustand  → schnell, wenig Code, ideal für kleinere Apps
//   Redux    → mehr Struktur, DevTools, ideal für große Teams
