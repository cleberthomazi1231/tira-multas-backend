export type ErrorDetail = {
    field: string;
    message: string;
    expected?: string;
    received?: string;
}

type AppErrorObject = {
    error: string;
    details?: ErrorDetail[] 
};

export class BadRequestError extends Error {
    public readonly object: AppErrorObject;

    constructor(details: ErrorDetail[]) {
        super('[BadRequestError]');

        this.object = {
            error: 'invalid_request_body',
            details
        };
    }
}

export class UnauthorizedError extends Error {
    public readonly object: AppErrorObject;

    constructor() {
        super('[UnauthorizedError]');

        this.object = {
            error: 'unauthorized_user'
        };
    }
}

export class InternalError extends Error {
    public readonly object: AppErrorObject;

    constructor() {
        super('[InternalError]');

        this.object = {
            error: 'internal_error'
        };
    }
}

