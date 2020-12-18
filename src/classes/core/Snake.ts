import {
  hexToRgb,
  randomHexColors,
  randomIntegerBetween
} from "@/classes/core/utilities";

const direction: string[] = ["UP", "DOWN", "LEFT", "RIGHT"];

export default class Snake {
  public readonly color: string;
  private readonly initialDirection: string;
  private direction: string;

  public constructor(public rowIdx: number, public colIdx: number) {
    const color = hexToRgb(randomHexColors());
    this.color = `rgba(${color?.red}, ${color?.green}, ${color?.blue}, 0.5)`;
    this.initialDirection = this.direction =
      direction[randomIntegerBetween(0, direction.length - 1)];
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

    this.direction = direction[randomIntegerBetween(0, direction.length - 1)];
    while (this.direction === this.initialDirection) {
      this.direction = direction[randomIntegerBetween(0, direction.length - 1)];
    }
  }
}
