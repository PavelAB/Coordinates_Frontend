export interface Result<T> {
    IsSuccess: boolean;
    IsFailure: boolean;
    ErrorMessage?: string;
    Content?: T
}