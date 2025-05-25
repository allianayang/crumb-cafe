import React, {useMemo, useState, useEffect} from 'react';
import { Box } from '@mui/material';
import PixelBorder from './PixelBorder';
import AnimationPlayer from './AnimationPlayer.js';
import { cat1Idle, cat1LayDown, cat1Stretch, cat1Walk } from '../petFrames.js';

const WALL_TILE_SIZE = 90;
const TILE_SIZE = 45;
const SUB_TILE = TILE_SIZE / 2

const COLS = 20;
const ROWS = 16;

const WallTile = '/assets/wall/brick.png';
const FloorTile = '/assets/tile/tile.png';

const nonplaceable = ['cupboard', 'shelf'];

const animations = {
  idle: cat1Idle,
  lay: cat1LayDown,
  stretch: cat1Stretch,
  walk: cat1Walk,
};

const oneTimeAnimations = ['lay', 'stretch'];

const furniture = [
  { id: 'window', src: './assets/window/double.png', row: 2, col: 13, width: 2, height: 1 },
  { id: 'window', src: './assets/window/double.png', row: 2, col: 5, width: 2, height: 1 },
  { id: 'curtain', src: './assets/curtain/red.png', row: 1, col: 13, width: 2, height: 2 },
  { id: 'curtain', src: './assets/curtain/red.png', row: 1, col: 5, width: 2, height: 2 },
  { id: 'bed', src: './assets/furniture/bed_red.png', row: 3, col: 2, width: 1, height: 2 },
  { id: 'cupboard', src: './assets/furniture/cupboard.png', row: 2, col: 9, width: 2, height: 2 },
  { id: 'shelf', src: './assets/furniture/shelf_full.png', row: 2, col: 17, width: 2, height: 2 },
  { id: 'rug', src: './assets/furniture/rug_red.png', row: 9, col: 5, width: 2, height: 2 },
  { id: 'table', src: './assets/furniture/table.png', row: 9, col: 13, width: 3, height: 2 },
  { id: 'bench', src: './assets/furniture/bench_dark.png', row: 7, col: 14, width: 2, height: 1 },
  { id: 'bench', src: './assets/furniture/bench_dark.png', row: 13, col: 14, width: 2, height: 1 },
  { id: 'couch', src: './assets/furniture/couch_left.png', row: 9, col: 3, width: 1, height: 2 },
  { id: 'couch', src: './assets/furniture/couch_right.png', row: 9, col: 9, width: 1, height: 2 },
];

export default function Lounge() {
  const tiles = [];
  const [petState, setPetState] = useState('idle');

  const petPosition = useMemo(() => {
    const validCells = [];
  
    for (let row = 2; row < ROWS / 2 - 1; row++) {
      for (let col = 1; col < COLS / 2 - 1; col++) {
        const occupied = furniture.some(item => {
          if (!nonplaceable.includes(item.id)) return false;
          return (
            row >= item.row &&
            row < item.row + item.height &&
            col >= item.col &&
            col < item.col + item.width
          );
        });
  
        if (!occupied) {
          validCells.push({ row, col });
        }
      }
    }
  
    if (validCells.length === 0) return null;
  
    const randomIndex = Math.floor(Math.random() * validCells.length);
    console.log(validCells[randomIndex])
    return validCells[randomIndex];
  }, []);

  const [position, setPosition] = useState(() => petPosition);


  for (let i = 0; i < COLS; i++) {
    tiles.push(
      <Box
        key={`wall-${i}`}
        component="img"
        src={WallTile}
        sx={{
          width: WALL_TILE_SIZE,
          height: WALL_TILE_SIZE,
          gridColumn: (i * 2 + 1), // +1 because CSS Grid is 1-based
          gridRow: 1,
          gridColumnEnd: `span ${4}`, // full tile span = 2 sub-tiles
          gridRowEnd: `span ${4}`,
          imageRendering: 'pixelated',
          zIndex: 0,
        }}
      />
    );
  }

  for (let row = 2; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      tiles.push(
        <Box
          key={`floor-${row}-${col}`}
          component="img"
          src={FloorTile}
          sx={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            gridColumn: (col * 2 + 1), // +1 because CSS Grid is 1-based
            gridRow: (row * 2 + 1),
            gridColumnEnd: `span ${2}`, // full tile span = 2 sub-tiles
            gridRowEnd: `span ${2}`,
            imageRendering: 'pixelated',
            zIndex: 0,
          }}
        />
      );
    }
  }

  useEffect(() => {
    const chooseNextAnimation = () => {
      const states = ['idle', 'lay', 'stretch', 'walk'];
      const next = states[Math.floor(Math.random() * states.length)];
      setPetState(next);
      console.log(next)
    };
  
    const timer = setInterval(() => {
      chooseNextAnimation();
    }, 8000); // every 10 seconds
  
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (petState === 'walk') {
      const steps = 4;
      let current = 0;
      const finalCol = (position.col + steps) % COLS;
  
      const walkInterval = setInterval(() => {
        setPosition(prev => ({
          ...prev,
          col: (prev.col + 1) % COLS,
        }));
        current++;
        if (current >= steps) {
          clearInterval(walkInterval);
          setPetState('idle');
  
          // ✅ Persist final position
          setPosition(prev => ({
            ...prev,
            col: finalCol,
          }));
        }
      }, 500);
  
      return () => clearInterval(walkInterval);
    }
  }, [petState]);
  
  return (
    <PixelBorder>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, ${SUB_TILE}px)`,
        gridAutoRows: `${SUB_TILE}px`,
        width: COLS * SUB_TILE,
        height: ROWS * SUB_TILE,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {tiles}
      {furniture.map(item => (
        <Box
          key={item.id}
          component="img"
          src={item.src}
          sx={{
            gridColumn: `${item.col} / span ${item.width}`,
            gridRow: `${item.row} / span ${item.height}`,
            width: TILE_SIZE * item.width,
            height: TILE_SIZE * item.height,
            imageRendering: 'pixelated',
            zIndex: 2,
          }}
        />
      ))}
      {petPosition && (
          <Box
            sx={{
              gridColumn: petPosition.col * 2 + 1,
              gridRow: petPosition.row * 2 + 1,
              gridColumnEnd: 'span 2',
              gridRowEnd: 'span 2',
              width: TILE_SIZE * 3,
              height: TILE_SIZE * 3,
              zIndex: 3,
            }}
          >
            <AnimationPlayer
            frames={animations[petState]}
            loop={!oneTimeAnimations.includes(petState)}
            loopCount={oneTimeAnimations.includes(petState) ? 1 : 'infinite'}
            onDone={() => {
              if (oneTimeAnimations.includes(petState)) {
                setPetState('idle');
              }
            }}
            style={{
              imageRendering: 'pixelated',
              transform: petState === 'walk' ? 'translateX(100px)' : 'none',
              transition: petState === 'walk' ? 'transform 10s linear' : 'none',
            }}
          />

          </Box>
        )}
    </Box>
    
    </PixelBorder>
  );
}