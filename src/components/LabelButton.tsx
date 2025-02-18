import { useState } from "react";

interface LabelButton {
    noteIndex: number;
    onLabel: (noteIndex: number, label: string) => void;
}

export function LabelButton({ noteIndex, onLabel }: LabelButton) {
    const [isLabeling, setIsLabeling] = useState(false);
    const labels = ["Important", "Todo", "Later"];

    return isLabeling ? (
        <div>
            {labels.map((label) => (
                <button
                    key={noteIndex}
                    onClick={() => {
                        onLabel(noteIndex, label);
                        setIsLabeling(false);
                    }}
                >
                    {label}
                </button>
            ))}
        </div>
    ) : (
        <button onClick={() => setIsLabeling(true)}>Add Label</button>
    );
}
