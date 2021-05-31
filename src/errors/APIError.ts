export class APIError extends Error {
  constructor(code: number, message: string) {
    super('Error code: ' + code + ', message: ' + message);
  }
}

export enum ErrorCode {
  INVALID_INPUT = 1,
  UNKNOWN_ERROR = 2
}
