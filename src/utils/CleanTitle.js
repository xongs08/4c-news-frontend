export const CleanTitle = (title) => {
  const regex = /\s+/g
  const modifiedString = title.replace(regex, "-").toLowerCase()
  return modifiedString
}
