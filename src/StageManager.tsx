import { IComposer, IModel } from "./lib/lsys/lsys";
import Alphabet from "./lib/lsys/core/alphabet";
import Composer from "./lib/lsys/core/composer";
import Turtle from "./lib/lsys/tools/turtle";
import { ParamSet } from "./types";

/************************************************/

function calculateOrigin(width: number, height: number) {
  const viewRatio = width / height;

  if (viewRatio <= 1.3 && width < 415) {
    return { x: width / 2, y: height - height * 0.45 };
  }

  if (width < 1080) {
    return { x: width / 2, y: height * 0.45 };
  }

  return { x: width / 2, y: height * 0.4 };
}

function parseParams(updatedParams: ParamSet) {
  const modelParams: any = {};

  Array.from(updatedParams.values()).forEach((p: any) => {
    modelParams[p.name] = p.value;
  });

  return modelParams;
}

/************************************************/

export default class StageManager {
  model: IModel;
  composer: IComposer;
  pen: any;
  zoomRatio: number = 1;
  realWidth: number = 0;
  realHeight: number = 0;
  origin: { x: number; y: number } = { x: 0, y: 0 };
  params: any;
  updatedParams: any;

  constructor(canvas: HTMLCanvasElement, Model: any) {
    const alphabet = new Alphabet();

    alphabet.registerGlyph("Rule", "A");
    alphabet.registerGlyph("Rule", "C");
    alphabet.registerGlyph("Rule", "I");
    alphabet.registerGlyph("Rule", "T");
    alphabet.registerGlyph("Rule", "Y");
    alphabet.registerGlyph("Rule", "B");
    alphabet.registerGlyph("Rule", "K");
    alphabet.registerGlyph("Rule", "G");
    alphabet.registerGlyph("Rule", "X");
    alphabet.registerGlyph("Rule", "R");
    alphabet.registerGlyph("Rule", "O");
    alphabet.registerGlyph("Instruction", "f");
    alphabet.registerGlyph("Instruction", ".");
    alphabet.registerGlyph("Instruction", "+");
    alphabet.registerGlyph("Instruction", "-");
    alphabet.registerGlyph("Instruction", "=");
    alphabet.registerGlyph("Instruction", "±");
    alphabet.registerGlyph("Instruction", ">");
    alphabet.registerGlyph("Instruction", "<");
    alphabet.registerGlyph("Instruction", "[");
    alphabet.registerGlyph("Instruction", "]");
    alphabet.registerGlyph("Instruction", "i");
    alphabet.registerGlyph("Instruction", "x");
    alphabet.registerGlyph("Marker", "(");
    alphabet.registerGlyph("Marker", ")");
    alphabet.registerGlyph("Marker", ",");
    alphabet.registerGlyph("Marker", "*");
    alphabet.registerGlyph("Marker", "?");

    this.model = new Model(alphabet, "I", 5);
    this.composer = new Composer(this.model);
    this.pen = new Turtle();
  }

  configure(params: any) {
    this.params = params;
    // this.model.configure(parseParams(this.params));

    this.pen.style = {
      strokeColor: "black",
      strokeWidth: 1,
    };

    this.pen.init(this.origin.x, this.origin.y, -90);
  }

  update(params: any) {
    this.params = params;
    const { lengthCtrl, angleRotationStepCtrl, angleStepCtrl, iterationsNum } =
      params;

    // intercept the width and depth values from the params to ensure the model will fit within the current view
    if (
      params[0].name === "baseWidthCtrl" &&
      params[1].name === "baseDepthCtrl"
    ) {
      // this.layer.scale(params[1].value);
      // this.layer.position = this.view.center;
    }

    this.composer.compose(5);
    const sequence = this.composer.plot();

    this.model.reset();
    this.pen.init(this.origin.x, this.origin.y, -90);

    for (let i = 0; i < sequence.length; i++) {
      const command = sequence[i];
      command[0].run(this.pen, {
        length: lengthCtrl,
        angle: angleRotationStepCtrl,
        angleReduction: angleStepCtrl,
        params: command[1],
      });
    }
  }

  reset() {}

  clear() {
    // this.model.clear();
  }

  onMouseMove(x: number, y: number) {
    // this.model.onMouseMove(x, y);
  }

  onMouseDown(x: number, y: number) {
    // this.model.onMouseDown(x, y);
    // this.update(this.params);
  }

  onMouseUp(x: number, y: number) {
    // this.model.onMouseUp(x, y);
    // this.update(this.params);
  }

  onMouseDrag(x: number, y: number) {
    // this.model.onMouseDrag(x, y);
    // this.update(this.params);
  }

  onKeyDown(code: string) {
    // this.model.onKeyDown(code);
  }

  onKeyUp(code: string) {
    // this.model.onKeyUp(code);
    // this.update(this.params);
  }

  onResize(canvas: HTMLCanvasElement) {}

  exportSVG() {}
}
