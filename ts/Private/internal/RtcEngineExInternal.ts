import { CallBackModule, Channel } from '../../Types';
import { AgoraEnv, logDebug, logError, logWarn } from '../../Utils';
import {
  AudioEncodedFrameObserverConfig,
  AudioRecordingConfiguration,
  ClientRoleOptions,
  ClientRoleType,
  DataStreamConfig,
  ErrorCodeType,
  IAudioEncodedFrameObserver,
  SimulcastStreamConfig,
  VideoCanvas,
  VideoMirrorModeType,
  VideoSourceType,
  WatermarkOptions,
} from '../AgoraBase';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';
import { IMediaEngine } from '../IAgoraMediaEngine';
import { IMediaPlayer } from '../IAgoraMediaPlayer';
import { IMediaRecorder } from '../IAgoraMediaRecorder';
import {
  ChannelMediaOptions,
  DirectCdnStreamingMediaOptions,
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngineEventHandler,
  IVideoDeviceManager,
  LeaveChannelOptions,
  Metadata,
  MetadataType,
  RtcEngineContext,
  SDKBuildInfo,
  Size,
} from '../IAgoraRtcEngine';
import { RtcConnection } from '../IAgoraRtcEngineEx';
import { IAudioDeviceManager } from '../IAudioDeviceManager';
import { IRtcEngineExImpl } from '../impl/IAgoraRtcEngineExImpl';
import { IVideoDeviceManagerImpl } from '../impl/IAgoraRtcEngineImpl';
import { AudioDeviceManagerInternal } from './AudioDeviceManagerInternal';
import {
  callIrisApi,
  getBridge,
  handlerMPKEvent,
  handlerObserverEvent,
  handlerRTCEvent,
} from './IrisApiEngine';
import { MediaEngineInternal } from './MediaEngineInternal';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { MediaRecorderInternal } from './MediaRecorderInternal';
import { ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio';
import { LocalSpatialAudioEngineInternal } from './LocalSpatialAudioEngineInternal';

export class RtcEngineExInternal extends IRtcEngineExImpl {
  private readonly eventKey: string;

  constructor() {
    super();
    if (AgoraEnv.isInitializeEngine) {
      logError('initialize: already initialize rtcEngine');
    }

    logDebug('AgoraRtcEngine constructor()');
    this.eventKey = 'call_back_with_buffer';
  }

  initialize(context: RtcEngineContext): number {
    if (AgoraEnv.isInitializeEngine) {
      logWarn('initialize: already initialize rtcEngine');
      return -1;
    }
    AgoraEnv.isInitializeEngine = true;
    const bridge = getBridge();
    bridge.InitializeEnv();
    bridge.OnEvent(CallBackModule.RTC, this.eventKey, handlerRTCEvent);
    bridge.OnEvent(CallBackModule.MPK, this.eventKey, handlerMPKEvent);
    bridge.OnEvent(
      CallBackModule.OBSERVER,
      this.eventKey,
      handlerObserverEvent
    );
    AgoraEnv.AgoraRendererManager?.enableRender();
    const ret = super.initialize(context);
    callIrisApi.call(this, 'RtcEngine_setAppType', {
      appType: 3,
    });
    return ret;
  }

  release(sync = false): void {
    if (!AgoraEnv.isInitializeEngine) {
      logWarn('release: rtcEngine have not initialize');
      return;
    }
    AgoraEnv.AgoraRendererManager?.enableRender(false);
    AgoraEnv.isInitializeEngine = false;
    super.release(sync);
    getBridge().ReleaseEnv();
  }

  getVersion(): SDKBuildInfo {
    const apiType = 'RtcEngine_getVersion';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return {
      build: jsonResults.build,
      version: jsonResults.result,
    };
  }

  registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    const res = AgoraEnv.rtcEventHandlers.filter(
      (value) => value === eventHandler
    );
    if (res && res.length == 0) {
      AgoraEnv.rtcEventHandlers.push(eventHandler);
    }
    return true;
  }

  unregisterEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    AgoraEnv.rtcEventHandlers = AgoraEnv.rtcEventHandlers.filter(
      (value) => value !== eventHandler
    );
    return super.unregisterEventHandler(eventHandler);
  }

  createMediaPlayer(): IMediaPlayer {
    if (!AgoraEnv.isInitializeEngine) {
      logError('createMediaPlayer: rtcEngine have not initialize');
    }
    // @ts-ignore
    const mediaPlayerId = super.createMediaPlayer() as number;
    return new MediaPlayerInternal(mediaPlayerId);
  }

  destroyMediaPlayer(mediaPlayer: IMediaPlayer): number {
    const apiType = 'RtcEngine_destroyMediaPlayer';
    const jsonParams = {
      playerId: mediaPlayer.getMediaPlayerId(),
    };
    AgoraEnv.mpkEventHandlers = AgoraEnv.mpkEventHandlers.filter(
      (obj) => obj.mpk !== mediaPlayer
    );
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number {
    const result = AgoraEnv.cdnEventHandlers.filter(
      (handler) => handler === eventHandler
    );
    if (result.length === 0) {
      AgoraEnv.cdnEventHandlers.push(eventHandler);
    }
    return super.startDirectCdnStreaming(eventHandler, publishUrl, options);
  }

  registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    const res = AgoraEnv.metadataObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.metadataObservers.push(observer);
    }
    return super.registerMediaMetadataObserver(observer, type);
  }

  unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    AgoraEnv.metadataObservers = AgoraEnv.metadataObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterMediaMetadataObserver(observer, type);
  }

  protected getApiTypeFromJoinChannelWithOptions(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): string {
    return 'RtcEngine_joinChannel2';
  }

  protected getApiTypeFromLeaveChannel(options?: LeaveChannelOptions): string {
    return options === undefined
      ? 'RtcEngine_leaveChannel'
      : 'RtcEngine_leaveChannel2';
  }

  protected getApiTypeFromSetClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_setClientRole'
      : 'RtcEngine_setClientRole2';
  }

  protected getApiTypeFromStartEchoTest(
    intervalInSeconds: number = 10
  ): string {
    return 'RtcEngine_startEchoTest2';
  }

  protected getApiTypeFromStartPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_startPreview2';
  }

  protected getApiTypeFromStopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_stopPreview2';
  }

  protected getApiTypeFromStartAudioRecording(
    config: AudioRecordingConfiguration
  ): string {
    return 'RtcEngine_startAudioRecording3';
  }

  protected getApiTypeFromStartAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number = 0
  ): string {
    return 'RtcEngine_startAudioMixing2';
  }

  protected getApiTypeFromEnableDualStreamMode(
    enabled: boolean,
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_enableDualStreamMode2'
      : 'RtcEngine_enableDualStreamMode3';
  }

  protected getApiTypeFromCreateDataStream(config: DataStreamConfig): string {
    return 'RtcEngine_createDataStream2';
  }

  protected getApiTypeFromAddVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): string {
    return 'RtcEngine_addVideoWatermark2';
  }

  protected getApiTypeFromJoinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_joinChannelWithUserAccount'
      : 'RtcEngine_joinChannelWithUserAccount2';
  }

  protected getApiTypeFromCreateDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_createDataStreamEx2';
  }

  getAudioDeviceManager(): IAudioDeviceManager {
    return new AudioDeviceManagerInternal();
  }

  getVideoDeviceManager(): IVideoDeviceManager {
    return new IVideoDeviceManagerImpl();
  }

  getMediaEngine(): IMediaEngine {
    return new MediaEngineInternal();
  }

  getMediaRecorder(): IMediaRecorder {
    return new MediaRecorderInternal();
  }

  getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine {
    return new LocalSpatialAudioEngineInternal();
  }

  registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number {
    const res = AgoraEnv.rtcAudioEncodedFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.rtcAudioEncodedFrameObservers.push(observer);
    }
    return super.registerAudioEncodedFrameObserver(config, observer);
  }

  unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number {
    AgoraEnv.rtcAudioEncodedFrameObservers =
      AgoraEnv.rtcAudioEncodedFrameObservers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioEncodedFrameObserver(observer);
  }

  registerAudioSpectrumObserver(observer: IAudioSpectrumObserver): number {
    const res = AgoraEnv.rtcAudioSpectrumObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.rtcAudioSpectrumObservers.push(observer);
    }
    return super.registerAudioSpectrumObserver(observer);
  }

  unregisterAudioSpectrumObserver(observer: IAudioSpectrumObserver): number {
    AgoraEnv.rtcAudioSpectrumObservers =
      AgoraEnv.rtcAudioSpectrumObservers.filter((value) => value !== observer);
    return super.unregisterAudioSpectrumObserver(observer);
  }

  stopDirectCdnStreaming(): number {
    AgoraEnv.cdnEventHandlers = [];
    return super.stopDirectCdnStreaming();
  }

  getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): any[] {
    const apiType = 'RtcEngine_getScreenCaptureSources';
    const jsonParams = {
      thumbSize,
      iconSize,
      includeScreen,
      toJSON: () => {
        return {
          thumbSize,
          iconSize,
          includeScreen,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);

    jsonResults.result.forEach(function (element: any) {
      if (element.thumbImage.buffer == 0) {
        element.thumbImage.buffer = null;
      } else {
        element.thumbImage.buffer = getBridge().GetBuffer(
          element.thumbImage.buffer,
          element.thumbImage.length
        );
      }

      if (element.iconImage.buffer == 0) {
        element.iconImage.buffer = null;
      } else {
        element.iconImage.buffer = getBridge().GetBuffer(
          element.iconImage.buffer,
          element.iconImage.length
        );
      }
    });

    logDebug('getScreenCaptureSource ===== ', jsonResults.result);
    return jsonResults.result;
  }

  setupLocalVideo(canvas: VideoCanvas): number {
    const {
      sourceType = VideoSourceType.VideoSourceCamera,
      uid,
      view,
      renderMode,
      mirrorMode,
    } = canvas;
    AgoraEnv.AgoraRendererManager?.setupLocalVideo({
      videoSourceType: sourceType,
      channelId: '',
      uid,
      view,
      rendererOptions: {
        contentMode: renderMode,
        mirror: mirrorMode === VideoMirrorModeType.VideoMirrorModeEnabled,
      },
    });
    return 0;
  }

  setupRemoteVideo(canvas: VideoCanvas): number {
    const {
      sourceType = VideoSourceType.VideoSourceRemote,
      uid,
      view,
      renderMode,
      mirrorMode,
    } = canvas;
    AgoraEnv.AgoraRendererManager?.setupRemoteVideo({
      videoSourceType: sourceType,
      channelId: '',
      uid,
      view,
      rendererOptions: {
        contentMode: renderMode,
        mirror: mirrorMode === VideoMirrorModeType.VideoMirrorModeEnabled,
      },
    });
    return 0;
  }

  setupRemoteVideoEx(canvas: VideoCanvas, connection: RtcConnection): number {
    const {
      sourceType = VideoSourceType.VideoSourceRemote,
      uid,
      view,
      renderMode,
      mirrorMode,
    } = canvas;
    const { channelId } = connection;
    AgoraEnv.AgoraRendererManager?.setupRemoteVideo({
      videoSourceType: sourceType,
      channelId,
      uid,
      view,
      rendererOptions: {
        contentMode: renderMode,
        mirror: mirrorMode === VideoMirrorModeType.VideoMirrorModeEnabled,
      },
    });
    return 0;
  }

  sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number {
    const apiType = 'RtcEngine_sendStreamMessage';
    const jsonParams = {
      streamId,
      length,
      toJSON: () => {
        return {
          streamId,
          length,
        };
      },
    };

    if (!data) return ErrorCodeType.ErrInvalidArgument;

    let bufferArray = [data];
    const jsonResults = callIrisApi.call(
      this,
      apiType,
      jsonParams,
      bufferArray,
      bufferArray.length
    );
    return jsonResults.result;
  }

  destroyRendererByView(view: any): void {
    AgoraEnv.AgoraRendererManager?.destroyRendererByView(view);
  }

  destroyRendererByConfig(
    videoSourceType: VideoSourceType,
    channelId?: Channel,
    uid?: number
  ) {
    AgoraEnv.AgoraRendererManager?.destroyRenderersByConfig(
      videoSourceType,
      channelId,
      uid
    );
  }

  sendMetaData(metadata: Metadata, sourceType: VideoSourceType): number {
    const apiType = 'RtcEngine_sendMetaData';
    const jsonParams = {
      metadata,
      source_type: sourceType,
      toJSON: () => {
        return {
          metadata,
          source_type: sourceType,
        };
      },
    };

    if (!metadata.buffer) return ErrorCodeType.ErrInvalidArgument;

    let bufferArray = [metadata.buffer!];
    metadata.buffer = undefined;

    const jsonResults = callIrisApi.call(
      this,
      apiType,
      jsonParams,
      bufferArray,
      bufferArray.length
    );

    return jsonResults.result;
  }
}
