import { Layer } from 'paper';
import { paperScope } from './components/paperStage';


import { IAlphabet, ICommand, IComposer, IModel } from './lib/lsys/lsys';

import Alphabet from './lib/lsys/core/alphabet';
import Composer from './lib/lsys/core/composer';


import Tree from './arborator-modules/models/tree';
import Turtle from './lib/lsys/tools/turtle';

let view: any
let layer: any
let origin: any

let tree: any
let model: IModel;
let alphabet: IAlphabet;
let composer: IComposer;
let sequence: Generator<ICommand, void, unknown>;
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
  alphabet.registerGlyph( 'Instruction', 'f' );
  alphabet.registerGlyph( 'Instruction', '+' );
  alphabet.registerGlyph( 'Instruction', '-' );
  alphabet.registerGlyph( 'Instruction', '[' );
  alphabet.registerGlyph( 'Instruction', ']' );
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


  switch ( selectedModel ) {

    case 'DEFAULT':
      model = new Tree( alphabet, 'I' );
      break;

    case 'PINE':
      break;
  }

  composer = new Composer( model );

  pen = new Turtle();

  pen.style = {

    strokeColor: 'black',
    strokeWidth: 2
  }

  pen.init( origin.x, origin.y, -90 );

}


export function generate(

  params: any

) {

  const { iterationsNum } = params;

  console.log(`GENERATING TREE with ${iterationsNum} iterations`);

  composer.reset()

  const thread = composer.compose( iterationsNum );
  
  // console.log(`----> Sequence: ${ thread }`);

  sequence = composer.plot();

}


export function draw(

  scaleCtrl: number,
  params: any

) {

  const { lenghtReductionFactorCtrl, angleRotationStepCtrl } = params;


  for ( const command of sequence ) {

      command.run( pen );
  }


  layer.position = origin;

  pen.path().fullySelected = true;

  console.log(`Turtle path: ${pen.path().position}`)

};


export function regenerate(

  params: any

) {

  const { iterationsNum, lenghtReductionFactorCtrl, angleRotationStepCtrl } = params;

  console.log(`REGENERATING TREE... (to be implemented) }`);

}


