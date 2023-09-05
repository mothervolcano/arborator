

const Button = ({ 

	labelText='', 
	onClickEventHandler,
	action='none',
	disabled=false, 

}) => {

	
	function handleClick( event ) {

		const value = event.target.value;

		onClickEventHandler( value );
	}


	return (

    	<button

    		className=	"inline-block relative overflow-hidden text-center rounded-md px-4 py-2 bg-slate-900 hover:bg-slate-700"

			type="button"
			value={action}
			disabled={disabled}
			onClick={onClickEventHandler}
		>
			<span className="text-base text-white">{labelText}</span>
	 	
		</button>

	);
};


export default Button;