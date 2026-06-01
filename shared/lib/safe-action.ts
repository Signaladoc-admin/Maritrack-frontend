export async function withSafeAction<T>(
  fn: () => Promise<T>,
  defaultError = "An unexpected error occurred. Please try again."
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    return { success: true, data: await fn() };
  } catch (err: any) {
    return { success: false, error: err.message || defaultError };
  }
}
