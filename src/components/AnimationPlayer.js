import React, { useEffect, useState, useRef } from 'react';

export default function AnimationPlayer({
  frames,
  onDone,
  frameDuration = 100,
  loop = false,
  loopCount = 'infinite', // number or 'infinite'
  style = {},
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentLoop, setCurrentLoop] = useState(0);
  const intervalRef = useRef(null);
  const doneCalledRef = useRef(false);

  useEffect(() => {
    if (!frames || frames.length === 0) return;

    setCurrentFrame(0);
    setCurrentLoop(0);
    doneCalledRef.current = false;

    intervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const isLastFrame = prevFrame >= frames.length - 1;

        if (isLastFrame) {
          if (loop) {
            const shouldContinue =
              loopCount === 'infinite' || currentLoop + 1 < loopCount;

            if (shouldContinue) {
              setCurrentLoop((prevLoop) => prevLoop + 1);
              return 0;
            } else {
              clearInterval(intervalRef.current);
              if (!doneCalledRef.current && onDone) {
                doneCalledRef.current = true;
                onDone();
              }
              return prevFrame;
            }
          } else {
            clearInterval(intervalRef.current);
            if (!doneCalledRef.current && onDone) {
              doneCalledRef.current = true;
              onDone();
            }
            return prevFrame;
          }
        }

        return prevFrame + 1;
      });
    }, frameDuration);

    return () => clearInterval(intervalRef.current);
  }, [frames, frameDuration, loop, loopCount, onDone]);

  return (
    <img
      src={frames[currentFrame]}
      alt="Animation Frame"
      style={{ height: 100, width: 100, imageRendering: 'pixelated', ...style}}
    />
  );
}
