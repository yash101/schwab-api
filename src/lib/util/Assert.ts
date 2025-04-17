export function assert_warn(condition: any, message: string): void {
  if (!Boolean(condition)) {
    console.warn(message);
  }
}
