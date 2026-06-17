import { useEffect, useState } from "react";

const frames = [
  { x: 0, y: 0 },
  { x: 128, y: 0 },
  { x: 256, y: 0 },
  { x: 384, y: 0 },
];

export default function Demogorgon() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 150);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        width: 128,
        height: 128,
        backgroundImage: "url('/sprites/demogorgon.png')",
        backgroundPosition: `-${frames[frame].x}px -${frames[frame].y}px`,
        imageRendering: "pixelated",
      }}
    />
  );
}