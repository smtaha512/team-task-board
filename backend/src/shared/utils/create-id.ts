export function createId(separator: string) {
  return (prefix: string) => {
    return () => `${prefix}${separator}${crypto.randomUUID()}`;
  };
}
