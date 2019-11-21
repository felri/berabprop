const modules = {
  matchLetterToColor,
}

function matchLetterToColor(initial) {
  if (!initial) return '#999999'
  switch (initial.toLowerCase()) {
    case 'a':
      return '#7CB9E8'
    case 'b':
      return '#3a9e77'
    case 'c':
      return '#A3C1AD'
    case 'd':
      return '#E1BD27'
    case 'e':
      return '#badc58'
    case 'f':
      return '#db5970'
    case 'g':
      return '#9b8ef1'
    case 'h':
      return '#ffe169'
    case 'i':
      return '#3ea9d1'
    case 'j':
      return '#8aa341'
    case 'k':
      return '#baf2f5'
    case 'l':
      return '#ffa02d'
    case 'm':
      return '#d46830'
    case 'n':
      return '#62ecaa'
    case 'o':
      return '#ffbe50'
    case 'p':
      return '#0078D7'
    case 'q':
      return '#8764B8'
    case 'r':
      return '#52dd64'
    case 's':
      return '#7edce9'
    case 't':
      return '#dadd5d'
    case 'u':
      return '#e9b55d'
    case 'v':
      return '#99d669'
    case 'w':
      return '#a3c83a'
    case 'x':
      return '#f28d67'
    case 'y':
      return '#ea82ec'
    case 'z':
      return '#ff8295'
    default:
      return '#999999'
  }
}

export default modules
