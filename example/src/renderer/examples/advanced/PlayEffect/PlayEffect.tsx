import React from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'electron-agora-rtc-ng';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config';
import { getResourcePath } from '../../../utils';
import { Button, Divider, Input, Switch } from 'antd';
import SliderBar from '../../component/SliderBar';

interface State extends BaseAudioComponentState {
  soundId: number;
  filePath: string;
  loopCount: number;
  pitch: number;
  pan: number;
  gain: number;
  publish: boolean;
  startPos: number;
  playEffect: boolean;
  pauseEffect: boolean;
}

export default class PlayEffect
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
      soundId: 0,
      filePath: getResourcePath('audioeffect.mp3'),
      loopCount: 1,
      pitch: 1.0,
      pan: 0,
      gain: 100,
      publish: false,
      startPos: 0,
      playEffect: false,
      pauseEffect: false,
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

    // Only need to enable audio on this case
    this.engine.enableAudio();
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
    this.engine?.joinChannelWithOptions(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1: playEffect
   */
  playEffect = async () => {
    const {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos,
    } = this.state;
    if (!filePath) {
      console.error('filePath is invalid');
      return;
    }
    if (startPos < 0) {
      console.error('startPos is invalid');
      return;
    }

    this.engine?.playEffect(
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos
    );
    this.setState({ playEffect: true, pauseEffect: false });
  };

  /**
   * Step 3-2 (Optional): pauseEffect
   */
  pauseEffect = () => {
    const { soundId } = this.state;
    this.engine?.pauseEffect(soundId);
    this.setState({ pauseEffect: true });
  };

  /**
   * Step 3-3 (Optional): resumeEffect
   */
  resumeEffect = () => {
    const { soundId } = this.state;
    this.engine?.resumeEffect(soundId);
    this.setState({ pauseEffect: false });
  };

  /**
   * Step 3-4: stopEffect
   */
  stopEffect = () => {
    const { soundId } = this.state;
    this.engine?.stopEffect(soundId);
    this.setState({ playEffect: false });
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
    this.engine?.release();
  }

  onAudioEffectFinished(soundId: number) {
    this.info('onAudioEffectFinished', 'soundId', soundId);
    this.setState({ playEffect: false });
  }

  protected renderRight(): React.ReactNode {
    const {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos,
      playEffect,
      pauseEffect,
    } = this.state;
    return (
      <>
        <Input
          onChange={({ target: { value: text } }) => {
            if (isNaN(+text)) return;
            this.setState({ soundId: +text });
          }}
          placeholder={`soundId (defaults: ${soundId})`}
          defaultValue={
            soundId === this.createState().soundId ? '' : soundId.toString()
          }
          allowClear
          size="small"
        />
        <Divider />
        <Input
          onChange={({ target: { value: text } }) => {
            if (isNaN(+text)) return;
            this.setState({ loopCount: +text });
          }}
          placeholder={`loopCount (defaults: ${loopCount})`}
          defaultValue={
            loopCount === this.createState().loopCount
              ? ''
              : loopCount.toString()
          }
          allowClear
          size="small"
        />
        <Divider />
        <SliderBar
          title={'pitch'}
          min={0.5}
          max={2.0}
          step={0.01}
          onChange={(value) => {
            this.setState({
              pitch: value,
            });
          }}
        />
        <Divider />
        <SliderBar
          title={'pan'}
          min={-1.0}
          max={1.0}
          step={0.01}
          onChange={(value) => {
            this.setState({
              pan: value,
            });
          }}
        />
        <Divider />
        <SliderBar
          title={'gain'}
          min={0.0}
          max={100.0}
          step={0.01}
          onChange={(value) => {
            this.setState({
              gain: value,
            });
          }}
        />
        <Divider />
        <Switch
          checkedChildren="publish"
          unCheckedChildren="publish"
          defaultChecked={publish}
          onChange={(value) => {
            this.setState({ publish: value });
          }}
        />
        <Divider />
        <Input
          onChange={({ target: { value: text } }) => {
            if (isNaN(+text)) return;
            this.setState({ startPos: +text });
          }}
          placeholder={`startPos (defaults: ${startPos})`}
          defaultValue={
            startPos === this.createState().startPos ? '' : startPos.toString()
          }
          allowClear
          size="small"
        />
        <Divider />
        <Button
          htmlType={'button'}
          onClick={(playEffect ? this.stopEffect : this.playEffect).bind(this)}
        >
          {playEffect ? 'stop' : 'play'} Effect
        </Button>
        <Divider />
        <Button
          htmlType={'button'}
          disabled={!playEffect}
          onClick={(pauseEffect ? this.resumeEffect : this.pauseEffect).bind(
            this
          )}
        >
          {pauseEffect ? 'resume' : 'pause'} Effect
        </Button>
      </>
    );
  }
}
