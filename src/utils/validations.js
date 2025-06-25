export const required = (value) => {
  return value && value.trim() !== ''
}

export const minLength = (value, count = 6) => {
  return value && value.length >= count
}

export const maxLength = (value, count = 100) => {
  return value && value.length <= count
}

export const isEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const isSame = (first, second) => {
  return first === second
}
