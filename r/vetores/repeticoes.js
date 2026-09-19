/* No R: ?replicate */

export function replicate(n, f) {
  return Array.from({ length: n }, () => f());
}
