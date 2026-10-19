import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./index";

const fill = (label: string, value: string) => {
  const input = screen.getByLabelText(label);
  fireEvent.change(input, { target: { value } });
  fireEvent.blur(input);
};

describe("Registrierung mit React Hook Form + Zod", () => {
  it("shows error messages for invalid values and keeps the button disabled", async () => {
    render(<App />);
    fill("Benutzername", "ab");
    fill("E-Mail", "kein-mail");
    expect(await screen.findByText("Mindestens 3 Zeichen")).toBeInTheDocument();
    expect(await screen.findByText("Ungültige E-Mail-Adresse")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrieren" })).toBeDisabled();
  });

  it("enables the button and submits typed values when the form is valid", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<App />);
    fill("Benutzername", "morty");
    fill("Passwort", "geheim1234");
    fill("E-Mail", "morty@example.com");

    const button = screen.getByRole("button", { name: "Registrieren" });
    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);
    await waitFor(() =>
      expect(log).toHaveBeenCalledWith("Formular gesendet:", {
        username: "morty",
        password: "geheim1234",
        email: "morty@example.com",
      }),
    );
    log.mockRestore();
  });
});
