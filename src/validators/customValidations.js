export function userExists (value) {
  return (value.length >= 7)
}

export function emailExists (value) {
  return (value.length >= 8)
}
