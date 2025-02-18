import "./App.css";
import { useState } from "react";
import { LabelButton } from "./components/LabelButton";

function App() {
    const [notes, setNotes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [noteLabels, setNoteLabels] = useState<string[]>([]);

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

    function removeNote(e: React.MouseEvent<HTMLButtonElement>) {
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
                        <button type="button" onClick={removeNote}>
                            X
                        </button>
                    </section>
                ))}
            </ol>
        </>
    );
}

export default App;
