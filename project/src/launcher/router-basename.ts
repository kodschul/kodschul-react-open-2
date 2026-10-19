// Beispiele mit React Router (ab Modul 7) hängen ihre Routen unter den Pfad der Beispiel-App,
// z. B. /examples/m07-react-router/l01-router-setup-and-links. Der Playground nutzt /playground.
export const routerBasename = (): string =>
  window.location.pathname.split("/").slice(0, 4).join("/").replace(/\/$/, "");
