import {
  hexToRgb,
  randomHexColors,
  randomIntegerBetween
} from "@/classes/core/utilities";

const direction: string[] = ["UP", "DOWN", "LEFT", "RIGHT"];

export default class Snake {
  public readonly color: string;
  private readonly initialDirection: string;
  private readonly availableDirections: string[];

  private direction: string;
  private lastDirection: string | null;

  public constructor(public rowIdx: number, public colIdx: number) {
    const color = hexToRgb(randomHexColors());
    this.color = `rgba(${color?.red}, ${color?.green}, ${color?.blue}, 0.5)`;
    this.direction = direction[randomIntegerBetween(0, direction.length - 1)];
    this.initialDirection = this.direction;
    this.lastDirection = null;

    this.availableDirections = direction.filter(
      dir => dir !== this.initialDirection
    );
  }

  public next(): void {
    switch (this.direction) {
      case "UP":
        this.rowIdx--;
        break;
      case "DOWN":
        this.rowIdx++;
        break;
      case "LEFT":
        this.colIdx--;
        break;
      case "RIGHT":
        this.colIdx++;
        break;
    }

    if (this.lastDirection) {
      const directions = this.availableDirections.filter(
        dir => dir !== this.lastDirection
      );

      this.direction =
        directions[randomIntegerBetween(0, directions.length - 1)];
    } else {
      this.direction = this.availableDirections[
        randomIntegerBetween(0, this.availableDirections.length - 1)
      ];
    }

    this.lastDirection = this.direction;
  }
}
