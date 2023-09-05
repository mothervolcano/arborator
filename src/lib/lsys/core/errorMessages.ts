export class IncompleteParameterStringException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IncompleteParameterStringException';
  }
}

export class EmptyStringException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmptyStringException';
  }
}

export class NoParametersFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoParametersFoundException';
  }
}