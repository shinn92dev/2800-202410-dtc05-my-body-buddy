export { };

declare global {
    interface CustomJwtSessionClaims {
        hasProfile?: boolean;
        hasTarget?: boolean;
    }
}
