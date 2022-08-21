import React from 'react'
import { Button, Divider } from 'antd'
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  ExternalVideoSourceType,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  VideoBufferType,
  VideoPixelFormat,
} from 'electron-agora-rtc-ng'

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent'
import Config from '../../../config/agora.config'
import DropDownButton from '../../component/DropDownButton'
import { rgbImageBufferToBase64 } from '../../../utils/base64'
import { ScreenCaptureSourceInfo } from '../../../../../../ts/Private/IAgoraRtcEngine'
import screenStyle from '../ScreenShare/ScreenShare.scss'

interface State extends BaseVideoComponentState {
  sources: ScreenCaptureSourceInfo[]
  targetSource?: ScreenCaptureSourceInfo
}

export default class PushVideoFrame
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  // @ts-ignore
  protected engine?: IRtcEngineEx

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
      sources: [],
      targetSource: undefined,
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

    this.engine = createAgoraRtcEngine() as IRtcEngineEx
    this.engine.registerEventHandler(this)
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    })

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo()

    this.setExternalVideoSource()
    this.setState({
      sources: this.engine?.getScreenCaptureSources(
        { width: 1920, height: 1080 },
        { width: 64, height: 64 },
        true
      ),
    })
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
    // this.engine?.joinChannel(token, channelId, '', uid);
    this.engine?.joinChannelWithOptions(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      publishCameraTrack: false,
      publishEncodedVideoTrack: true,
    })
  }

  /**
   * Step 3-1: setExternalVideoSource
   */
  setExternalVideoSource = () => {
    this.engine
      ?.getMediaEngine()
      .setExternalVideoSource(true, false, ExternalVideoSourceType.VideoFrame)
  }

  /**
   * Step 3-2: pushVideoFrame
   */
  pushVideoFrame = () => {
    const { targetSource } = this.state
    if (!targetSource) {
      console.error('targetSource is invalid')
      return
    }

    this.engine?.getMediaEngine().pushVideoFrame({
      type: VideoBufferType.VideoBufferRawData,
      format: VideoPixelFormat.VideoPixelRgba,
      buffer: targetSource.thumbImage.buffer,
      stride: targetSource.thumbImage.width,
      height: targetSource.thumbImage.height,
    })
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
    this.engine?.unregisterEventHandler(this)
    this.engine?.release()
  }

  protected renderRight(): React.ReactNode {
    const { sources, joinChannelSuccess } = this.state
    return (
      <>
        <DropDownButton
          title='Sources'
          options={sources.map((value) => {
            return {
              dropId: value,
              dropText: value.sourceName,
            }
          })}
          PopContentTitle='Preview'
          PopContent={(item: ScreenCaptureSourceInfo) => {
            return (
              <img
                src={rgbImageBufferToBase64(item.thumbImage)}
                className={screenStyle.previewShotBig}
                alt={'Preview'}
              />
            )
          }}
          onPress={({ dropId }) => {
            this.setState({ targetSource: dropId })
          }}
        />
        <Divider />
        <Button
          htmlType={'button'}
          disabled={!joinChannelSuccess}
          onClick={this.pushVideoFrame.bind(this)}
        >
          push Video Frame
        </Button>
      </>
    )
  }
}
