let localAppId = ''
try {
  localAppId = require('./appID').default
  console.log('appID', localAppId)
} catch (error) {
  console.warn(error)
}

const config = {
  enableSDKLogging: true,
  enableSDKDebugLogging: false,
  appId: localAppId,
  token: '',
  channelId: 'testdcg',
  uid: 0,
  pluginPath: '',
  nativeSDKLogPath: './Agora_SDK.log',
  addonLogPath: './Agora_SDK_Addon.log',
}

export default config
