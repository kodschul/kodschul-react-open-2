import {
  findAllByPlaceholderText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import { TodoContainer } from "../TodoContainer";

let user: UserEvent;

describe("Todos renderer", () => {
  it("should render zero by default", () => {
    render(<TodoContainer />);

    expect(screen.getByText(/Keine Todos vorhanden./i)).toBeInTheDocument();
  });

  beforeAll(() => {
    console.log("BEFORE_ALL");
    user = userEvent.setup();
  });

  afterEach(() => {
    console.log("AFTER_EACH");
    user = userEvent.setup();
  });

  beforeEach(async () => {
    console.log("BEFORE_EACH");
    render(<TodoContainer />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/neuer todo/i)).toBeInTheDocument();
    });
  });

  it.only("add a new todo", async () => {
    // ── Act ────────────────────────────────────────────────────
    // Textfeld finden, Text eintippen, Formular abschicken

    // const input = await screen.findByPlaceholderText(/neuer todo/i, undefined, {
    //   timeout: 10000,
    // });

    const input = screen.getByPlaceholderText(/neuer todo/i);
    await user.type(input, "Next.js lernen");

    screen.debug(input);

    // getByRole ist besser als getByText – semantisch korrekt
    const button = screen.getByRole("button", { name: /hinzufügen/i });
    await user.click(button);

    // ── Assert ─────────────────────────────────────────────────
    // Neuer Todo sollte sichtbar sein
    expect(screen.getByText("Next.js lernen")).toBeInTheDocument();

    // Textfeld sollte geleert worden sein
    expect(input).toHaveValue("");
  });
});
