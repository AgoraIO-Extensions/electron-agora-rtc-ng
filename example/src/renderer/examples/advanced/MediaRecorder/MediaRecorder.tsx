import React from 'react';
import os from 'os';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IMediaRecorderObserver,
  IRtcEngineEventHandler,
  MediaRecorderContainerFormat,
  MediaRecorderStreamType,
  RecorderErrorCode,
  RecorderInfo,
  RecorderState,
} from 'electron-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config';
import { Button, Divider, Input } from 'antd';
import DropDownButton from '../../component/DropDownButton';
import { configEnumToOptions } from '../../../utils';
import SliderBar from '../../component/SliderBar';

interface State extends BaseVideoComponentState {
  storagePath: string;
  containerFormat: MediaRecorderContainerFormat;
  streamType: MediaRecorderStreamType;
  maxDurationMs: number;
  recorderInfoUpdateInterval: number;
  startRecoding: boolean;
}

export default class MediaRecorder
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IMediaRecorderObserver
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
      storagePath: os.homedir(),
      containerFormat: MediaRecorderContainerFormat.FormatMp4,
      streamType: MediaRecorderStreamType.StreamTypeBoth,
      maxDurationMs: 120000,
      recorderInfoUpdateInterval: 1000,
      startRecoding: false,
    };
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      console.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // Start preview before joinChannel
    this.engine.startPreview();
    this.setState({ startPreview: true });
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      console.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      console.error('uid is invalid');
      return;
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
    });
  }

  /**
   * Step 3-1: startRecording
   */
  startRecording = () => {
    const {
      channelId,
      uid,
      storagePath,
      containerFormat,
      streamType,
      maxDurationMs,
      recorderInfoUpdateInterval,
    } = this.state;
    this.engine
      ?.getMediaRecorder()
      .setMediaRecorderObserver({ channelId, localUid: uid }, this);
    this.engine?.getMediaRecorder().startRecording(
      { channelId, localUid: uid },
      {
        storagePath: `${storagePath}/${uid}.mp4`,
        containerFormat,
        streamType,
        maxDurationMs,
        recorderInfoUpdateInterval,
      }
    );
  };

  /**
   * Step 3-2: stopRecording
   */
  stopRecording = () => {
    const { channelId, uid } = this.state;
    this.engine?.getMediaRecorder().stopRecording({ channelId, localUid: uid });
  };

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel();
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onRecorderInfoUpdated(info: RecorderInfo) {
    this.info('onRecorderInfoUpdated', 'info', info);
  }

  onRecorderStateChanged(state: RecorderState, error: RecorderErrorCode) {
    this.info('onRecorderStateChanged', 'state', state, 'error', error);
    switch (state) {
      case RecorderState.RecorderStateStart:
        this.setState({ startRecoding: true });
        break;
      case RecorderState.RecorderStateError:
      case RecorderState.RecorderStateStop:
        this.setState({ startRecoding: false });
        break;
    }
  }

  protected renderRight(): React.ReactNode {
    const {
      storagePath,
      containerFormat,
      streamType,
      maxDurationMs,
      recorderInfoUpdateInterval,
      joinChannelSuccess,
      startRecoding,
    } = this.state;
    return (
      <>
        <Input
          onChange={({ target: { value: text } }) => {
            this.setState({ storagePath: text });
          }}
          placeholder={'storagePath'}
          defaultValue={storagePath}
          allowClear
          size="small"
        />
        <Divider />
        <DropDownButton
          title={'containerFormat'}
          options={configEnumToOptions(MediaRecorderContainerFormat)}
          onPress={(res) => this.setState({ containerFormat: res.dropId })}
        />
        <Divider />
        <DropDownButton
          title={'streamType'}
          options={configEnumToOptions(MediaRecorderStreamType)}
          onPress={(res) => this.setState({ streamType: res.dropId })}
        />
        <Divider />
        <Input
          onChange={({ target: { value: text } }) => {
            if (isNaN(+text)) return;
            this.setState({ maxDurationMs: +text });
          }}
          placeholder={`maxDurationMs (defaults: ${maxDurationMs})`}
          defaultValue={
            maxDurationMs === this.createState().maxDurationMs
              ? ''
              : maxDurationMs.toString()
          }
          allowClear
          size="small"
        />
        <Divider />
        <SliderBar
          title={'recorderInfoUpdateInterval'}
          min={1000}
          max={10000}
          step={1}
          value={recorderInfoUpdateInterval}
          onChange={(value) => {
            this.setState({
              recorderInfoUpdateInterval: value,
            });
          }}
        />
        <Divider />
        <Button
          htmlType={'button'}
          disabled={!joinChannelSuccess}
          onClick={(startRecoding
            ? this.stopRecording
            : this.startRecording
          ).bind(this)}
        >
          {startRecoding ? 'stop' : 'start'} Recording
        </Button>
      </>
    );
  }
}
