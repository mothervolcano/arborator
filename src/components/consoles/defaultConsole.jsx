
import NumberStepper from '../ui/numberStepper';
import Slider from '../ui/slider';
import Button from '../ui/button';

const DefaultConsole = ({

	params,
	inputHandler

}) => {
		
	function handleInput( value, id ) {

		const updatedParams = params.slice();

		updatedParams.map( (item) => {

			if ( item.id === id ) {

				item.value = value;
			}
		});	

		inputHandler( updatedParams );
	};

	return (
	        	
    		<div className={`h-fit`}>
    			
    			<div className={`w-full h-[15rem] grid grid-rows-8 grid-cols-8 bg-white`}>

    				<div className={`col-span-4 px-2 w-full h-full flex flex-row items-center border-t border-r border-slate-900`}>

						<NumberStepper 
							id={params[0].id}
							min={params[0].range[0]}
							max={params[0].range[1]}
							step={params[0].step}
							defaultValue={ params[0].value }
							onValueChangeHandler={ handleInput }
						/>

					</div>

					<div className={`col-span-4 px-2 w-full h-full flex flex-row items-center border-t border-r border-slate-900`}>

						<NumberStepper
							id={params[1].id} 
							min={params[1].range[0]}
							max={params[1].range[1]}
							step={params[1].step}
							defaultValue={ params[1].value }
							onValueChangeHandler={ handleInput }
						/>

					</div>

    				<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[2].id}
							label={params[2].label}
							min={params[2].range[0]}
							max={params[2].range[1]}
							step={params[2].step}
							defaultValue={ params[2].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[3].id}
							label={params[3].label}
							min={params[3].range[0]}
							max={params[3].range[1]}
							step={params[3].step}
							defaultValue={ params[3].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-8 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[4].id}
							label={params[4].label}
							min={params[4].range[0]}
							max={params[4].range[1]}
							step={params[4].step}
							defaultValue={ params[4].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-4 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[5].id}
							min={params[5].range[0]}
							max={params[5].range[1]}
							step={params[5].step}
							defaultValue={ params[5].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

					<div className={`col-span-4 px-2 w-full h-full flex flex-row items-center border-slate-900`}>
				
						<Slider
							id={params[6].id}
							min={params[6].range[0]}
							max={params[6].range[1]}
							step={params[6].step}
							defaultValue={ params[6].value }
							onValueChangeHandler={ handleInput }
						/>					

					</div>

    			</div>
    		</div>
	        	

	    )
}


export default DefaultConsole;


