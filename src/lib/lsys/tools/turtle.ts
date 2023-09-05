import { Point, Path } from 'paper';


class Turtle {

  private _position: any | null;
  private _angle: number;
  private penDown: boolean;
  private _path: any | null;
  private _style: any

  constructor( style?: any ) {

    this._position = new Point(0,0)
    this._angle = 0 ;
    this.penDown = true;

    this._style = style || {

      strokeColor: 'black',
      strokeWidth: 1
    }
  }

  private createPath() {

    const _path = new Path({

        strokeColor: this._style.strokeColor,
        strokeWidth: this._style.strokeWidth,
        opacity: 1

      });

    return _path;
  }

  set style( input: any ) {

    this._style = input;
  }


  get style(): void {

    return this._style;
  }

  public init( x: number,  y: number, angle: number) {

    this._position = new Point(x, y)
    this._angle = angle
    this._path = this.createPath();
    this._path.add(this._position)

    return this;
  }


  public path(): any {

    return this._path
  }

  public position(): any {

    return this._position;

  }

  public angle(): number {

    return this._angle
  }

  public forward(distance: number): void {

    const angleInRadians = (this._angle * Math.PI) / 180;
    const dx = distance * Math.cos(angleInRadians);
    const dy = distance * Math.sin(angleInRadians);
    const newPosition = this._position.add([dx, dy]);

    if (this.penDown) {

      if (!this._path) {

        this._path = this.createPath();
        this._path.add(this._position);
      }

      this._path.add(newPosition);
    }

    this._position = newPosition;
  }

  public backward(distance: number): void {

    this.forward(-distance);
  }

  public rotate( angle: number ) {

    this._angle = angle;    
  }

  public left(angle: number): number {

    return this._angle -= angle;
  }

  public right(angle: number): number {

    return this._angle += angle;
  }

  public down(): void {

    this.penDown = true;
  }

  public up(): void {

    this.penDown = false;
    this._path = null;
  }

  public goto(x: number, y: number): void {

    const newPosition = new Point(x, y);

    if (this.penDown) {

      if (!this._path) {

        this._path = this.createPath();
        this._path.add(this._position);
      }

      this._path.add(newPosition);
    }

    this._position = newPosition;
  }

  public reset(): void {

    if (this._path) {

      this._path.remove();
    }

    this._path = this.createPath();
    this._path.add(this._position);
  }
}

export default Turtle;
