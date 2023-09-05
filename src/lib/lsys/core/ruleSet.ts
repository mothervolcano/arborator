
import { RuleSetType, ProductionType } from '../types'


class RuleSet implements RuleSetType {

	public collection: Array<ProductionType>

	constructor() {

		this.collection = []

	}
	

	private updateProbabilities(): void {

		const totalProbability = this.collection.reduce((sum, rule) => sum + rule.probability, 0);

		if ( totalProbability > 0 ) {

			const scalingFactor = 1 / totalProbability;

			this.collection.forEach((rule) => {

				rule.probability *= scalingFactor;
			});
		}
	}


	public add( rule: ProductionType, probability: number ): void {

		rule.probability = probability

		this.collection.push( rule )
	}

}


export default RuleSet