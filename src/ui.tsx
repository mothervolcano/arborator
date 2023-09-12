
import { useMediaQuery } from 'react-responsive';

import { useState, useEffect } from 'react';

import { Model, Param, ParamSet } from './types';

import Stage from './components/stage'
import Button from './components/ui/button';
import ModelSelectionModal from './components/modals/modelSelectionModal';
import DefaultConsole from './components/consoles/defaultConsole';
import PineConsole from './components/consoles/pineConsole';


import { reset, initModel, generate, regenerate, draw } from './arborator';



const defaultParamSchema: Param[] = [

	{ id: 'mkp1', name: 'iterationsNum', value: 6, range: [1, 10], step: 1, label: "P1", },
	{ id: 'mkp5', name: 'scaleCtrl', value: 1, range: [1, 3], step: 0.01, label: "P3", },
	{ id: 'mkp2', name: 'angleRotationStepCtrl', value: 30, range: [0, 60], step: 0.1, label: "P2", },
	{ id: 'mkp3', name: 'lengthCtrl', value: 1, range: [0.25, 5], step: 0.01, label: "P4", },
	{ id: 'mkp4', name: 'empty', value: 15, range: [0, 30], step: 0.1, label: "P5", },
	{ id: 'mkp6', name: 'empty', value: 1, range: [0, 2], step: 0.01, label: "P6", },
	{ id: 'mkp7', name: 'empty', value: 1, range: [0, 2], step: 0.01, label: "P7", },
];


const pineParamSchema: Param[] = [

	{ id: 'ogp1', name: 'iterationsNum', value: 7, range: [1, 10], step: 0.01, label: "Iterations", },
	{ id: 'ogp2', name: 'empty', value: 0.5, range: [0, 2], step: 0.01, label: "Split Aperture", },
	{ id: 'ogp3', name: 'empty', value: 1, range: [0, 2], step: 1, label: "Olga P3", },
	{ id: 'ogp4', name: 'empty', value: 0.5, range: [0, 2], step: 1, label: "Olga P4", },
	{ id: 'ogp5', name: 'empty', value: 1, range: [0, 2], step: 1, label: "Olga P5", },
	{ id: 'ogp6', name: 'empty', value: 1, range: [0, 2], step: 1, label: "Olga P6", },
	{ id: 'ogp7', name: 'empty', value: 1, range: [0, 2], step: 1, label: "Olga P7", },
];


// ----------------------------------------------------------------------------

const models: Model[] = [

	{ option: "DEFAULT", label: "Default", icon: "TEST", console: DefaultConsole, params: defaultParamSchema, default: false, checked: false },
	{ option: "PINE", label: "Pine", icon: "TEST", console: PineConsole, params: pineParamSchema, default: false, checked: false },
];




const UI = () => {

	
	// ----------------------------------------------------------------------------


	const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
	const [isPaperLoaded, setIsPaperLoaded] = useState(false);

	const [initialized, setInitialized] = useState(false);
	const [inModelSelectionScreen, setInModelSelectionScreen] = useState<boolean>(true);

	const [currentModel, setCurrentModel] = useState<Model | null>(null);
	const [paramsForModel, setParamsForModel] = useState<Param[] | null>(null);

	const [scaleCtrl, setScaleCtrl] = useState(3);


	const _isDesktopOrLaptop = useMediaQuery({
    	
		query: '(min-width: 1224px)'
	});


	//-----------------------------------------------------------------------------
	// HOOKS


	useEffect(() => {

		setIsDesktopOrLaptop(_isDesktopOrLaptop);

	}, []);


	useEffect(() => {

		if (isPaperLoaded) {

			reset();

		}

	}, [isPaperLoaded]);


	useEffect(() => { 

		if ( isPaperLoaded && paramsForModel !== null ) {

			const _modelParams: any = {};

			Array.from(paramsForModel.values()).forEach((p: any) => {

				_modelParams[p.name] = p.value;
			});


			// console.log( `!!!! ${currentModel.option}` )
			console.log(`!!!!!! UPDATED VALUE: ${_modelParams.lengthCtrl }`)


			console.log(`USE EFFECT: draw()`);

			draw(scaleCtrl, _modelParams);
		}

	}, [ paramsForModel ]);



	//-----------------------------------------------------------------------------
	// HANDLERS


	function handleGenerateAction(selectedModel: any) {

		if (isPaperLoaded) {

			const _modelParams: any = {};

			Array.from(selectedModel?.params.values() || []).forEach((p: any) => {

				_modelParams[p.name] = p.value; 

			});

			// console.log(`GENERATE HANDLER: initModel() + generate()`);
			
			initModel(selectedModel.option)
			generate(_modelParams);

			setCurrentModel(selectedModel);
			setParamsForModel(selectedModel.params);

			setInModelSelectionScreen( false );

			if ( !initialized ) { setInitialized(true) };

		} else {

		}
	};


	function handleRegenerateAction(selectedModel: any) {

		if ( isPaperLoaded && currentModel ) {
			
			console.log(`ready to regenerate ${selectedModel.label}`);

			const _modelParams: any = {};


			Array.from(selectedModel?.params.values() || []).forEach((p: any) => {

				_modelParams[p.name] = p.value; 

			});


			reset();
			regenerate(_modelParams);
			draw(scaleCtrl, _modelParams);


		} else {

		}
	};


	function handleParamCtrlInputForModel(updatedParams: any) {

		console.log(`UPDATE PARAMS! ${updatedParams}`);

		console.log(`!!!!!! RECEIVED VALUE: ${updatedParams[3].name}  / ${updatedParams[3].value}`)

		setParamsForModel(updatedParams);
	}


	// -------------------------------------------------------------------------------------------------------

	
	function switchConsole(model: Model) {

		const Console = model.console;

		return (<Console params={paramsForModel} inputHandler={handleParamCtrlInputForModel} />)
	}



	return (
        
		<div className={`relative w-3/4 h-[80vh] m-5 border border-slate-900`}>

		  	
			<div className={`w-full h-full`}>

				{isDesktopOrLaptop && (

					<Stage

						onPaperLoad={setIsPaperLoaded}
					/>
				)}

			</div>


			<div className={`absolute top-0 left-0 w-full h-full`}>
        		
				{

					isDesktopOrLaptop && inModelSelectionScreen && (

						<ModelSelectionModal 

							initialized={initialized}
							options={models}
							onGenerate={handleGenerateAction}
							onClose={() => setInModelSelectionScreen(false)}
						/>

					)
				}

			</div>

			<div className={`absolute ${isDesktopOrLaptop ? "top-0" : "top-0"} left-0 ${isDesktopOrLaptop ? "max-w-[250px]" : "w-full"} ${isDesktopOrLaptop ? "h-fit" : "h-[70vh]"} m-5 border border-slate-900`} > 

				{
					currentModel && !inModelSelectionScreen && switchConsole(currentModel)
				}

			</div>

			<div className={`absolute top-0 right-0 m-2`}>
		    	
				{
					!inModelSelectionScreen && (

						<Button

							labelText="new"
							onClickEventHandler={() => setInModelSelectionScreen(true)}
						/>
					)
				}

			</div>

			<div className={`absolute bottom-0 right-0 m-2`}>

				{
					!inModelSelectionScreen && currentModel && (

						<Button

							labelText="regenerate"
							onClickEventHandler={handleRegenerateAction}
						/>
					)
				}
			
			</div>

		</div>

	)
};


export default UI;