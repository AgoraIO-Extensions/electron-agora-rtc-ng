import React from 'react'
import {
  AudioMixingReasonType,
  AudioMixingStateType,
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'electron-agora-rtc-ng'
import { Button, Input, Divider, Switch } from 'antd'

import Config from '../../config/agora.config'
import {
  BaseComponent,
  BaseAudioComponentState,
} from '../../../components/BaseComponent'
import { getResourcePath } from '../../util'

interface State extends BaseAudioComponentState {
  filePath: string
  loopback: boolean
  cycle: number
  startPos: number
  startAudioMixing: boolean
  pauseAudioMixing: boolean
}

export default class AudioMixing
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: false,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      filePath: getResourcePath('audioeffect.mp3'),
      loopback: false,
      cycle: -1,
      startPos: 0,
      startAudioMixing: false,
      pauseAudioMixing: false,
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

    // Only need to enable audio on this case
    this.engine.enableAudio()
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
   * Step 3-1: startAudioMixing
   */
  startAudioMixing = () => {
    const { filePath, loopback, cycle, startPos } = this.state
    if (!filePath) {
      console.error('filePath is invalid')
      return
    }
    if (cycle < -1) {
      console.error('cycle is invalid')
      return
    }
    if (startPos < 0) {
      console.error('startPos is invalid')
      return
    }

    this.engine?.startAudioMixing(filePath, loopback, cycle, startPos)
  }

  /**
   * Step 3-2 (Optional): pauseAudioMixing
   */
  pauseAudioMixing = () => {
    this.engine?.pauseAudioMixing()
  }

  /**
   * Step 3-3 (Optional): resumeAudioMixing
   */
  resumeAudioMixing = () => {
    this.engine?.resumeAudioMixing()
  }

  /**
   * Step 3-4 (Optional): getAudioMixingCurrentPosition
   */
  getAudioMixingCurrentPosition = () => {
    const position = this.engine?.getAudioMixingCurrentPosition()
    const duration = this.engine?.getAudioMixingDuration()
    this.debug(
      'getAudioMixingCurrentPosition',
      'position',
      position,
      'duration',
      duration
    )
  }

  /**
   * Step 3-5: stopAudioMixing
   */
  stopAudioMixing = () => {
    this.engine?.stopAudioMixing()
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

  onAudioMixingStateChanged(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ) {
    this.info('onAudioMixingStateChanged', 'state', state, 'reason', reason)
    switch (state) {
      case AudioMixingStateType.AudioMixingStatePlaying:
        this.setState({ startAudioMixing: true, pauseAudioMixing: false })
        break
      case AudioMixingStateType.AudioMixingStatePaused:
        this.setState({ pauseAudioMixing: true })
        break
      case AudioMixingStateType.AudioMixingStateStopped:
      case AudioMixingStateType.AudioMixingStateFailed:
        this.setState({ startAudioMixing: false })
        break
    }
  }

  onAudioMixingFinished() {
    this.info('AudioMixingFinished')
  }

  protected renderRight(): React.ReactNode {
    const {
      filePath,
      loopback,
      cycle,
      startPos,
      startAudioMixing,
      pauseAudioMixing,
    } = this.state
    return (
      <>
        <Input
          onChange={({ target: { value: text } }) => {
            this.setState({ filePath: text })
          }}
          placeholder={'filePath'}
          defaultValue={filePath}
          allowClear
          size='small'
        />
        <Divider />
        <Switch
          checkedChildren='loopback'
          unCheckedChildren='loopback'
          defaultChecked={loopback}
          onChange={(value) => {
            this.setState({ loopback: value })
          }}
        />
        <Divider />
        <Input
          onChange={({ target: { value: text } }) => {
            if (isNaN(+text)) return
            this.setState({ cycle: +text })
          }}
          placeholder={`cycle (defaults: ${cycle})`}
          defaultValue={
            cycle === this.createState().cycle ? '' : cycle.toString()
          }
          allowClear
          size='small'
        />
        <Divider />
        <Input
          onChange={({ target: { value: text } }) => {
            if (isNaN(+text)) return
            this.setState({ startPos: +text })
          }}
          placeholder={`startPos (defaults: ${startPos})`}
          defaultValue={
            startPos === this.createState().startPos ? '' : startPos.toString()
          }
          allowClear
          size='small'
        />
        <Divider />
        <Button
          htmlType={'button'}
          onClick={(startAudioMixing
            ? this.stopAudioMixing
            : this.startAudioMixing
          ).bind(this)}
        >
          {startAudioMixing ? 'stop' : 'start'} Audio Mixing
        </Button>
        <Divider />
        <Button
          htmlType={'button'}
          disabled={!startAudioMixing}
          onClick={(pauseAudioMixing
            ? this.resumeAudioMixing
            : this.pauseAudioMixing
          ).bind(this)}
        >
          {pauseAudioMixing ? 'resume' : 'pause'} Audio Mixing
        </Button>
        <Divider />
        <Button
          htmlType={'button'}
          disabled={!startAudioMixing}
          onClick={this.getAudioMixingCurrentPosition.bind(this)}
        >
          get Audio Mixing Current Position
        </Button>
      </>
    )
  }
}
