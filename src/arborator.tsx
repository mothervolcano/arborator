import { Layer } from 'paper';
import { paperScope } from './components/paperStage';

import Sequencer from './lib/lsys/core/sequencer'

import Tree from './arborator-modules/models/tree';
// import PineTree from './models/pineTree';


let view: any
let layer: any
let origin: any

let tree: any
let model: any;
let sequencer: any


export function reset() {

  paperScope.project.clear();

  view = paperScope.project.view;
  layer = new Layer();

}

export function initModel( selectedModel: string ) {

  switch ( selectedModel ) {

    case 'DEFAULT':
      model = Tree;
      break;

    case 'PINE':
      break;
  }

}


export function generate(

  params: any

) {

  const { iterationsNum } = params;

  origin = view.center;

  tree = new model( origin, iterationsNum );

  sequencer = new Sequencer( tree.rules, tree.actions, tree.axiom );
  sequencer.write( iterationsNum );

}


export function draw(

  scaleCtrl: number,
  params: any

) {

  const { lenghtReductionFactorCtrl, angleRotationStepCtrl } = params;

  console.log(`GENERATING TREE... ${scaleCtrl} / ${lenghtReductionFactorCtrl} / ${angleRotationStepCtrl}`);

  origin = view.center;

  tree.reconfigure( origin, scaleCtrl, lenghtReductionFactorCtrl, angleRotationStepCtrl );
  sequencer.run();

  layer.scale(scaleCtrl);

  layer.position = view.center;

}


export function regenerate(

  params: any

) {

  const { iterationsNum, lenghtReductionFactorCtrl, angleRotationStepCtrl } = params;

  console.log(`REGENERATING TREE... (to be implemented) }`);

  tree = new model( origin, iterationsNum );

  sequencer = new Sequencer( tree.rules, tree.actions, tree.axiom );
  sequencer.write( iterationsNum );

}


