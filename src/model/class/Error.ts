import { ErrorCode } from "../enum/Error";

export const loginUserErrorMessage: Record<ErrorCode, string> = {
    [ErrorCode.userNotFound]: "User not found :(",
    [ErrorCode.wrongPassword]: "Wrong Password",
    [ErrorCode.invalidEmail]: "Invalid Email",
    [ErrorCode.tooManyRequests]: "You're too fast. Wait a little",
    [ErrorCode.emailAlreadyInUse]: "Email Already in Use",
    [ErrorCode.weakPassword]: "Weak Password",
  };
  