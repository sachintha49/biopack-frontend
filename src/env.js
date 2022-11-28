export const serverMode = 'localEnvironment'

let API = {
  defaultPath: null,
}

switch (serverMode) {
  case 'localEnvironment': {
    API = {
      defaultPath: 'http://localhost:8080',
    }
    break
  }
  default:
}

export default API
