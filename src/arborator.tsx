import { Layer } from 'paper';
import { paperScope } from './components/paperStage';


import { IAlphabet, ICommand, IComposer, IModel } from './lib/lsys/lsys';

import Alphabet from './lib/lsys/core/alphabet';
import Composer from './lib/lsys/core/composer';


import Test from './arborator-modules/models/test';
import Test2 from './arborator-modules/models/test2';
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

export function initModel( selectedModel: string, params: any ) {

  const { iterationsNum } = params;

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
  alphabet.registerGlyph( 'Instruction', '.' );
  alphabet.registerGlyph( 'Instruction', '+' );
  alphabet.registerGlyph( 'Instruction', '-' );
  alphabet.registerGlyph( 'Instruction', '=' );
  alphabet.registerGlyph( 'Instruction', '±' );
  alphabet.registerGlyph( 'Instruction', '>' );
  alphabet.registerGlyph( 'Instruction', '<' );
  alphabet.registerGlyph( 'Instruction', '[' );
  alphabet.registerGlyph( 'Instruction', ']' );
  alphabet.registerGlyph( 'Instruction', 'i' );
  alphabet.registerGlyph( 'Instruction', 'x' );
  alphabet.registerGlyph( 'Marker', '(' );
  alphabet.registerGlyph( 'Marker', ')' );
  alphabet.registerGlyph( 'Marker', ',' );
  alphabet.registerGlyph( 'Marker', '*' );
  alphabet.registerGlyph( 'Marker', '?' );


  switch ( selectedModel ) {

    case 'DEFAULT':
      model = new Test( alphabet, 'I', iterationsNum );
      break;

    case 'PINE':
      model = new Test2( alphabet, 'O', iterationsNum );
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

  const { lengthCtrl, angleRotationStepCtrl, angleStepCtrl, iterationsNum } = params;

  console.log(`DRAW! angleCtrl: ${lengthCtrl}`);

  layer.removeChildren();

  model.reset();
  pen.init( origin.x, origin.y, -90 );


  // for ( const command of sequence ) {

  //     command[0].run( pen, { length: lengthCtrl, angle: angleRotationStepCtrl, params: command[1] });
  // }


  for ( let i=0; i<sequence.length; i++ ) {

    const command = sequence[i];

    command[0].run( pen, { length: lengthCtrl, angle: angleRotationStepCtrl, angleReduction: angleStepCtrl, params: command[1] } );
  }



  layer.position = origin;

};


export function regenerate(

  params: any

) {

  const { iterationsNum, lenghtReductionFactorCtrl, angleRotationStepCtrl } = params;

  console.log(`REGENERATING TREE... (to be implemented) }`);

}


