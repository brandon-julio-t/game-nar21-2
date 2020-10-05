import Player from "../player";
import router from "@/router";
import store from "@/store";
import Environment from './environment';

export default class InputSystem {
  private static get player(): Player | null {
    return store.player as Player | null;
  }

  public static reset(): void {
    onkeydown = null;
    onkeyup = null;
    onmousedown = null;
    onmousemove = null;
    onmouseup = null;

    if (this.player !== null) {
      this.player.isShooting = false;
    }

    this.disableInspectElement();
  }

  public static disableInspectElement(): void {
    if (Environment.isProduction) {
      document.removeEventListener(
        "keydown",
        this.disableInspectElementListener
      );
      document.addEventListener("keydown", this.disableInspectElementListener);
    }
  }

  private static disableInspectElementListener(e: KeyboardEvent): boolean {
    const { ctrlKey, shiftKey, code } = e;

    const preventEvent: boolean =
      code === "F12" ||
      (ctrlKey && shiftKey && code === "KeyI") ||
      (ctrlKey && shiftKey && code === "KeyC") ||
      (ctrlKey && shiftKey && code === "KeyJ") ||
      (ctrlKey && code === "KeyU");

    if (preventEvent) {
      e.preventDefault();
      return false;
    }

    return true;
  }

  public static useMouse(): void {
    this.reset();

    onmousemove = (e: MouseEvent) => {
      if (this.player === null) {
        return;
      }

      const { clientX, clientY } = e;
      this.player.position.x = clientX;
      this.player.position.y = clientY;
    };

    onmousedown = () => this.mouseUpDownListener(true);
    onmouseup = () => this.mouseUpDownListener(false);
  }

  private static mouseUpDownListener(mouseDown: boolean) {
    if (this.player === null) {
      return;
    }

    this.player.isShooting = mouseDown;
  }

  public static useKeyboard(): void {
    this.reset();

    onkeydown = e => this.keyboardInputListener(e, true);
    onkeyup = e => this.keyboardInputListener(e, false);
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

      case "Space":
        this.player.isShooting = keyDown;
        break;

      case "Escape":
        if (Environment.isDevelopment) {
          router.push("/");
        }
        break;
    }
  }
}
