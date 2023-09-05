
export interface ProductionType {

  // readonly rule: string;
  readonly label: string;
  probability: number;
  seed: (nValue: number, tValue: number) => void;
  process: (values: string[], iteration: number) => void;
  output: () => string;
  count: () => void;
}

export interface RuleSetType {
  readonly collection: Array<ProductionType>;
  add(rule: ProductionType, probability: number): void;
}

