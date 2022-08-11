import React from 'react'
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LighteningContrastLevel,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
} from 'electron-agora-rtc-ng'
import { Button, Divider } from 'antd'

import Config from '../../config/agora.config'
import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent'
import DropDownButton from '../../component/DropDownButton'
import { configEnumToOptions } from '../../util'
import SliderBar from '../../component/SliderBar'

interface State extends BaseVideoComponentState {
  lighteningContrastLevel: LighteningContrastLevel
  lighteningLevel: number
  smoothnessLevel: number
  rednessLevel: number
  sharpnessLevel: number
  enableBeautyEffect: boolean
}

export default class BeautyEffect
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: true,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      startPreview: false,
      lighteningContrastLevel: LighteningContrastLevel.LighteningContrastNormal,
      lighteningLevel: 0,
      smoothnessLevel: 0,
      rednessLevel: 0,
      sharpnessLevel: 0,
      enableBeautyEffect: false,
    }
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const { appId } = this.state
    if (!appId) {
      console.error(`appId is invalid`)
    }

    this.engine = createAgoraRtcEngine()
    this.engine.registerEventHandler(this)
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    })

    this.engine?.enableExtension(
      'agora_video_filters_clear_vision',
      'clear_vision',
      true
    )

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo()

    // This case works if startPreview without joinChannel
    this.engine.startPreview()
    this.setState({ startPreview: true })
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, uid } = this.state
    if (!channelId) {
      console.error('channelId is invalid')
      return
    }
    if (uid < 0) {
      console.error('uid is invalid')
      return
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannelWithOptions(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    })
  }

  /**
   * Step 3-1: enableBeautyEffect
   */
  enableBeautyEffect = () => {
    const {
      lighteningContrastLevel,
      lighteningLevel,
      smoothnessLevel,
      rednessLevel,
      sharpnessLevel,
    } = this.state

    this.engine?.setBeautyEffectOptions(true, {
      lighteningContrastLevel,
      lighteningLevel,
      smoothnessLevel,
      rednessLevel,
      sharpnessLevel,
    })
    this.setState({ enableBeautyEffect: true })
  }

  /**
   * Step 3-2: disableBeautyEffect
   */
  disableBeautyEffect = () => {
    this.engine?.setBeautyEffectOptions(false, {})
    this.setState({ enableBeautyEffect: false })
  }

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel()
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.release()
  }

  onError(err: ErrorCodeType, msg: string) {
    console.error('onError', 'err', err, 'msg', msg)
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    console.info(
      'onJoinChannelSuccess',
      'connection',
      connection,
      'elapsed',
      elapsed
    )
    this.setState({ joinChannelSuccess: true })
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    console.info('onLeaveChannel', 'connection', connection, 'stats', stats)
    this.setState(this.createState())
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    console.info(
      'onUserJoined',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'elapsed',
      elapsed
    )
    const { remoteUsers } = this.state
    if (remoteUsers === undefined) return
    this.setState({
      remoteUsers: [...remoteUsers!, remoteUid],
    })
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    console.info(
      'onUserOffline',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'reason',
      reason
    )
    const { remoteUsers } = this.state
    if (remoteUsers === undefined) return
    this.setState({
      remoteUsers: remoteUsers!.filter((value) => value !== remoteUid),
    })
  }

  protected renderRight(): React.ReactNode {
    const { startPreview, joinChannelSuccess, enableBeautyEffect } = this.state
    return (
      <>
        <DropDownButton
          title={'lighteningContrastLevel'}
          options={configEnumToOptions(LighteningContrastLevel)}
          onPress={(res) =>
            this.setState({ lighteningContrastLevel: res.dropId })
          }
        />
        <Divider />
        <SliderBar
          title={'lighteningLevel'}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => {
            this.setState({
              lighteningLevel: value,
            })
          }}
        />
        <Divider />
        <SliderBar
          title={'smoothnessLevel'}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => {
            this.setState({
              smoothnessLevel: value,
            })
          }}
        />
        <Divider />
        <SliderBar
          title={'rednessLevel'}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => {
            this.setState({
              rednessLevel: value,
            })
          }}
        />
        <Divider />
        <SliderBar
          title={'sharpnessLevel'}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => {
            this.setState({
              sharpnessLevel: value,
            })
          }}
        />
        <Divider />
        <Button
          htmlType={'button'}
          disabled={!(startPreview || joinChannelSuccess)}
          onClick={(enableBeautyEffect
            ? this.disableBeautyEffect
            : this.enableBeautyEffect
          ).bind(this)}
        >
          {enableBeautyEffect ? 'disable' : 'enable'} Beauty Effect
        </Button>
      </>
    )
  }
}
