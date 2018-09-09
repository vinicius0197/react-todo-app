import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
  .configure({host: '192.168.0.17'}) // controls connection & communication settings
  .use(asyncStorage())
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!