import "./App.css";
import { useState, useEffect } from "react";
import { LabelButton } from "./components/LabelButton";

interface SavedState {
    notes: string[];
    noteLabels: string[];
}

function App() {
    const [notes, setNotes] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("notesApp");
            if (saved) {
                const state: SavedState = JSON.parse(saved);
                return state.notes;
            }
        }
        return [];
    });

    const [inputValue, setInputValue] = useState<string>("");

    const [noteLabels, setNoteLabels] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("notesApp");
            if (saved) {
                const state: SavedState = JSON.parse(saved);
                return state.noteLabels;
            }
        }
        return [];
    });

    // Save state after any change
    useEffect(() => {
        if (typeof window !== "undefined") {
            const state: SavedState = { notes, noteLabels };
            localStorage.setItem("notesApp", JSON.stringify(state));
        }
    }, [notes, noteLabels]);

    function resetInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    function addNote(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            setNotes((prev) => [...prev, inputValue]);
            setInputValue("");
        }
    }

    function removeNoteAndLabel(e: React.MouseEvent<HTMLButtonElement>) {
        const idx = e.currentTarget.parentElement?.id;
        if (idx) {
            setNotes((prev) => prev.filter((_, i) => i !== +idx));
            setNoteLabels((prev) => {
                const newLabels = [...prev];
                newLabels.splice(+idx, 1);
                return newLabels;
            });
        }
    }

    function addLabel(noteIndex: number, label: string) {
        setNoteLabels((prev) => {
            const newLabels = [...prev];
            newLabels[noteIndex] = label;
            return newLabels;
        });
    }

    return (
        <>
            <h1>Notes</h1>
            <input
                type="text"
                value={inputValue}
                onChange={resetInput}
                onKeyDown={addNote}
            />
            <ol>
                {notes.map((note, idx) => (
                    <section id={`${idx}`} className="list-item" key={idx}>
                        <li key={idx}>{note}</li>
                        {noteLabels[idx] && (
                            <span
                                className={`label label-${noteLabels[
                                    idx
                                ].toLowerCase()}`}
                            >
                                {noteLabels[idx]}
                            </span>
                        )}
                        <LabelButton noteIndex={idx} onLabel={addLabel} />
                        <button type="button" onClick={removeNoteAndLabel}>
                            X
                        </button>
                    </section>
                ))}
            </ol>
        </>
    );
}

export default App;
