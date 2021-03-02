/**
 * Quick and dirty string hashing.
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 */
export const stringHash = (value: string) => {
  var hash = 0,
    i,
    chr
  if (value.length === 0) return hash
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
