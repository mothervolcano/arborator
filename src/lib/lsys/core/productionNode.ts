
import Production from './production'

import { ProductionType, RuleSetType } from '../types'

const S = require('string')


class ProductionNode extends Production {


	protected production: ProductionType

	
	constructor( LABEL: string, defaultValue: number, iterations: number, production: ProductionType ) {

		super( LABEL, iterations )

		this.n = 0
		this.t = defaultValue

		this.production = production

	}


	public process( values: Array<string>, iteration: number,  ) {


		this.iteration = iteration
		
		this.preProcess( values )

		// ---------------------------------------------
		
		if ( values[0] !== undefined && values[0] !== '' ) {

			const nValue = S( values[0] ).toInt()
			const tValue = S( values[1] ).toFloat(2)

			this.n = Math.round( this.nRule( nValue ) );
			this.t = Number.parseFloat(this.tRule( tValue ).toFixed( 3 ));
			
		}

		// ---------------------------------------------

		this.postProcess( values )


		// ---------------------------------------------

		// return this.output()

	}

}


export default ProductionNode