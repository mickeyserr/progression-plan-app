import "./App.css";
import { useState } from "react";

function App() {
    const [notes, setNotes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

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
            setNotes((prev) => prev.filter((_, i) => i !== +Number(idx)));
        }
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
                        <button type="button" onClick={removeNote}>X</button>
                    </section>
                ))}
            </ol>
        </>
    );
}

export default App;
