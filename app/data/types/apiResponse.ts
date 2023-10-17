type ApiResponse<T> = {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: T;
}