


export function getParametersLength( str: string ): number {

	const paramStr = getParameterString( str );

	if ( paramStr !== null ) {

		return paramStr.length + 2;

	} else {

		return -1;
	}

};


class GenericStringException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GenericStringException';
  }
}

class EmptyStringException extends GenericStringException {
  constructor(message: string) {
    super(message);
    this.name = 'EmptyStringException';
  }
}

class DelimiterException extends GenericStringException {
  constructor(message: string) {
    super(message);
    this.name = 'DelimiterException';
  }
}

export function getParameterString(
  str: string,
  openingChar: string = '(',
  closingChar: string = ')'
): string | null {
  if (typeof str === 'undefined' || str === '') {
    throw new EmptyStringException('Empty or undefined string');
  }

  const openingIndex = str.indexOf(openingChar);
  const closingIndex = str.indexOf(closingChar);

  if (openingIndex >= 0 && closingIndex > 0) {
    if (closingIndex - openingIndex === 1) {
      throw new DelimiterException('No parameters in between delimiters');
    }
    return str.substring(openingIndex + 1, closingIndex);
  } else if (closingIndex === -1 && openingIndex >= 0) {
    throw new DelimiterException('Incomplete parameter string; closing delimiter missing');
  } else {
    throw new DelimiterException(`No opening or closing delimiters found`);
  }
}



export function renderSequence( sequence: string ) {

	
}



export function parseParameters( str: string ) {

	return []
}