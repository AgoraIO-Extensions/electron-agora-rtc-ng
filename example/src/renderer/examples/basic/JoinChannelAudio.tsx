import { Card, List } from 'antd'
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IAudioDeviceManager,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
} from 'electron-agora-rtc-ng'
import { Component } from 'react'
import DropDownButton from '../component/DropDownButton'
import JoinChannelBar from '../component/JoinChannelBar'
import SliderBar from '../component/SliderBar'
import { AudioProfileList, AudioScenarioList } from '../config'
import config from '../../config/agora.config'
import styles from '../config/public.scss'
import { configMapToOptions, getRandomInt } from '../../utils'

interface User {
  isMyself: boolean
  uid: number
}

interface Device {
  deviceId: string
  deviceName: string
}

interface State {
  audioRecordDevices: Device[]
  audioProfile: number
  audioScenario: number
  allUser: User[]
  isJoined: boolean
}

export default class JoinChannelAudio
  extends Component<State>
  implements IRtcEngineEventHandler
{
  rtcEngine?: IRtcEngineEx

  audioDeviceManager: IAudioDeviceManager

  state: State = {
    audioRecordDevices: [],
    audioProfile: AudioProfileList.Default,
    audioScenario: AudioScenarioList.Default,
    allUser: [],
    isJoined: false,
  }

  componentDidMount() {
    this.getRtcEngine().registerEventHandler(this)

    this.audioDeviceManager = this.getRtcEngine().getAudioDeviceManager()

    this.setState({
      audioRecordDevices:
        this.audioDeviceManager.enumerateRecordingDevices() as any,
    })
  }

  componentWillUnmount() {
    this.getRtcEngine().unregisterEventHandler(this)
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

  setAudioProfile = () => {
    const { audioProfile, audioScenario } = this.state
    this.getRtcEngine().setAudioProfile(audioProfile, audioScenario)
  }

  renderItem = ({ isMyself, uid }) => {
    return (
      <List.Item>
        <Card title={`${isMyself ? 'Local' : 'Remote'} `}>Uid: {uid}</Card>
      </List.Item>
    )
  }

  renderRightBar = () => {
    const { audioRecordDevices: audioDevices } = this.state
    return (
      <div className={styles.rightBar}>
        <div>
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
            options={audioDevices.map((obj) => {
              const { deviceId, deviceName } = obj
              return { dropId: deviceId, dropText: deviceName, ...obj }
            })}
            onPress={(res) => {
              this.audioDeviceManager.setRecordingDevice(res.dropId)
            }}
          />

          <SliderBar
            max={100}
            title='SDK Recording Volume'
            onChange={(value) => {
              this.getRtcEngine().adjustRecordingSignalVolume(value)
            }}
          />
          <SliderBar
            max={100}
            title='Device Playout Volume'
            onChange={(value) => {
              this.getRtcEngine().adjustAudioMixingPlayoutVolume(value)
            }}
          />
          <SliderBar
            max={100}
            title='SDK Playout Volume SDK'
            onChange={(value) => {
              this.getRtcEngine().adjustPlaybackSignalVolume(value)
            }}
          />
        </div>
        <JoinChannelBar
          onPressJoin={(channelId) => {
            const rtcEngine = this.getRtcEngine()
            rtcEngine.enableAudio()
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
