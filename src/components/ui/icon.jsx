


const Icon = ({

	name="",
	thickness="1",
	size="5",
	color="slate-900",
	style='',
	selectedStyle='',
	hoverStyle=''

}) => {

	const iconSet = {

		'WAVE_SINE': [ "M4 64C8 43 17.443 27 34 27C50.557 27 59 44.0003 64 64C68.709 82.8367 77.443 101 94 101C110.557 101 120 85 124 64" ],
		'WAVE_SQUARE': [ "M4 64V24H64V104H124V74" ],
		'WAVE_TRIANGLE': [ "M4 64L34 24L94 104L124 64" ],
		'WAVE_SAWTOOTH': [ "M9 94V24L119 104" ],
		'TEST': [ "M54.141 24L14 64.141L54.141 104", "M34.07 64H114.141" ]
	}

	function svgPaths( _name ) {

		if ( iconSet[_name] ) {

			const paths = iconSet[_name].map( (n) => {

				return <path d={n} vectorEffect="non-scaling-stroke" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>

			});

			return paths;	

		} else {

			return '';
		}
	}

	const _style = `stroke-${thickness} stroke-${color} w-${size} h-${size}`;

	return (

		<svg
			className={`pointer-events-none ${style} ${selectedStyle} ${hoverStyle}`}
			vectorEffect="non-scaling-stroke"
   			fill="none"
   			viewBox="0 0 128 128"
		>
			
			{ svgPaths(name) }
		
		</svg>
	)
}

export default Icon;