import Player from "./player";
import router from "@/router";
import store from "@/store";

export default class InputSystem {
  private static get player(): Player | null {
    return store.player as Player | null;
  }

  public static useMouse(): void {
    onkeydown = null;
    onkeyup = null;
    onmousemove = (e: MouseEvent) => {
      if (this.player === null) {
        return;
      }

      const { clientX, clientY } = e;
      this.player.position.x = clientX;
      this.player.position.y = clientY;
    };
  }

  public static useKeyboard(): void {
    onkeydown = e => this.keyboardInputListener(e, true);
    onkeyup = e => this.keyboardInputListener(e, false);
    onmousemove = null;
  }

  private static keyboardInputListener(
    e: KeyboardEvent,
    keyDown: boolean
  ): void {
    if (this.player === null) {
      return;
    }

    switch (e.code) {
      case "ArrowUp":
      case "KeyW":
        this.player.isMovingUp = keyDown;
        break;

      case "ArrowDown":
      case "KeyS":
        this.player.isMovingDown = keyDown;
        break;

      case "ArrowLeft":
      case "KeyA":
        this.player.isMovingLeft = keyDown;
        break;

      case "ArrowRight":
      case "KeyD":
        this.player.isMovingRight = keyDown;
        break;

      case "ShiftLeft":
        this.player.isSlowingDown = keyDown;
        break;

      case "Escape":
        if (process.env.NODE_ENV === "development") {
          router.push("/");
        }
        break;
    }
  }
}
