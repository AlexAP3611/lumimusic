const NOTE_STRINGS = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
];

export function frequencyToNote(frequency) {
    const A4 = 440;
    const semitones = 12 * Math.log2(frequency / A4);
    const noteNumber = Math.round(semitones) + 69;
    const note = NOTE_STRINGS[noteNumber % 12];
    const octave = Math.floor(noteNumber / 12) - 1;

    return `${note}${octave}`;
}