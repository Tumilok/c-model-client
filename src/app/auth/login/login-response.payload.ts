export interface LoginResponse {
    authenticationToken: string;
    email: string;
    expiresAt: Date;
    refreshToken: string;
}