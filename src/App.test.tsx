import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
    it("renders correctly", () => {
        render(<App />);
        const heading = screen.getByText("Notes");
        const input = screen.getByRole("textbox");
        expect(heading).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });
    it("adds a note", async () => {
        render(<App />);
        const user = userEvent.setup();
        const input = screen.getByRole("textbox");
        await user.type(input, "coding");
        await user.keyboard("{Enter}");
        const note = screen.getByText("coding");
        expect(note).toBeInTheDocument();
    });
    it("removes a note", async () => {
        render(<App />);
        const user = userEvent.setup();
        const input = screen.getByRole("textbox");
        await user.type(input, "coding");
        await user.keyboard("{Enter}");
        const removeButton = screen.getByText("X");
        await user.click(removeButton);
        const note = screen.queryByText("coding");
        expect(note).not.toBeInTheDocument();
    });
    it("adds a label to a note", async () => {
        render(<App />);
        const user = userEvent.setup();
        const input = screen.getByRole("textbox");
        await user.type(input, "coding");
        await user.keyboard("{Enter}");
        const labelButton = screen.getByText("Add Label");
        await user.click(labelButton);
        await user.click(screen.getByText("Important"));
        const label = screen.getByText("Important");
        expect(label).toBeInTheDocument();
    });
});
