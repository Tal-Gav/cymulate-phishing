export interface JwtPayload {
    id: string;
    email?: string;
}
export declare const generateRefreshToken: (id: string) => any;
export declare const generateAccessToken: (payload: any) => any;
export declare const verifyAccessToken: (token: string) => {
    valid: boolean;
    expired: boolean;
    decoded: any;
    msg?: undefined;
} | {
    valid: boolean;
    expired: boolean;
    msg: any;
    decoded: null;
};
export declare const verifyRefreshToken: (token: string) => {
    valid: boolean;
    expired: boolean;
    decoded: JwtPayload;
    msg?: undefined;
} | {
    valid: boolean;
    expired: boolean;
    msg: any;
    decoded: null;
};
