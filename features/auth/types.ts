export type VerificationTokenMethod = 'sms' | 'email'

export interface RequestTokenRequest {
    email: string
}

export interface ValidateOTPRequest {
    email: string
    token?: string
    otp?: string
}

export interface ValidateOTPResponse {
    accessToken: string;
    refreshToken: string;
    isOnboarded: boolean;
}

export interface ResetPasswordRequest {
    password: string;
    email: string;
    token?: string;
    otp?: string
}

export interface ForgotPasswordRequest { email: string }