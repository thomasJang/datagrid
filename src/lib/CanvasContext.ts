class CanvasContext {
  canvas: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined | null;
  constructor() {}

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }

  public measureText(text: string): number {
    if (!this.context) {
      throw 'Canvas not found. Set the canvas using "CanvasContext.setCanvas()".';
    }
    return this.context.measureText(text).width || 0;
  }
}

export default new CanvasContext();
