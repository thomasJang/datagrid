class CanvasContext {
  canvas: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined | null;
  constructor() {}

  public initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = "ac-datagrid--canvas";
    this.context = this.canvas.getContext("2d");
  }

  public measureText(text: string): number {
    if (!this.context) {
      this.initCanvas();
    }
    try {
      return this.context?.measureText(text).width || 0;
    } catch (err) {

    }
    return 0;
  }
}

export default new CanvasContext();
