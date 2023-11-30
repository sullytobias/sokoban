import { useEffect, useState, useCallback } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";

const tileSize = 100;
const rowCount = 5;
const colCount = 5;

const initialPlayerPosition = { row: 1, col: 1 };
const initialBoxPositions = [
    { row: 2, col: 2 },
    { row: 2, col: 3 },
];

export const Game = () => {
    const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);
    const [boxPositions, setBoxPositions] = useState(initialBoxPositions);
    const checkWin = useCallback(
        (newPosition) => {
            // Check if all boxes are in their target positions
            const isWin = boxPositions.every(
                (box) =>
                    newPosition.row === box.row && newPosition.col === box.col
            );

            if (isWin) {
                alert("You won!");
                // Reset the game or navigate to the next level
                setPlayerPosition(initialPlayerPosition);
                setBoxPositions(initialBoxPositions);
            }
        },
        [boxPositions]
    );

    const isValidMove = useCallback(
        (newPosition) => {
            // Check boundaries
            if (
                newPosition.row < 0 ||
                newPosition.row >= rowCount ||
                newPosition.col < 0 ||
                newPosition.col >= colCount
            ) {
                return false;
            }

            // Check if the new position is occupied by a box
            if (
                boxPositions.some(
                    (box) =>
                        box.row === newPosition.row &&
                        box.col === newPosition.col
                )
            ) {
                const newBoxPositions = boxPositions.map((box) => {
                    const newPos =
                        box.row === newPosition.row &&
                        box.col === newPosition.col
                            ? {
                                  row:
                                      box.row +
                                      (newPosition.row - playerPosition.row),
                                  col:
                                      box.col +
                                      (newPosition.col - playerPosition.col),
                              }
                            : box;

                    if (
                        newPos.row < 0 ||
                        newPos.row >= rowCount ||
                        newPos.col < 0 ||
                        newPos.col >= colCount
                    ) {
                        return box;
                    }

                    return newPos;
                });

                setBoxPositions(newBoxPositions);
            }

            return true;
        },
        [playerPosition, boxPositions]
    );

    const handleKeyDown = useCallback(
        (e) => {
            const newPosition = { ...playerPosition };

            switch (e.key) {
                case "ArrowUp":
                    newPosition.row -= 1;
                    break;
                case "ArrowDown":
                    newPosition.row += 1;
                    break;
                case "ArrowLeft":
                    newPosition.col -= 1;
                    break;
                case "ArrowRight":
                    newPosition.col += 1;
                    break;
                default:
                    return;
            }

            // Check if the new position is valid
            if (isValidMove(newPosition)) {
                setPlayerPosition(newPosition);
                checkWin(newPosition);
            }
        },
        [playerPosition, isValidMove, checkWin]
    );

    const renderGrid = () => {
        const grid = [];

        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                grid.push(
                    <Line
                        key={`grid-${row}-${col}`}
                        points={[
                            col * tileSize,
                            row * tileSize,
                            (col + 1) * tileSize,
                            row * tileSize,
                            (col + 1) * tileSize,
                            (row + 1) * tileSize,
                            col * tileSize,
                            (row + 1) * tileSize,
                            col * tileSize,
                            row * tileSize,
                        ]}
                        stroke="#fff"
                        strokeWidth={1}
                    />
                );
            }
        }

        return grid;
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Stage width={colCount * tileSize} height={rowCount * tileSize}>
            <Layer>
                {renderGrid()}
                <Rect
                    x={playerPosition.col * tileSize}
                    y={playerPosition.row * tileSize}
                    width={tileSize}
                    height={tileSize}
                    fill="green"
                />
                {boxPositions.map((box, index) => (
                    <Rect
                        key={index}
                        x={box.col * tileSize}
                        y={box.row * tileSize}
                        width={tileSize}
                        height={tileSize}
                        fill="brown"
                    />
                ))}
            </Layer>
        </Stage>
    );
};
