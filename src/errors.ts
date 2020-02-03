/*
  Login:
    ApiError: 201 - Client not authorized or not selected game profile
    ApiError: 205 - Bad account id
    ApiError: 206 - Wrong email or password
    ApiError: 209 - Received new hardware code. Need confirm
    ApiError: 211 - Wrong activation code
    ApiError: 214 - Enter captcha
*/

export class ApiError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class WrongCredentialsError extends ApiError {
  constructor(message?: string) {
    super(message);
    this.name = 'WrongCredentialsError';
  }
}


export class NewHardwareError extends ApiError {
  constructor(message?: string) {
    super(message);
    this.name = 'NewHardwareError';
  }
}

export class WrongActivationCodeError extends ApiError {
  constructor(message?: string) {
    super(message);
    this.name = 'WrongActivationCodeError';
  }
}

export class EnterCaptchaError extends ApiError {
  constructor(message?: string) {
    super(message);
    this.name = 'EnterCaptchaError';
  }
}
