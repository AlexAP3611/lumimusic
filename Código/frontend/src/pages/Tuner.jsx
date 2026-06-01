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

function getClosestString(freq) {
    return GUITAR_STRINGS.reduce((closest, current) => {
        const currentDiff = Math.abs(
            1200 * Math.log2(freq / current.frequency)
        );

        const closestDiff = Math.abs(
            1200 * Math.log2(freq / closest.frequency)
        );

        return currentDiff < closestDiff ? current : closest;
    });
}

function median(values) {
    if (values.length === 0) return 0;

    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

function getVariance(values) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    return (
        values.reduce(
            (sum, value) => 
                sum + Math.pow(value - avg, 2),
             0
            ) / values.length
        );
}

export default function Tuner() {
    const [note, setNote] = useState("--");
    const [frequency, setFrequency] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedString, setSelectedString] = useState(GUITAR_STRINGS[0]);
    const [tuningOffset, setTuningOffset] = useState(0);
    const [isStable, setIsStable] = useState(false);

    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const pitchHistoryRef = useRef([]);
    const detectorRef = useRef(null);
    const lockedStringRef = useRef(null);
    const lockExpiryRef = useRef(0);
    if (!detectorRef.current) {
        detectorRef.current = PitchDetector.forFloat32Array(2048);
    }

    useEffect(() => {
        if (!isActive) return;

        let animationId;

        async function startTuner() {

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false,
                    }
                });

                streamRef.current = stream;

                const audioCtx = new AudioContext();
                audioCtxRef.current = audioCtx;

                const source = audioCtx.createMediaStreamSource(stream);

                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                analyser.smoothingTimeConstant = 0.85;

                analyserRef.current = analyser;

                source.connect(analyser);

                const buffer = new Float32Array(analyser.fftSize);

                const update = () => {
                    analyser.getFloatTimeDomainData(buffer);

                    const rms = Math.sqrt(
                        buffer.reduce((sum, val) => sum + val * val, 0) / buffer.length
                    );

                    if (rms < 0.01) {
                        setFrequency(0);
                        setNote("--");
                        pitchHistoryRef.current = [];
                        setTuningOffset(0);
                        lockedStringRef.current = null;
                        animationId = requestAnimationFrame(update);
                        return;
                    }

                    const [pitch, clarity] = detectorRef.current.findPitch(buffer, audioCtx.sampleRate);

                    if (clarity > 0.80 && pitch > 60 && pitch < 2000) {
                        pitchHistoryRef.current.push(pitch);

                        if (pitchHistoryRef.current.length > 8) {
                            pitchHistoryRef.current.shift();
                        }

                        const smoothedPitch = median(
                            pitchHistoryRef.current
                        );

                        const variance = getVariance(
                            pitchHistoryRef.current
                        );

                        const stable = variance < 4;

                        setIsStable(stable);

                        const now = performance.now();

                        let activeString = lockedStringRef.current;

                        // Detectar cuerda automáticamente
                        if (!activeString || now > lockExpiryRef.current) {

                            activeString = getClosestString(smoothedPitch);

                            lockedStringRef.current = activeString;

                            lockExpiryRef.current = now + 400;

                            if (selectedString.note !== activeString.note) {
                                setSelectedString(activeString);
                            }
                        }

                        // Corregir armónicos falsos
                        let correctedPitch = smoothedPitch;

                        while (
                            correctedPitch > activeString.frequency * 1.8
                        ) {
                            correctedPitch /= 2;
                        }

                        // Actualizar UI solo si estable
                        if (stable) {

                            setFrequency(correctedPitch);

                            setNote(
                                frequencyToNote(correctedPitch)
                            );

                            const cents =
                                1200 *
                                Math.log2(
                                    correctedPitch /
                                    activeString.frequency
                                );

                            const clampedCents = Math.max(
                                -50,
                                Math.min(50, cents)
                            );

                            setTuningOffset(clampedCents);
                        }
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
    }, [isActive]);


    return (
        <PageContainer>

            <h1 className="text-3xl font-bold text-primary-text mb-6 text-center border-b border-gray pb-4">
                Afinador
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

                    <p className="text-gray-400">Nota detectada:</p>

                    <h2 className="text-6xl text-cyan-400 font-bold mt-2">
                        {note}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Frecuencia: {frequency.toFixed(2)} Hz
                    </p>

                    <div className="mt-6">
                        <Button onClick={() => setIsActive(!isActive)}>
                            {isActive ? "Parar" : "Activar afinador"}
                        </Button>
                    </div>

                    <div className="mt-4">
                        {frequency > 0 && (
                            <p className="text-sm text-gray-300">
                                Objetivo: {selectedString.note} ({selectedString.frequency} Hz)
                            </p>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <div className="relative w-full max-w-md h-2 bg-white/10 rounded-full">
                            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/30" />
                            <div className={`absolute top-1/2 w-4 h-4 rounded-full -translate-y-1/2 transition-all duration-100
                                ${Math.abs(tuningOffset) < 5
                                    ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]"
                                    : "bg-cyan-400"
                                }`}
                                style={{
                                    left: `calc(50% + ${(tuningOffset / 50)* 45}%)`
                                }}
                            />
                        </div>
                        <p className="mt-3 text-sm text-gray-400">
                            {Math.abs(tuningOffset) < 5
                                ? "Afinado"
                                : tuningOffset > 0
                                    ? "Demasiado bajo"
                                    : "Demasiado alto"
                            }
                        </p>
                    </div>
                </div>
            </Card>

        </PageContainer>
    );

}
