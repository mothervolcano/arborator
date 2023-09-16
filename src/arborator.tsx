import { Layer } from 'paper';
import { paperScope } from './components/paperStage';


import { IAlphabet, ICommand, IComposer, IModel } from './lib/lsys/lsys';

import Alphabet from './lib/lsys/core/alphabet';
import Composer from './lib/lsys/core/composer';


import Tree from './arborator-modules/models/tree';
import Test from './arborator-modules/models/test';
import Turtle from './lib/lsys/tools/turtle';

let view: any
let layer: any
let origin: any

let tree: any
let model: IModel;
let alphabet: IAlphabet;
let composer: IComposer;
// let sequence: Generator<ICommand, void, unknown>;
let sequence: Array<[ICommand, string[]|null]>
let pen: any;


export function reset() {

  
}

export function initModel( selectedModel: string ) {

  paperScope.project.clear();

  view = paperScope.project.view;
  layer = new Layer();

  origin = view.center;

  alphabet = new Alphabet();

  alphabet.registerGlyph( 'Rule', 'I' );
  alphabet.registerGlyph( 'Rule', 'T' );
  alphabet.registerGlyph( 'Rule', 'Y' );
  alphabet.registerGlyph( 'Rule', 'B' );
  alphabet.registerGlyph( 'Rule', 'K' );
  alphabet.registerGlyph( 'Rule', 'G' );
  alphabet.registerGlyph( 'Rule', 'X' );
  alphabet.registerGlyph( 'Rule', 'R' );
  alphabet.registerGlyph( 'Rule', 'O' );
  alphabet.registerGlyph( 'Instruction', 'f' );
  alphabet.registerGlyph( 'Instruction', '+' );
  alphabet.registerGlyph( 'Instruction', '-' );
  alphabet.registerGlyph( 'Instruction', '[' );
  alphabet.registerGlyph( 'Instruction', ']' );
  alphabet.registerGlyph( 'Instruction', 'i' );
  alphabet.registerGlyph( 'Instruction', 'x' );
  alphabet.registerGlyph( 'Marker', '(' );
  alphabet.registerGlyph( 'Marker', ')' );
  alphabet.registerGlyph( 'Marker', ',' );
  alphabet.registerGlyph( 'Marker', '1' );
  alphabet.registerGlyph( 'Marker', '2' );
  alphabet.registerGlyph( 'Marker', '3' );
  alphabet.registerGlyph( 'Marker', '4' );
  alphabet.registerGlyph( 'Marker', '5' );
  alphabet.registerGlyph( 'Marker', '6' );
  alphabet.registerGlyph( 'Marker', '7' );
  alphabet.registerGlyph( 'Marker', '8' );
  alphabet.registerGlyph( 'Marker', '9' );
  alphabet.registerGlyph( 'Marker', '0' );
  alphabet.registerGlyph( 'Marker', '.' );
  alphabet.registerGlyph( 'Marker', '*' );
  alphabet.registerGlyph( 'Marker', '!' );
  alphabet.registerGlyph( 'Marker', '=' );
  alphabet.registerGlyph( 'Marker', '?' );
  alphabet.registerGlyph( 'Marker', '_' );
  alphabet.registerGlyph( 'Marker', '#' );


  switch ( selectedModel ) {

    case 'DEFAULT':
      model = new Test( alphabet, 'I' );
      break;

    case 'PINE':
      model = new Tree( alphabet, 'I' );
      break;
  }

  composer = new Composer( model );

  pen = new Turtle();

  pen.style = {

    strokeColor: 'black',
    strokeWidth: 1
  }

  pen.init( origin.x, origin.y, -90 );


}


export function generate(

  params: any

) {

  const { iterationsNum } = params;

  console.log(`*************************************************`)
  console.log(``)
  console.log(`GENERATING TREE with ${iterationsNum} iterations`);
  console.log(``)
  console.log(`*************************************************`)
  console.log(``)

  composer.reset()

  const thread = composer.compose( iterationsNum );
  
  // console.log(`----> Sequence: ${ thread }`);

  sequence = composer.plot();

}


export function draw(

  scaleCtrl: number,
  params: any

) {

  const { lengthCtrl, angleRotationStepCtrl } = params;

  console.log(`DRAW! angleCtrl: ${lengthCtrl}`);

  layer.removeChildren();

  pen.init( origin.x, origin.y, -90 );


  for ( const command of sequence ) {

      command[0].run( pen, { length: lengthCtrl, angle: angleRotationStepCtrl, params: command[1] } );
  }

  layer.position = origin;

  console.log(`Turtle path: ${pen.path().position}`)

};


export function regenerate(

  params: any

) {

  const { iterationsNum, lenghtReductionFactorCtrl, angleRotationStepCtrl } = params;

  console.log(`REGENERATING TREE... (to be implemented) }`);

}


