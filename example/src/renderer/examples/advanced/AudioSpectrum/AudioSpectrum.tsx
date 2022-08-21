import { Button, Card, Divider, List } from 'antd'
import createAgoraRtcEngine, {
  AudioSpectrumData,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IAudioDeviceManager,
  IAudioSpectrumObserver,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  RtcConnection,
  RtcStats,
  UserAudioSpectrumInfo,
  UserOfflineReasonType,
} from 'electron-agora-rtc-ng'
import { Component } from 'react'
import DropDownButton from '../../component/DropDownButton'
import JoinChannelBar from '../../component/JoinChannelBar'
import { AudioProfileList, AudioScenarioList } from '../../config'
import config from '../../../config/agora.config'
import styles from '../../config/public.scss'
import { configMapToOptions, getRandomInt } from '../../../utils'

interface User {
  isMyself: boolean
  uid: number
}

interface Device {
  deviceName: string
  deviceId: string
}

interface State {
  audioRecordDevices: Device[]
  audioProfile: number
  audioScenario: number
  allUser: User[]
  isJoined: boolean
  intervalInMS: number
  audioSpectrumData: number[]
}

export default class AudioSpectrum
  extends Component<{}, State, any>
  implements IRtcEngineEventHandler, IAudioSpectrumObserver
{
  rtcEngine?: IRtcEngineEx

  audioDeviceManager: IAudioDeviceManager

  state: State = {
    audioRecordDevices: [],
    audioProfile: AudioProfileList.Default,
    audioScenario: AudioScenarioList.Default,
    allUser: [],
    isJoined: false,
    intervalInMS: 100,
    audioSpectrumData: [],
  }

  componentDidMount() {
    this.getRtcEngine().registerEventHandler(this)
    this.getRtcEngine().registerAudioSpectrumObserver(this)
    this.audioDeviceManager = this.getRtcEngine().getAudioDeviceManager()

    this.setState({
      audioRecordDevices:
        this.audioDeviceManager.enumerateRecordingDevices() as any,
    })
  }

  componentWillUnmount() {
    this.getRtcEngine().unregisterEventHandler(this)
    this.getRtcEngine().unregisterAudioSpectrumObserver(this)
    this.getRtcEngine().leaveChannel()
    this.getRtcEngine().release()
  }

  getRtcEngine() {
    if (!this.rtcEngine) {
      this.rtcEngine = createAgoraRtcEngine()
      //@ts-ignore
      window.rtcEngine = this.rtcEngine
      const res = this.rtcEngine.initialize({ appId: config.appId })
      this.rtcEngine.setLogFile(config.nativeSDKLogPath)

      console.log('initialize:', res)
    }

    return this.rtcEngine
  }

  onJoinChannelSuccess(
    { channelId, localUid }: RtcConnection,
    elapsed: number
  ): void {
    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser]
    newAllUser.push({ isMyself: true, uid: localUid })
    this.setState({
      isJoined: true,
      allUser: newAllUser,
    })
  }

  onUserJoined(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void {
    console.log(
      'onUserJoined',
      'connection',
      connection,
      'remoteUid',
      remoteUid
    )

    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser]
    newAllUser.push({ isMyself: false, uid: remoteUid })
    this.setState({
      allUser: newAllUser,
    })
  }

  onUserOffline(
    { localUid, channelId }: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void {
    console.log('onUserOffline', channelId, remoteUid)

    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser.filter((obj) => obj.uid !== remoteUid)]
    this.setState({
      allUser: newAllUser,
    })
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats): void {
    this.setState({
      isJoined: false,
      allUser: [],
    })
  }

  onError(err: ErrorCodeType, msg: string): void {
    console.error(err, msg)
  }

  onLocalAudioSpectrum(data: AudioSpectrumData): boolean {
    console.log('onLocalAudioSpectrum', data)
    return true
  }

  onRemoteAudioSpectrum(
    spectrums: UserAudioSpectrumInfo[],
    spectrumNumber: number
  ): boolean {
    console.log('onRemoteAudioSpectrum', spectrums, spectrumNumber)
    return true
  }

  setAudioProfile = () => {
    const { audioProfile, audioScenario } = this.state
    this.getRtcEngine().setAudioProfile(audioProfile, audioScenario)
  }

  renderItem = ({ isMyself, uid }: User) => {
    return (
      <List.Item>
        <Card title={`${isMyself ? 'Local' : 'Remote'} `}>Uid: {uid}</Card>
      </List.Item>
    )
  }

  renderRightBar = () => {
    const { audioRecordDevices } = this.state
    return (
      <div className={styles.rightBar} style={{ width: '60%' }}>
        <div style={{ overflow: 'auto' }}>
          <DropDownButton
            options={configMapToOptions(AudioProfileList)}
            onPress={(res) =>
              this.setState({ audioProfile: res.dropId }, this.setAudioProfile)
            }
            title='Audio Profile'
          />
          <DropDownButton
            options={configMapToOptions(AudioScenarioList)}
            onPress={(res) =>
              this.setState({ audioScenario: res.dropId }, this.setAudioProfile)
            }
            title='Audio Scenario'
          />
          <DropDownButton
            title='Microphone'
            options={audioRecordDevices.map((obj) => {
              const { deviceId, deviceName } = obj
              return {
                dropId: deviceId,
                dropText: deviceName,
                ...obj,
              }
            })}
            onPress={(res) => {
              this.audioDeviceManager.setRecordingDevice(res.dropId)
            }}
          />

          <Divider>Audio Spectrum</Divider>
          <Button
            htmlType='button'
            onClick={() => {
              this.getRtcEngine().enableAudioSpectrumMonitor(
                this.state.intervalInMS
              )
            }}
          >
            enableAudioSpectrumMonitor
          </Button>
          <Button
            htmlType='button'
            onClick={() => {
              this.getRtcEngine().disableAudioSpectrumMonitor()
            }}
          >
            disableAudioSpectrumMonitor
          </Button>
        </div>
        <JoinChannelBar
          onPressJoin={(channelId: string) => {
            this.getRtcEngine().enableAudio()
            const localUid = getRandomInt(1, 9999999)
            console.log(`localUid: ${localUid}`)
            this.getRtcEngine().joinChannelWithOptions(
              '',
              channelId,
              localUid,
              {
                channelProfile:
                  ChannelProfileType.ChannelProfileLiveBroadcasting,
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
              }
            )
          }}
          onPressLeave={() => {
            this.getRtcEngine().leaveChannel()
          }}
        />
      </div>
    )
  }

  render() {
    const { isJoined, allUser } = this.state
    return (
      <div className={styles.screen}>
        <div className={styles.content}>
          {isJoined && (
            <List
              style={{ width: '100%' }}
              grid={{ gutter: 16, column: 4 }}
              dataSource={allUser}
              renderItem={this.renderItem}
            />
          )}
        </div>
        {this.renderRightBar()}
      </div>
    )
  }
}
