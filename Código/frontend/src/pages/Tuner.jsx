import { useEffect, useState, useRef } from "react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { PitchDetector } from "pitchy";
import { frequencyToNote } from "../utils/audio";

const GUITAR_STRINGS = [
    { note: "E4", frequency: 329.63 },
    { note: "B3", frequency: 246.94 },
    { note: "G3", frequency: 196.00 },
    { note: "D3", frequency: 146.83 },
    { note: "A2", frequency: 110.00 },
    { note: "E2", frequency: 82.41 },
];

export default function Tuner() {
    const [note, setNote] = useState("--");
    const [frequency, setFrequency] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedString, setSelectedString] = useState(GUITAR_STRINGS[0]);
    const [tuningOffset, setTuningOffset] = useState(0);
    const detector = PitchDetector.forFloat32Array(2048);

    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        let animationId;

        async function startTuner() {

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

                streamRef.current = stream;

                const audioCtx = new AudioContext();
                audioCtxRef.current = audioCtx;

                const source = audioCtx.createMediaStreamSource(stream);

                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;

                analyserRef.current = analyser;

                source.connect(analyser);

                const buffer = new Float32Array(analyser.fftSize);

                const update = () => {
                    analyser.getFloatTimeDomainData(buffer);

                    const [pitch, clarity] = detector.findPitch(buffer, audioCtx.sampleRate);

                    if (clarity > 0.9 && pitch > 50 && pitch < 2000) {
                        setFrequency(pitch);
                        setNote(frequencyToNote(pitch));

                        const diff = pitch - selectedString.frequency;

                        const maxDiff = 20;
                        let offset = diff / maxDiff;

                        if (offset > 1) offset = 1;
                        if (offset < -1) offset = -1;

                        setTuningOffset(offset);
                    }

                    animationId = requestAnimationFrame(update);
                };

                update();
            } catch (err) {
                console.error("Error accessing microphone:", err);
                setIsActive(false);
            }
        }

        startTuner();

        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop());
            audioCtxRef.current?.close();
            cancelAnimationFrame(animationId);
        };
    }, [isActive, selectedString]);


    return (
        <PageContainer>

            <h1 className="text-3xl font-bold text-white mb-6">
                Tuner
            </h1>

            <div className="flex flex-wrap  gap-2 mb-4">
                {GUITAR_STRINGS.map(str => (
                    <button
                        key={str.note}
                        onClick={() => setSelectedString(str)}
                        className={`px-3 py-2 rounded-lg border text-white transition
                            ${selectedString.note === str.note
                                ? "border-cyan-400 bg-cyan-500/10"
                                : "border-white/10"
                            }`}
                    >
                        {str.note}
                    </button>
                ))}
            </div>

            <Card>
                <div className="text-center">

                    <p className="text-gray-400">Detected note:</p>

                    <h2 className="text-6xl text-cyan-400 font-bold mt-2">
                        {note}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Frequency: {frequency.toFixed(2)} Hz
                    </p>

                    <div className="mt-6">
                        <Button onClick={() => setIsActive(!isActive)}>
                            {isActive ? "Stop" : "Start Tuner"}
                        </Button>
                    </div>

                    <div className="mt-4">
                        {frequency > 0 && (
                            <p className="text-sm text-gray-300">
                                Target: {selectedString.note} ({selectedString.frequency} Hz)
                            </p>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <div className="relative w-full max-w-md h-2 bg-white/10 rounded-full">
                            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/30" />
                            <div className={`absolute top-1/2 w-4 h-4 rounded-full -translate-y-1/2 transition-all duration-100
                                ${Math.abs(tuningOffset) < 0.05
                                    ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]"
                                    : "bg-cyan-400"
                                }`}
                                style={{
                                    left: `calc(50% + ${tuningOffset * 45}%)`
                                }}
                            />
                        </div>
                        <p className="mt-3 text-sm text-gray-400">
                            {Math.abs(tuningOffset) < 0.05
                                ? "Perfectly in tune"
                                : tuningOffset > 0
                                    ? "Too low"
                                    : "Too high"
                            }
                        </p>

                    </div>

                </div>
            </Card>

        </PageContainer>
    );

}
