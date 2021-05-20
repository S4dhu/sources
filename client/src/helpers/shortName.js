const getShortName = name => {
  if (name.length > 18) {
    return name.substr(0, 15) + '...'
  } else {
    return name
  }
}

export { getShortName }