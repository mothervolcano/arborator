import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim } from "../lsys";
import CounterPrim from "../prims/counterPrim";
import IdPrim from "../prims/idPrim";
import ImperativePrim from "../prims/imperativePrim";
import OperationPrim from "../prims/operationPrim";
import ParameterPrim from "../prims/parameterPrim";

class BaseSprite extends Sprite {
	protected stubPrims: Prim[] = [];
	protected workingPrims: (Prim | undefined)[] = [];

	constructor() {
		super();

		this.stubPrims = [
			new ParameterPrim(),
			new CounterPrim(),
			new ImperativePrim(),
			new OperationPrim(),
			new IdPrim(),
		];
	}

	public implant(directory: Map<number, any>, dialect: Glyph[]): void {}

	public sow(
		targets?: string[] | undefined,
	): void | { targets: Glyph[]; prim: Prim }[] {}

	public update(params: string): string {
		this.workingPrims = params.split(",").map((encodedPrim: string) => {
			for (const stub of this.stubPrims) {
				const prim = stub.recast(params);

				if (prim) {
					return prim as Prim;
				}
			}
		});

		return params;
	}

	protected process(stream: MetaGlyph[], context?: any): MetaGlyph[] | null {
		return stream;
	}

	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {
		return stream;
	}
}

export default BaseSprite;
