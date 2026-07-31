/**
 * Exhaustiveness helper for switch/if chains.
 * Throws at runtime if a theoretically impossible value appears.
 */
export function assertNever(value: never, message = "Unexpected value"): never {
  throw new Error(`${message}: ${String(value)}`);
}
