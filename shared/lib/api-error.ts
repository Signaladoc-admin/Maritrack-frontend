export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}
