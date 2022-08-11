import { Button, Card, List } from 'antd'
import createAgoraRtcEngine, {
  AudioProfileType,
  AudioScenarioType,
  ChannelProfileType,
  ClientRoleType,
  DegradationPreference,
  ErrorCodeType,
  IAudioDeviceManager,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  IVideoDeviceManager,
  OrientationMode,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
  VideoCodecType,
  VideoMirrorModeType,
  VideoSourceType,
} from 'electron-agora-rtc-ng'
import { Component } from 'react'
import DropDownButton from '../component/DropDownButton'
import JoinChannelBar from '../component/JoinChannelBar'
import Window from '../component/Window'
import { FpsMap, ResolutionMap, RoleTypeMap } from '../config'
import config from '../config/agora.config'
import styles from '../config/public.scss'
import { configMapToOptions, getRandomInt } from '../util'

const localUid1 = getRandomInt(1, 9999999)
const localUid2 = getRandomInt(1, 9999999)

interface Device {
  deviceId: string
  deviceName: string
}

interface User {
  isMyself: boolean
  uid: number
}

interface State {
  isJoined: boolean
  channelId: string
  allUser: User[]
  audioRecordDevices: Device[]
  cameraDevices: Device[]
  currentFps?: number
  currentResolution?: { width: number; height: number }
  firstCameraId: string
  secondCameraId: string
  isPreview: boolean
}

export default class JoinChannelVideo
  extends Component<{}, State, any>
  implements IRtcEngineEventHandler
{
  rtcEngine?: IRtcEngineEx

  videoDeviceManager: IVideoDeviceManager

  audioDeviceManager: IAudioDeviceManager

  state: State = {
    channelId: '',
    allUser: [],
    isJoined: false,
    audioRecordDevices: [],
    cameraDevices: [],
    firstCameraId: '',
    secondCameraId: '',
    currentResolution: ResolutionMap['120x120'],
    currentFps: FpsMap['15fps'],
    isPreview: false,
  }

  users: User[] = []

  componentDidMount() {
    this.getRtcEngine().registerEventHandler(this)
    this.videoDeviceManager = this.getRtcEngine().getVideoDeviceManager()
    this.audioDeviceManager = this.getRtcEngine().getAudioDeviceManager()

    this.setState({
      audioRecordDevices:
        this.audioDeviceManager.enumerateRecordingDevices() as any,
      cameraDevices: this.videoDeviceManager.enumerateVideoDevices() as any,
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
      const res = this.rtcEngine.initialize({ appId: config.appID })
      this.rtcEngine.setLogFile(config.nativeSDKLogPath)
    }

    return this.rtcEngine
  }

  onJoinChannelSuccess(
    { channelId, localUid }: RtcConnection,
    elapsed: number
  ): void {
    const { isPreview } = this.state
    if (isPreview) {
      return
    }
    console.log('onJoinChannelSuccess', channelId, localUid)
    this.users.push({ isMyself: true, uid: localUid })
    this.setState({
      isJoined: true,
      allUser: this.users,
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

    this.users.push({ isMyself: false, uid: remoteUid })
    this.setState({
      allUser: this.users,
    })
  }

  onUserOffline(
    { localUid, channelId }: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void {
    console.log('onUserOffline', channelId, remoteUid)

    this.users = [...this.users.filter((obj) => obj.uid !== remoteUid)]
    this.setState({
      allUser: this.users,
    })
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats): void {
    this.users = []
    this.setState({
      isJoined: false,
      allUser: this.users,
    })
  }

  onError(err: ErrorCodeType, msg: string): void {
    console.error(err, msg)
  }

  onPressJoinChannel = (channelId: string) => {
    this.setState({ channelId })
    this.getRtcEngine().enableVideo()
    const res1 = this.getRtcEngine().joinChannelEx(
      '',
      {
        channelId,
        localUid: localUid1,
      },
      {
        publishCameraTrack: true,
        publishMicrophoneTrack: true,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      }
    )
    console.log(`localUid1: ${localUid1} joinChannel2: ${res1}`)
  }

  setVideoConfig = () => {
    const { currentFps, currentResolution } = this.state
    if (!currentResolution || !currentFps) {
      return
    }

    this.getRtcEngine().setVideoEncoderConfiguration({
      codecType: VideoCodecType.VideoCodecH264,
      dimensions: currentResolution!,
      frameRate: currentFps,
      bitrate: 65,
      minBitrate: 1,
      orientationMode: OrientationMode.OrientationModeAdaptive,
      degradationPreference: DegradationPreference.MaintainBalanced,
      mirrorMode: VideoMirrorModeType.VideoMirrorModeAuto,
    })
  }

  onPressPreview = () => {
    const { isPreview } = this.state
    if (isPreview) {
      return
    }
    this.users.push({ isMyself: true, uid: localUid1 })
    this.setState({
      isPreview: true,
      allUser: this.users,
    })
  }

  renderRightBar = () => {
    const { audioRecordDevices, cameraDevices, isJoined } = this.state

    return (
      <div className={styles.rightBar}>
        <div>
          <DropDownButton
            options={cameraDevices.map((obj) => {
              const { deviceId, deviceName } = obj
              return { dropId: deviceId, dropText: deviceName, ...obj }
            })}
            onPress={(res) => {
              const { currentFps, currentResolution } = this.state
              const deviceId = res.dropId
              this.getRtcEngine().stopPrimaryCameraCapture()
              const start1Res = this.getRtcEngine().startPrimaryCameraCapture({
                deviceId,
                format: {
                  width: currentResolution.width,
                  height: currentResolution.height,
                  fps: currentFps,
                },
              })

              this.setState({ firstCameraId: deviceId })
            }}
            title='First Camera'
          />
          {/* <DropDownButton
            options={cameraDevices.map((obj) => {
              const { deviceId, deviceName } = obj
              return { dropId: deviceId, dropText: deviceName, ...obj }
            })}
            onPress={(res) => {
              const deviceId = res.dropId
              this.setState({ firstCameraId: deviceId })
            }}
            title='Second Camera'
          /> */}
          <DropDownButton
            title='Microphone'
            options={audioRecordDevices.map((obj) => {
              const { deviceId, deviceName } = obj
              return { dropId: deviceId, dropText: deviceName, ...obj }
            })}
            onPress={(res) => {
              this.audioDeviceManager.setRecordingDevice(res.dropId)
            }}
          />
          <DropDownButton
            title='Role'
            options={configMapToOptions(RoleTypeMap)}
            onPress={(res) => {
              this.getRtcEngine().setClientRole(res.dropId)
            }}
          />
          <DropDownButton
            title='Resolution'
            options={configMapToOptions(ResolutionMap)}
            onPress={(res) => {
              this.setState(
                { currentResolution: res.dropId },
                this.setVideoConfig
              )
            }}
          />
          <DropDownButton
            title='FPS'
            options={configMapToOptions(FpsMap)}
            onPress={(res) => {
              this.setState({ currentFps: res.dropId }, this.setVideoConfig)
            }}
          />
          {!isJoined && (
            <Button onClick={this.onPressPreview}>Start Preview</Button>
          )}
        </div>
        <JoinChannelBar
          onPressJoin={this.onPressJoinChannel}
          onPressLeave={() => {
            this.setState({ isPreview: false })
            this.getRtcEngine().leaveChannel()
          }}
        />
      </div>
    )
  }

  renderItem = ({ isMyself, uid }: User) => {
    const { channelId } = this.state
    let videoSourceType = VideoSourceType.VideoSourceRemote
    if (isMyself) {
      videoSourceType =
        uid === localUid1
          ? VideoSourceType.VideoSourceCameraPrimary
          : VideoSourceType.VideoSourceCameraSecondary
    }
    return (
      <List.Item>
        <Card title={`${isMyself ? 'Local' : 'Remote'} Uid: ${uid}`}>
          <p>Click view to mirror</p>
          <Window
            uid={uid}
            rtcEngine={this.rtcEngine!}
            videoSourceType={videoSourceType}
            channelId={channelId}
          />
          <Button
            onClick={() => {
              this.users.push({ isMyself, uid })
              this.setState({
                allUser: this.users,
              })
            }}
          >
            Append
          </Button>
        </Card>
      </List.Item>
    )
  }

  render() {
    const { isJoined, allUser, isPreview } = this.state
    return (
      <div className={styles.screen}>
        <div className={styles.content}>
          {(isJoined || isPreview) && (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 2,
              }}
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
