class Turtle {
  private _position: any | null;
  private _angle: number = 0;
  private penDown: boolean = false;
  private _style: any = { strokeColor: "#0000000", strokeThickness: 1 };
  private _ctx: any;

  constructor(ctx: any, style?: any) {
     this._ctx = ctx

    if (this._ctx) {
      this._ctx.strokeStyle = this._style.strokeColor;
      this._ctx.lineWidth = this._style.strokeThickness;

      this._position = { x: 0, y: 0 };
      this._angle = 0;
      this.penDown = true;

      this._ctx.beginPath();
      this._ctx.moveTo(0, 0);
    }

    // this._position = new Point(0, 0);
    // this._angle = 0;
    // this.penDown = true;

    // this._style = style || {
    //   strokeColor: "black",
    //   strokeWidth: 1,
    // };
  }

  set style(input: any) {
    // this._style = input;
  }

  get style(): void {
    return this._style;
  }

  get context(): void {
    return this._ctx;
  }

  public init(x: number, y: number, angle: number) {
    this._ctx.moveTo(x, y);
    this._position = { x, y };
    this._angle = angle;

  }

  public position(): any {
    return this._position;
  }

  public angle(): number {
    return this._angle;
  }

  public forward(distance: any): void {
    const angleInRadians = (this._angle * Math.PI) / 180;
    const dx = distance * Math.cos(angleInRadians);
    const dy = distance * Math.sin(angleInRadians);
    const newPos = { x: this._position.x + dx, y: this._position.y + dy };
    

    if (this.penDown) {
      this._ctx.strokeStyle = this._style.strokeColor;
      this._ctx.lineWidth = this._style.strokeThickness;
      this._ctx.beginPath();
      this._ctx.moveTo(this._position.x, this._position.y);
      this._ctx.lineTo(newPos.x, newPos.y);
      this._ctx.stroke();
    }

    this._position = newPos;
  }

  public backward(distance: number): void {
    this.forward(-distance);
  }

  public rotate(angle: number) {
    this._angle = angle;
  }

  public left(angle: number = 0): number {
    return (this._angle -= angle);
  }

  public right(angle: number = 0): number {
    return (this._angle += angle);
  }

  public down(): void {
    this.penDown = true;
  }

  public up(): void {
    this.penDown = false;
  }

  public goto(x: number, y: number): void {
    const newPos = { x, y };

    this._ctx.beginPath();

    if (this.penDown) {
      this._ctx.strokeStyle = this._style.strokeColor;
      this._ctx.lineWidth = this._style.strokeThickness;
      this._ctx.lineTo(newPos.x, newPos.y);
      this._ctx.stroke();
    } else {
      this._ctx.moveTo(newPos.x, newPos.y);
    }

    this._position = newPos;
  }

  public reset(): void {
    // if (this._path) {
    //   this._path.remove();
    // }

    // this._path = this.createPath();
    // this._path.add(this._position);
  }
}

export default Turtle;
