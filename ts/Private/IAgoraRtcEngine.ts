import './extension/IAgoraRtcEngineExtension';
import {
  QualityAdaptIndication,
  VideoCodecType,
  CaptureBrightnessLevelType,
  VideoStreamType,
  AudioSampleRateType,
  VideoFormat,
  Rectangle,
  ScreenCaptureParameters,
  VideoMirrorModeType,
  ClientRoleType,
  AudienceLatencyLevelType,
  ChannelProfileType,
  ErrorCodeType,
  QualityType,
  LastmileProbeResult,
  AudioVolumeInfo,
  RtcStats,
  UplinkNetworkInfo,
  DownlinkNetworkInfo,
  VideoSourceType,
  LocalVideoStreamState,
  LocalVideoStreamError,
  RemoteVideoState,
  RemoteVideoStateReason,
  UserOfflineReasonType,
  LocalAudioStats,
  RemoteAudioStats,
  LocalAudioStreamState,
  LocalAudioStreamError,
  RemoteAudioState,
  RemoteAudioStateReason,
  ClientRoleChangeFailedReason,
  RtmpStreamPublishState,
  RtmpStreamPublishErrorType,
  RtmpStreamingEvent,
  ChannelMediaRelayState,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ConnectionStateType,
  ConnectionChangedReasonType,
  WlaccMessageReason,
  WlaccSuggestAction,
  WlAccStats,
  NetworkType,
  EncryptionErrorType,
  PermissionType,
  UserInfo,
  UploadErrorReason,
  StreamSubscribeState,
  StreamPublishState,
  AudioScenarioType,
  ThreadPriorityType,
  LastmileProbeConfig,
  VideoEncoderConfiguration,
  BeautyOptions,
  LowlightEnhanceOptions,
  VideoDenoiserOptions,
  ColorEnhanceOptions,
  VirtualBackgroundSource,
  SegmentationProperty,
  VideoCanvas,
  VideoSubscriptionOptions,
  AudioEncodedFrameObserverConfig,
  IAudioEncodedFrameObserver,
  SpatialAudioParams,
  VoiceBeautifierPreset,
  AudioEffectPreset,
  VoiceConversionPreset,
  EarMonitoringFilterType,
  SenderOptions,
  AudioSessionOperationRestriction,
  DeviceInfo,
  VideoContentHint,
  ScreenScenarioType,
  ScreenCaptureParameters2,
  LiveTranscoding,
  LocalTranscoderConfiguration,
  VideoOrientation,
  EncryptionConfig,
  ChannelMediaRelayConfiguration,
  AudioProfileType,
  ClientRoleOptions,
  AudioRecordingConfiguration,
  SimulcastStreamConfig,
  DataStreamConfig,
  WatermarkOptions,
} from './AgoraBase';
import {
  RenderModeType,
  ContentInspectResult,
  MediaSourceType,
  RawAudioFrameOpModeType,
  IAudioSpectrumObserver,
  ContentInspectConfig,
} from './AgoraMediaBase';
import { RtcConnection } from './IAgoraRtcEngineEx';
import {
  RhythmPlayerStateType,
  RhythmPlayerErrorType,
  AgoraRhythmPlayerConfig,
} from './IAgoraRhythmPlayer';
import { LogConfig, LogFilterType, LogLevel } from './IAgoraLog';
import { IMediaPlayer } from './IAgoraMediaPlayer';
import { AudioMixingDualMonoMode, IMediaEngine } from './IAgoraMediaEngine';
import { IAudioDeviceManager } from './IAudioDeviceManager';
import { IMediaRecorder } from './IAgoraMediaRecorder';
import { ILocalSpatialAudioEngine } from './IAgoraSpatialAudio';
/**
 * Media device types.
 */
export enum MediaDeviceType {
  /**
   * -1: Unknown device type.
   */
  UnknownAudioDevice = -1,
  /**
   * 0: Audio playback device.
   */
  AudioPlayoutDevice = 0,
  /**
   * 1: Audio capturing device.
   */
  AudioRecordingDevice = 1,
  /**
   * 2: Video renderer.
   */
  VideoRenderDevice = 2,
  /**
   * 3: Video capturer.
   */
  VideoCaptureDevice = 3,
  /**
   * @ignore
   */
  AudioApplicationPlayoutDevice = 4,
}

/**
 * The playback state of the music file.
 */
export enum AudioMixingStateType {
  /**
   * 710: The music file is playing.
   */
  AudioMixingStatePlaying = 710,
  /**
   * 711: The music file pauses playing.
   */
  AudioMixingStatePaused = 711,
  /**
   * 713: The music file stops playing.
   */
  AudioMixingStateStopped = 713,
  /**
   * 714: An error occurs during the playback of the audio mixing file.
   */
  AudioMixingStateFailed = 714,
}

/**
 * @ignore
 */
export enum AudioMixingReasonType {
  /**
   * @ignore
   */
  AudioMixingReasonCanNotOpen = 701,
  /**
   * @ignore
   */
  AudioMixingReasonTooFrequentCall = 702,
  /**
   * @ignore
   */
  AudioMixingReasonInterruptedEof = 703,
  /**
   * @ignore
   */
  AudioMixingReasonOneLoopCompleted = 721,
  /**
   * @ignore
   */
  AudioMixingReasonAllLoopsCompleted = 723,
  /**
   * @ignore
   */
  AudioMixingReasonStoppedByUser = 724,
  /**
   * @ignore
   */
  AudioMixingReasonOk = 0,
}

/**
 * States of importing an external video stream in the interactive live streaming.
 */
export enum InjectStreamStatus {
  /**
   * 0: The external video stream is imported successfully.
   */
  InjectStreamStatusStartSuccess = 0,
  /**
   * 1: The external video stream already exists.
   */
  InjectStreamStatusStartAlreadyExists = 1,
  /**
   * 2: The external video stream to be imported is unauthorized.
   */
  InjectStreamStatusStartUnauthorized = 2,
  /**
   * 3: A timeout occurs when importing the external video stream.
   */
  InjectStreamStatusStartTimedout = 3,
  /**
   * 4: The SDK fails to import the external video stream.
   */
  InjectStreamStatusStartFailed = 4,
  /**
   * 5: The SDK successfully stops importing the external video stream.
   */
  InjectStreamStatusStopSuccess = 5,
  /**
   * 6: The external video stream to be stopped importing is not found.
   */
  InjectStreamStatusStopNotFound = 6,
  /**
   * 7: The external video stream to be stopped importing is unauthorized.
   */
  InjectStreamStatusStopUnauthorized = 7,
  /**
   * 8: A timeout occurs when stopping importing the external video stream.
   */
  InjectStreamStatusStopTimedout = 8,
  /**
   * 9: The SDK fails to stop importing the external video stream.
   */
  InjectStreamStatusStopFailed = 9,
  /**
   * 10: The external video stream is corrupted.
   */
  InjectStreamStatusBroken = 10,
}

/**
 * The midrange frequency for audio equalization.
 */
export enum AudioEqualizationBandFrequency {
  /**
   * 0: 31 Hz
   */
  AudioEqualizationBand31 = 0,
  /**
   * 1: 62 Hz
   */
  AudioEqualizationBand62 = 1,
  /**
   * 2: 125 Hz
   */
  AudioEqualizationBand125 = 2,
  /**
   * 3: 250 Hz
   */
  AudioEqualizationBand250 = 3,
  /**
   * 4: 500 Hz
   */
  AudioEqualizationBand500 = 4,
  /**
   * 5: 1 kHz
   */
  AudioEqualizationBand1k = 5,
  /**
   * 6: 2 kHz
   */
  AudioEqualizationBand2k = 6,
  /**
   * 7: 4 kHz
   */
  AudioEqualizationBand4k = 7,
  /**
   * 8: 8 kHz
   */
  AudioEqualizationBand8k = 8,
  /**
   * 9: 16 kHz
   */
  AudioEqualizationBand16k = 9,
}

/**
 * Audio reverberation types.
 */
export enum AudioReverbType {
  /**
   * 0: The level of the dry signal (dB). The value is between -20 and 10.
   */
  AudioReverbDryLevel = 0,
  /**
   * 1: The level of the early reflection signal (wet signal) (dB). The value is between -20 and 10.
   */
  AudioReverbWetLevel = 1,
  /**
   * 2: The room size of the reflection. The value is between 0 and 100.
   */
  AudioReverbRoomSize = 2,
  /**
   * 3: The length of the initial delay of the wet signal (ms). The value is between 0 and 200.
   */
  AudioReverbWetDelay = 3,
  /**
   * 4: The reverberation strength. The value is between 0 and 100.
   */
  AudioReverbStrength = 4,
}

/**
 * @ignore
 */
export enum StreamFallbackOptions {
  /**
   * @ignore
   */
  StreamFallbackOptionDisabled = 0,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLow = 1,
  /**
   * @ignore
   */
  StreamFallbackOptionAudioOnly = 2,
}

/**
 * @ignore
 */
export enum PriorityType {
  /**
   * @ignore
   */
  PriorityHigh = 50,
  /**
   * @ignore
   */
  PriorityNormal = 100,
}

/**
 * The statistics of the local video stream.
 */
export class LocalVideoStats {
  /**
   * The ID of the local user.
   */
  uid?: number;
  /**
   * The actual bitrate (Kbps) while sending the local video stream.This value does not include the bitrate for resending the video after packet loss.
   */
  sentBitrate?: number;
  /**
   * The actual frame rate (fps) while sending the local video stream.This value does not include the frame rate for resending the video after packet loss.
   */
  sentFrameRate?: number;
  /**
   * The frame rate (fps) for capturing the local video stream.
   */
  captureFrameRate?: number;
  /**
   * @ignore
   */
  captureFrameWidth?: number;
  /**
   * @ignore
   */
  captureFrameHeight?: number;
  /**
   * @ignore
   */
  regulatedCaptureFrameRate?: number;
  /**
   * @ignore
   */
  regulatedCaptureFrameWidth?: number;
  /**
   * @ignore
   */
  regulatedCaptureFrameHeight?: number;
  /**
   * The output frame rate (fps) of the local video encoder.
   */
  encoderOutputFrameRate?: number;
  /**
   * The width of the encoded video (px).
   */
  encodedFrameWidth?: number;
  /**
   * The height of the encoded video (px).
   */
  encodedFrameHeight?: number;
  /**
   * The output frame rate (fps) of the local video renderer.
   */
  rendererOutputFrameRate?: number;
  /**
   * The target bitrate (Kbps) of the current encoder. This is an estimate made by the SDK based on the current network conditions.
   */
  targetBitrate?: number;
  /**
   * The target frame rate (fps) of the current encoder.
   */
  targetFrameRate?: number;
  /**
   * Quality adaption of the local video stream in the reported interval (based on the target frame rate and target bitrate). See QualityAdaptIndication .
   */
  qualityAdaptIndication?: QualityAdaptIndication;
  /**
   * The bitrate (Kbps) while encoding the local video stream.This value does not include the bitrate for resending the video after packet loss.
   */
  encodedBitrate?: number;
  /**
   * The number of the sent video frames, represented by an aggregate value.
   */
  encodedFrameCount?: number;
  /**
   * The codec type of the local video. See VideoCodecType .
   */
  codecType?: VideoCodecType;
  /**
   * The video packet loss rate (%) from the local client to the Agora server before applying the anti-packet loss strategies.
   */
  txPacketLossRate?: number;
  /**
   * @ignore
   */
  captureBrightnessLevel?: CaptureBrightnessLevelType;
  /**
   * @ignore
   */
  dualStreamEnabled?: boolean;
}

/**
 * The statistics of the remote video stream.
 */
export class RemoteVideoStats {
  /**
   * The ID of the remote user sending the video stream.
   */
  uid?: number;
  /**
   *  Deprecated:
   * In scenarios where audio and video are synchronized, you can get the video delay datafrom networkTransportDelay and jitterBufferDelay in RemoteAudioStats . Delay (ms).
   */
  delay?: number;
  /**
   * Width (pixels) of the video stream.
   */
  width?: number;
  /**
   * Height (pixels) of the video stream.
   */
  height?: number;
  /**
   * Bitrate (Kbps) received since the last count.
   */
  receivedBitrate?: number;
  /**
   * The decoder output frame rate (fps) of the remote video.
   */
  decoderOutputFrameRate?: number;
  /**
   * The render output frame rate (fps) of the remote video.
   */
  rendererOutputFrameRate?: number;
  /**
   * Remote video packet loss rate (%).
   */
  frameLossRate?: number;
  /**
   * Packet loss rate (%) of the remote video stream after using the anti-packet-loss method.
   */
  packetLossRate?: number;
  /**
   * The type of the remote video stream. See VideoStreamType .
   */
  rxStreamType?: VideoStreamType;
  /**
   * The total freeze time (ms) of the remote video stream after the remote user joins the channel. In a video session where the frame rate is set to no less than 5 fps, video freeze occurs when the time interval between two adjacent renderable video frames is more than 500 ms.
   */
  totalFrozenTime?: number;
  /**
   * The total video freeze time as a percentage (%) of the total time when the video is available. The video is considered available when the remote user neither stops sending the audio stream nor disables the audio module after joining the channel.
   */
  frozenRate?: number;
  /**
   * The amount of time (ms) that the audio is ahead of the video.If this value is negative, the audio is lagging behind the video.
   */
  avSyncTimeMs?: number;
  /**
   * The total freeze time (ms) of the remote video stream after the remote user joins the channel.
   * The total effective duration of the video is the duration of the call after the remote user or host joins the channel and neither stops sending the video stream nor disables the video module.
   */
  totalActiveTime?: number;
  /**
   * The total duration (ms) of the remote video stream.
   */
  publishDuration?: number;
  /**
   * The state of super resolution:
   * >0: Super resolution is enabled.
   * =0: Super resolution is not enabled.
   */
  superResolutionType?: number;
}

/**
 * @ignore
 */
export class Region {
  /**
   * @ignore
   */
  uid?: number;
  /**
   * @ignore
   */
  x?: number;
  /**
   * @ignore
   */
  y?: number;
  /**
   * @ignore
   */
  width?: number;
  /**
   * @ignore
   */
  height?: number;
  /**
   * @ignore
   */
  zOrder?: number;
  /**
   * @ignore
   */
  alpha?: number;
  /**
   * @ignore
   */
  renderMode?: RenderModeType;
}

/**
 * @ignore
 */
export class VideoCompositingLayout {
  /**
   * @ignore
   */
  canvasWidth?: number;
  /**
   * @ignore
   */
  canvasHeight?: number;
  /**
   * @ignore
   */
  backgroundColor?: string;
  /**
   * @ignore
   */
  regions?: Region[];
  /**
   * @ignore
   */
  regionCount?: number;
  /**
   * @ignore
   */
  appData?: Uint8Array;
  /**
   * @ignore
   */
  appDataLength?: number;
}

/**
 * Configurations of injecting an external audio or video stream.
 */
export class InjectStreamConfig {
  /**
   * The width of the external video stream after injecting. The default value is 0, which represents the same width as the original.
   */
  width?: number;
  /**
   * The height of the external video stream after injecting. The default value is 0, which represents the same height as the original.
   */
  height?: number;
  /**
   * The GOP (in frames) of injecting the external video stream. The default value is 30.
   */
  videoGop?: number;
  /**
   * The frame rate (fps) of injecting the external video stream. The default rate is 15 fps.
   */
  videoFramerate?: number;
  /**
   * The bitrate (Kbps) of injecting the external video stream. The default value is 400 Kbps.
   * The bitrate setting is closely linked to the video resolution. If the bitrate you set is beyond a reasonable range, the SDK sets it within a reasonable range.
   */
  videoBitrate?: number;
  /**
   * The sampling rate (Hz) of injecting the external audio stream. The default value is 48000 Hz. See AudioSampleRateType .
   * Agora recommends using the default value.
   */
  audioSampleRate?: AudioSampleRateType;
  /**
   * The bitrate (Kbps) of injecting the external audio stream. The default value is 48 Kbps.
   * Agora recommends using the default value.
   */
  audioBitrate?: number;
  /**
   * The number of channels of the external audio stream after injecting.
   * 1: (Default) Mono.
   * 2: Stereo. Agora recommends using the default value.
   */
  audioChannels?: number;
}

/**
 * Lifecycle of the CDN live video stream.
 * Deprecated
 */
export enum RtmpStreamLifeCycleType {
  /**
   * Bind to the channel lifecycle. If all hosts leave the channel, the CDN live streaming stops after 30 seconds.
   */
  RtmpStreamLifeCycleBind2channel = 1,
  /**
   * Bind to the owner of the RTMP stream. If the owner leaves the channel, the CDN live streaming stops immediately.
   */
  RtmpStreamLifeCycleBind2owner = 2,
}

/**
 * @ignore
 */
export class PublisherConfiguration {
  /**
   * @ignore
   */
  width?: number;
  /**
   * @ignore
   */
  height?: number;
  /**
   * @ignore
   */
  framerate?: number;
  /**
   * @ignore
   */
  bitrate?: number;
  /**
   * @ignore
   */
  defaultLayout?: number;
  /**
   * @ignore
   */
  lifecycle?: number;
  /**
   * @ignore
   */
  owner?: boolean;
  /**
   * @ignore
   */
  injectStreamWidth?: number;
  /**
   * @ignore
   */
  injectStreamHeight?: number;
  /**
   * @ignore
   */
  injectStreamUrl?: string;
  /**
   * @ignore
   */
  publishUrl?: string;
  /**
   * @ignore
   */
  rawStreamUrl?: string;
  /**
   * @ignore
   */
  extraInfo?: string;
}

/**
 * @ignore
 */
export class AudioTrackConfig {
  /**
   * @ignore
   */
  enableLocalPlayback?: boolean;
}

/**
 * The camera direction.
 */
export enum CameraDirection {
  /**
   * The rear camera.
   */
  CameraRear = 0,
  /**
   * The front camera.
   */
  CameraFront = 1,
}

/**
 * @ignore
 */
export enum CloudProxyType {
  /**
   * 0: The automatic mode. In this mode, the SDK attempts a direct connection to SD-RTN™ and automatically switches to TCP/TLS 443 if the attempt fails.
   */
  NoneProxy = 0,
  /**
   * 1: The cloud proxy for the UDP protocol, that is, the Force UDP cloud proxy mode. In this mode, the SDK always transmits data over UDP.
   */
  UdpProxy = 1,
  /**
   * 2: The cloud proxy for the TCP (encryption) protocol, that is, the Force TCP cloud proxy mode. In this mode, the SDK always transmits data over TCP/TLS 443.
   */
  TcpProxy = 2,
}

/**
 * @ignore
 */
export class CameraCapturerConfiguration {
  /**
   * @ignore
   */
  cameraDirection?: CameraDirection;
  /**
   * @ignore
   */
  deviceId?: string;
  /**
   * @ignore
   */
  format?: VideoFormat;
  /**
   * @ignore
   */
  followEncodeDimensionRatio?: boolean;
}

/**
 * The configuration of the captured screen.
 */
export class ScreenCaptureConfiguration {
  /**
   * Whether to capture the window on the screen:
   * true: Capture the window.
   * false: (Default) Capture the screen, not the window.
   */
  isCaptureWindow?: boolean;
  /**
   * (macOS only) The display ID of the screen.This parameter takes effect only when you want to capture the screen on macOS.
   */
  displayId?: number;
  /**
   * (Windows only) The relative position of the shared screen to the virtual screen.This parameter takes effect only when you want to capture the screen on Windows.
   */
  screenRect?: Rectangle;
  /**
   * (For Windows and macOS only) Window ID.This parameter takes effect only when you want to capture the window.
   */
  windowId?: any;
  /**
   * (For Windows and macOS only) The screen capture configuration. See ScreenCaptureParameters .
   */
  params?: ScreenCaptureParameters;
  /**
   * (For Windows and macOS only) The relative position of the shared region to the whole screen. See Rectangle .
   * If you do not set this parameter, the SDK shares the whole screen. If the region you set exceeds the boundary of the screen, only the region within in the screen is shared. If you setwidth or height in Rectangle as 0, the whole screen is shared.
   */
  regionRect?: Rectangle;
}

/**
 * @ignore
 */
export class Size {
  /**
   * @ignore
   */
  width?: number;
  /**
   * @ignore
   */
  height?: number;
}

/**
 * The image content of the thumbnail or icon. Set in ScreenCaptureSourceInfo .
 * The default image is in the RGBA format. If you need to use another format, you need to convert the image on your own.
 */
export class ThumbImageBuffer {
  /**
   * The buffer of the thumbnail ot icon.
   */
  buffer?: Uint8Array;
  /**
   * The buffer length of the thumbnail or icon, in bytes.
   */
  length?: number;
  /**
   * The actual width (px) of the thumbnail or icon.
   */
  width?: number;
  /**
   * The actual height (px) of the thumbnail or icon.
   */
  height?: number;
}

/**
 * The type of the shared target. Set in ScreenCaptureSourceInfo .
 */
export enum ScreenCaptureSourceType {
  /**
   * -1: Unknown type.
   */
  ScreencapturesourcetypeUnknown = -1,
  /**
   * 0: The shared target is a window.
   */
  ScreencapturesourcetypeWindow = 0,
  /**
   * 1: The share target is the screen of a particular monitor.
   */
  ScreencapturesourcetypeScreen = 1,
  /**
   * 6: Reserved parameter
   */
  ScreencapturesourcetypeCustom = 2,
}

/**
 * The information about the specified shareable window or screen.
 */
export class ScreenCaptureSourceInfo {
  /**
   * The type of the shared target. See ScreenCaptureSourceType .
   */
  type?: ScreenCaptureSourceType;
  /**
   * The window ID for a window or the display ID for a screen.
   */
  sourceId?: any;
  /**
   * The name of the window or screen. UTF-8 encoding.
   */
  sourceName?: string;
  /**
   * The image content of the thumbnail. See ThumbImageBuffer .
   */
  thumbImage?: ThumbImageBuffer;
  /**
   * The image content of the icon. See ThumbImageBuffer .
   */
  iconImage?: ThumbImageBuffer;
  /**
   * The process to which the window belongs. UTF-8 encoding.
   */
  processPath?: string;
  /**
   * The title of the window. UTF-8 encoding.
   */
  sourceTitle?: string;
  /**
   * Determines whether the screen is the primary display:
   * true: The screen is the primary display.
   * false: The screen is not the primary display.
   */
  primaryMonitor?: boolean;
  /**
   * @ignore
   */
  isOccluded?: boolean;
}

/**
 * The advanced options for audio.
 */
export class AdvancedAudioOptions {
  /**
   * The number of channels for audio preprocessing. See AudioProcessingChannels .
   */
  audioProcessingChannels?: number;
}

/**
 * @ignore
 */
export class ImageTrackOptions {
  /**
   * @ignore
   */
  imageUrl?: string;
  /**
   * @ignore
   */
  fps?: number;
  /**
   * @ignore
   */
  mirrorMode?: VideoMirrorModeType;
}

/**
 * @ignore
 */
export class ChannelMediaOptions {
  /**
   * @ignore
   */
  publishCameraTrack?: boolean;
  /**
   * @ignore
   */
  publishSecondaryCameraTrack?: boolean;
  /**
   * @ignore
   */
  publishMicrophoneTrack?: boolean;
  /**
   * @ignore
   */
  publishScreenCaptureVideo?: boolean;
  /**
   * @ignore
   */
  publishScreenCaptureAudio?: boolean;
  /**
   * @ignore
   */
  publishScreenTrack?: boolean;
  /**
   * @ignore
   */
  publishSecondaryScreenTrack?: boolean;
  /**
   * @ignore
   */
  publishCustomAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishCustomAudioSourceId?: number;
  /**
   * @ignore
   */
  publishCustomAudioTrackEnableAec?: boolean;
  /**
   * @ignore
   */
  publishDirectCustomAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishCustomAudioTrackAec?: boolean;
  /**
   * @ignore
   */
  publishCustomVideoTrack?: boolean;
  /**
   * @ignore
   */
  publishEncodedVideoTrack?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerVideoTrack?: boolean;
  /**
   * @ignore
   */
  publishTrancodedVideoTrack?: boolean;
  /**
   * @ignore
   */
  autoSubscribeAudio?: boolean;
  /**
   * @ignore
   */
  autoSubscribeVideo?: boolean;
  /**
   * @ignore
   */
  enableAudioRecordingOrPlayout?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerId?: number;
  /**
   * @ignore
   */
  clientRoleType?: ClientRoleType;
  /**
   * @ignore
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
  /**
   * @ignore
   */
  defaultVideoStreamType?: VideoStreamType;
  /**
   * @ignore
   */
  channelProfile?: ChannelProfileType;
  /**
   * @ignore
   */
  audioDelayMs?: number;
  /**
   * @ignore
   */
  mediaPlayerAudioDelayMs?: number;
  /**
   * @ignore
   */
  token?: string;
  /**
   * @ignore
   */
  enableBuiltInMediaEncryption?: boolean;
  /**
   * @ignore
   */
  publishRhythmPlayerTrack?: boolean;
  /**
   * @ignore
   */
  isInteractiveAudience?: boolean;
  /**
   * @ignore
   */
  customVideoTrackId?: number;
  /**
   * @ignore
   */
  isAudioFilterable?: boolean;
}

/**
 * @ignore
 */
export enum LocalProxyMode {
  /**
   * @ignore
   */
  ConnectivityFirst = 0,
  /**
   * @ignore
   */
  LocalOnly = 1,
}

/**
 * The cloud proxy type.
 */
export enum ProxyType {
  /**
   * @ignore
   */
  NoneProxyType = 0,
  /**
   * @ignore
   */
  UdpProxyType = 1,
  /**
   * @ignore
   */
  TcpProxyType = 2,
  /**
   * @ignore
   */
  LocalProxyType = 3,
  /**
   * @ignore
   */
  TcpProxyAutoFallbackType = 4,
}

/**
 * @ignore
 */
export class LocalAccessPointConfiguration {
  /**
   * @ignore
   */
  ipList?: string[];
  /**
   * @ignore
   */
  ipListSize?: number;
  /**
   * @ignore
   */
  domainList?: string[];
  /**
   * @ignore
   */
  domainListSize?: number;
  /**
   * @ignore
   */
  verifyDomainName?: string;
  /**
   * @ignore
   */
  mode?: LocalProxyMode;
}

/**
 * The options for leaving a channel.
 */
export class LeaveChannelOptions {
  /**
   * Whether to stop playing and mixing the music file when a user leaves the channel. true: (Default) Stop playing and mixing the music file.
   * false: Do not stop playing and mixing the music file.
   */
  stopAudioMixing?: boolean;
  /**
   * Whether to stop playing all audio effects when a user leaves the channel. true: (Default) Stop playing all audio effects.
   * false: Do not stop playing any audio effect.
   */
  stopAllEffect?: boolean;
  /**
   * Whether to stop microphone recording when a user leaves the channel. true: (Default) Stop microphone recording.
   * false: Do not stop microphone recording.
   */
  stopMicrophoneRecording?: boolean;
}

/**
 * The SDK uses the IRtcEngineEventHandler interface to send event notifications to your app. Your app can get those notifications through methods that inherit this interface.
 */
export interface IRtcEngineEventHandler {
  /**
   * @ignore
   */
  onJoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * @ignore
   */
  onRejoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * @ignore
   */
  onProxyConnected?(
    channel: string,
    uid: number,
    proxyType: ProxyType,
    localProxyIp: string,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onError?(err: ErrorCodeType, msg: string): void;

  /**
   * @ignore
   */
  onAudioQuality?(
    connection: RtcConnection,
    remoteUid: number,
    quality: QualityType,
    delay: number,
    lost: number
  ): void;

  /**
   * @ignore
   */
  onLastmileProbeResult?(result: LastmileProbeResult): void;

  /**
   * @ignore
   */
  onAudioVolumeIndication?(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): void;

  /**
   * @ignore
   */
  onLeaveChannel?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * @ignore
   */
  onRtcStats?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * @ignore
   */
  onAudioDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: number
  ): void;

  /**
   * @ignore
   */
  onAudioMixingFinished?(): void;

  /**
   * @ignore
   */
  onAudioEffectFinished?(soundId: number): void;

  /**
   * @ignore
   */
  onVideoDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: number
  ): void;

  /**
   * @ignore
   */
  onMediaDeviceChanged?(deviceType: MediaDeviceType): void;

  /**
   * @ignore
   */
  onNetworkQuality?(
    connection: RtcConnection,
    remoteUid: number,
    txQuality: QualityType,
    rxQuality: QualityType
  ): void;

  /**
   * @ignore
   */
  onIntraRequestReceived?(connection: RtcConnection): void;

  /**
   * @ignore
   */
  onUplinkNetworkInfoUpdated?(info: UplinkNetworkInfo): void;

  /**
   * @ignore
   */
  onDownlinkNetworkInfoUpdated?(info: DownlinkNetworkInfo): void;

  /**
   * @ignore
   */
  onLastmileQuality?(quality: QualityType): void;

  /**
   * @ignore
   */
  onFirstLocalVideoFrame?(
    connection: RtcConnection,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onFirstLocalVideoFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onFirstRemoteVideoDecoded?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onVideoSizeChanged?(
    connection: RtcConnection,
    sourceType: VideoSourceType,
    uid: number,
    width: number,
    height: number,
    rotation: number
  ): void;

  /**
   * @ignore
   */
  onLocalVideoStateChanged?(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    error: LocalVideoStreamError
  ): void;

  /**
   * @ignore
   */
  onRemoteVideoStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onFirstRemoteVideoFrame?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onUserJoined?(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onUserOffline?(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void;

  /**
   * @ignore
   */
  onUserMuteAudio?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * @ignore
   */
  onUserMuteVideo?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * @ignore
   */
  onUserEnableVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /**
   * @ignore
   */
  onUserStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: number
  ): void;

  /**
   * @ignore
   */
  onUserEnableLocalVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /**
   * @ignore
   */
  onApiCallExecuted?(err: ErrorCodeType, api: string, result: string): void;

  /**
   * @ignore
   */
  onLocalAudioStats?(connection: RtcConnection, stats: LocalAudioStats): void;

  /**
   * @ignore
   */
  onRemoteAudioStats?(connection: RtcConnection, stats: RemoteAudioStats): void;

  /**
   * @ignore
   */
  onLocalVideoStats?(connection: RtcConnection, stats: LocalVideoStats): void;

  /**
   * @ignore
   */
  onRemoteVideoStats?(connection: RtcConnection, stats: RemoteVideoStats): void;

  /**
   * @ignore
   */
  onCameraReady?(): void;

  /**
   * @ignore
   */
  onCameraFocusAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * @ignore
   */
  onCameraExposureAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * @ignore
   */
  onFacePositionChanged?(
    imageWidth: number,
    imageHeight: number,
    vecRectangle: Rectangle,
    vecDistance: number,
    numFaces: number
  ): void;

  /**
   * @ignore
   */
  onVideoStopped?(): void;

  /**
   * @ignore
   */
  onAudioMixingStateChanged?(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ): void;

  /**
   * @ignore
   */
  onRhythmPlayerStateChanged?(
    state: RhythmPlayerStateType,
    errorCode: RhythmPlayerErrorType
  ): void;

  /**
   * @ignore
   */
  onConnectionLost?(connection: RtcConnection): void;

  /**
   * @ignore
   */
  onConnectionInterrupted?(connection: RtcConnection): void;

  /**
   * @ignore
   */
  onConnectionBanned?(connection: RtcConnection): void;

  /**
   * @ignore
   */
  onStreamMessage?(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    data: Uint8Array,
    length: number,
    sentTs: number
  ): void;

  /**
   * @ignore
   */
  onStreamMessageError?(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    code: ErrorCodeType,
    missed: number,
    cached: number
  ): void;

  /**
   * @ignore
   */
  onRequestToken?(connection: RtcConnection): void;

  /**
   * @ignore
   */
  onTokenPrivilegeWillExpire?(connection: RtcConnection, token: string): void;

  /**
   * @ignore
   */
  onFirstLocalAudioFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onFirstRemoteAudioFrame?(
    connection: RtcConnection,
    userId: number,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onFirstRemoteAudioDecoded?(
    connection: RtcConnection,
    uid: number,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onLocalAudioStateChanged?(
    connection: RtcConnection,
    state: LocalAudioStreamState,
    error: LocalAudioStreamError
  ): void;

  /**
   * @ignore
   */
  onRemoteAudioStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteAudioState,
    reason: RemoteAudioStateReason,
    elapsed: number
  ): void;

  /**
   * @ignore
   */
  onActiveSpeaker?(connection: RtcConnection, uid: number): void;

  /**
   * @ignore
   */
  onContentInspectResult?(result: ContentInspectResult): void;

  /**
   * @ignore
   */
  onSnapshotTaken?(
    connection: RtcConnection,
    uid: number,
    filePath: string,
    width: number,
    height: number,
    errCode: number
  ): void;

  /**
   * @ignore
   */
  onClientRoleChanged?(
    connection: RtcConnection,
    oldRole: ClientRoleType,
    newRole: ClientRoleType
  ): void;

  /**
   * @ignore
   */
  onClientRoleChangeFailed?(
    connection: RtcConnection,
    reason: ClientRoleChangeFailedReason,
    currentRole: ClientRoleType
  ): void;

  /**
   * @ignore
   */
  onAudioDeviceVolumeChanged?(
    deviceType: MediaDeviceType,
    volume: number,
    muted: boolean
  ): void;

  /**
   * @ignore
   */
  onRtmpStreamingStateChanged?(
    url: string,
    state: RtmpStreamPublishState,
    errCode: RtmpStreamPublishErrorType
  ): void;

  /**
   * @ignore
   */
  onRtmpStreamingEvent?(url: string, eventCode: RtmpStreamingEvent): void;

  /**
   * @ignore
   */
  onTranscodingUpdated?(): void;

  /**
   * @ignore
   */
  onAudioRoutingChanged?(routing: number): void;

  /**
   * @ignore
   */
  onChannelMediaRelayStateChanged?(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void;

  /**
   * @ignore
   */
  onChannelMediaRelayEvent?(code: ChannelMediaRelayEvent): void;

  /**
   * @ignore
   */
  onLocalPublishFallbackToAudioOnly?(isFallbackOrRecover: boolean): void;

  /**
   * @ignore
   */
  onRemoteSubscribeFallbackToAudioOnly?(
    uid: number,
    isFallbackOrRecover: boolean
  ): void;

  /**
   * @ignore
   */
  onRemoteAudioTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /**
   * @ignore
   */
  onRemoteVideoTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /**
   * @ignore
   */
  onConnectionStateChanged?(
    connection: RtcConnection,
    state: ConnectionStateType,
    reason: ConnectionChangedReasonType
  ): void;

  /**
   * @ignore
   */
  onWlAccMessage?(
    connection: RtcConnection,
    reason: WlaccMessageReason,
    action: WlaccSuggestAction,
    wlAccMsg: string
  ): void;

  /**
   * @ignore
   */
  onWlAccStats?(
    connection: RtcConnection,
    currentStats: WlAccStats,
    averageStats: WlAccStats
  ): void;

  /**
   * @ignore
   */
  onNetworkTypeChanged?(connection: RtcConnection, type: NetworkType): void;

  /**
   * @ignore
   */
  onEncryptionError?(
    connection: RtcConnection,
    errorType: EncryptionErrorType
  ): void;

  /**
   * @ignore
   */
  onPermissionError?(permissionType: PermissionType): void;

  /**
   * @ignore
   */
  onLocalUserRegistered?(uid: number, userAccount: string): void;

  /**
   * @ignore
   */
  onUserInfoUpdated?(uid: number, info: UserInfo): void;

  /**
   * @ignore
   */
  onUploadLogResult?(
    connection: RtcConnection,
    requestId: string,
    success: boolean,
    reason: UploadErrorReason
  ): void;

  /**
   * @ignore
   */
  onAudioSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /**
   * @ignore
   */
  onVideoSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /**
   * @ignore
   */
  onAudioPublishStateChanged?(
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /**
   * @ignore
   */
  onVideoPublishStateChanged?(
    source: VideoSourceType,
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /**
   * @ignore
   */
  onExtensionEvent?(
    provider: string,
    extension: string,
    key: string,
    value: string
  ): void;

  /**
   * @ignore
   */
  onExtensionStarted?(provider: string, extension: string): void;

  /**
   * @ignore
   */
  onExtensionStopped?(provider: string, extension: string): void;

  /**
   * @ignore
   */
  onExtensionError?(
    provider: string,
    extension: string,
    error: number,
    message: string
  ): void;

  /**
   * @ignore
   */
  onUserAccountUpdated?(
    connection: RtcConnection,
    remoteUid: number,
    userAccount: string
  ): void;
}

/**
 * Video device management methods.
 */
export abstract class IVideoDeviceManager {
  /**
   * Enumerates the video devices.
   *
   * @returns
   * Success: A VideoDeviceInfo array including all video devices in the system.
   * Failure: An empty array.
   */
  abstract enumerateVideoDevices(): VideoDeviceInfo[];

  /**
   * Specifies the video capture device with the device ID.
   * Plugging or unplugging a device does not change its device ID.
   *
   * @param deviceId The device ID. You can get the device ID by calling enumerateVideoDevices .
   *  The maximum length is MaxDeviceIdLengthType .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract setDevice(deviceIdUTF8: string): number;

  /**
   * Retrieves the current video capture device.
   *
   * @returns
   * The video capture device.
   */
  abstract getDevice(): string;

  /**
   * @ignore
   */
  abstract numberOfCapabilities(deviceIdUTF8: string): number;

  /**
   * @ignore
   */
  abstract getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number
  ): VideoFormat;

  /**
   * @ignore
   */
  abstract startDeviceTest(hwnd: any): number;

  /**
   * @ignore
   */
  abstract stopDeviceTest(): number;

  /**
   * Releases all the resources occupied by the IVideoDeviceManager object.
   */
  abstract release(): void;
}

/**
 * @ignore
 */
export class RtcEngineContext {
  /**
   * @ignore
   */
  appId?: string;
  /**
   * @ignore
   */
  channelProfile?: ChannelProfileType;
  /**
   * @ignore
   */
  audioScenario?: AudioScenarioType;
  /**
   * @ignore
   */
  areaCode?: number;
  /**
   * @ignore
   */
  logConfig?: LogConfig;
  /**
   * @ignore
   */
  threadPriority?: ThreadPriorityType;
  /**
   * @ignore
   */
  useExternalEglContext?: boolean;
}

/**
 * Metadata type of the observer. We only support video Metadata for now.
 */
export enum MetadataType {
  /**
   * The type of metadata is unknown.
   */
  UnknownMetadata = -1,
  /**
   * The type of metadata is video.
   */
  VideoMetadata = 0,
}

/**
 * @ignore
 */
export enum MaxMetadataSizeType {
  /**
   * @ignore
   */
  InvalidMetadataSizeInByte = -1,
  /**
   * @ignore
   */
  DefaultMetadataSizeInByte = 512,
  /**
   * @ignore
   */
  MaxMetadataSizeInByte = 1024,
}

/**
 * Media metadata.
 */
export class Metadata {
  /**
   * The user ID.
   * For the recipient:the ID of the remote user who sent the Metadata.
   * Ignore it for sender.
   */
  uid?: number;
  /**
   * Buffer size for received or sent Metadata.
   */
  size?: number;
  /**
   * The buffer address of the received or sent Metadata.
   */
  buffer?: Uint8Array;
  /**
   * The timestamp (ms) of Metadata.
   */
  timeStampMs?: number;
}

/**
 * The metadata observer.
 */
export interface IMetadataObserver {
  /**
   * Occurs when the local user receives the metadata.
   *
   * @param metadata The metadata received, see Metadata .
   */
  onMetadataReceived?(metadata: Metadata): void;
}

/**
 * @ignore
 */
export enum DirectCdnStreamingError {
  /**
   * @ignore
   */
  DirectCdnStreamingErrorOk = 0,
  /**
   * @ignore
   */
  DirectCdnStreamingErrorFailed = 1,
  /**
   * @ignore
   */
  DirectCdnStreamingErrorAudioPublication = 2,
  /**
   * @ignore
   */
  DirectCdnStreamingErrorVideoPublication = 3,
  /**
   * @ignore
   */
  DirectCdnStreamingErrorNetConnect = 4,
  /**
   * @ignore
   */
  DirectCdnStreamingErrorBadName = 5,
}

/**
 * @ignore
 */
export enum DirectCdnStreamingState {
  /**
   * @ignore
   */
  DirectCdnStreamingStateIdle = 0,
  /**
   * @ignore
   */
  DirectCdnStreamingStateRunning = 1,
  /**
   * @ignore
   */
  DirectCdnStreamingStateStopped = 2,
  /**
   * @ignore
   */
  DirectCdnStreamingStateFailed = 3,
  /**
   * @ignore
   */
  DirectCdnStreamingStateRecovering = 4,
}

/**
 * @ignore
 */
export class DirectCdnStreamingStats {
  /**
   * @ignore
   */
  videoWidth?: number;
  /**
   * @ignore
   */
  videoHeight?: number;
  /**
   * @ignore
   */
  fps?: number;
  /**
   * @ignore
   */
  videoBitrate?: number;
  /**
   * @ignore
   */
  audioBitrate?: number;
}

/**
 * @ignore
 */
export interface IDirectCdnStreamingEventHandler {
  /**
   * @ignore
   */
  onDirectCdnStreamingStateChanged?(
    state: DirectCdnStreamingState,
    error: DirectCdnStreamingError,
    message: string
  ): void;

  /**
   * @ignore
   */
  onDirectCdnStreamingStats?(stats: DirectCdnStreamingStats): void;
}

/**
 * @ignore
 */
export class DirectCdnStreamingMediaOptions {
  /**
   * @ignore
   */
  publishCameraTrack?: boolean;
  /**
   * @ignore
   */
  publishMicrophoneTrack?: boolean;
  /**
   * @ignore
   */
  publishCustomAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishCustomVideoTrack?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerId?: number;
  /**
   * @ignore
   */
  customVideoTrackId?: number;
}

/**
 * The basic interface of the Agora SDK that implements the core functions of real-time communication.
 * IRtcEngine provides the main methods that your app can call.
 * Before calling other APIs, you must call createAgoraRtcEngine to create an IRtcEngine object.
 */
export abstract class IRtcEngine {
  /**
   * @ignore
   */
  abstract release(sync?: boolean): void;

  /**
   * @ignore
   */
  abstract initialize(context: RtcEngineContext): number;

  /**
   * @ignore
   */
  abstract getVersion(): SDKBuildInfo;

  /**
   * @ignore
   */
  abstract getErrorDescription(code: number): string;

  /**
   * @ignore
   */
  abstract updateChannelMediaOptions(options: ChannelMediaOptions): number;

  /**
   * @ignore
   */
  abstract renewToken(token: string): number;

  /**
   * @ignore
   */
  abstract setChannelProfile(profile: ChannelProfileType): number;

  /**
   * @ignore
   */
  abstract stopEchoTest(): number;

  /**
   * @ignore
   */
  abstract enableVideo(): number;

  /**
   * @ignore
   */
  abstract disableVideo(): number;

  /**
   * @ignore
   */
  abstract startLastmileProbeTest(config: LastmileProbeConfig): number;

  /**
   * @ignore
   */
  abstract stopLastmileProbeTest(): number;

  /**
   * @ignore
   */
  abstract setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract setLowlightEnhanceOptions(
    enabled: boolean,
    options: LowlightEnhanceOptions,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract setVideoDenoiserOptions(
    enabled: boolean,
    options: VideoDenoiserOptions,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract setColorEnhanceOptions(
    enabled: boolean,
    options: ColorEnhanceOptions,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract enableRemoteSuperResolution(userId: number, enable: boolean): number;

  /**
   * @ignore
   */
  abstract setupRemoteVideo(canvas: VideoCanvas): number;

  /**
   * @ignore
   */
  abstract setupLocalVideo(canvas: VideoCanvas): number;

  /**
   * @ignore
   */
  abstract enableAudio(): number;

  /**
   * @ignore
   */
  abstract disableAudio(): number;

  /**
   * @ignore
   */
  abstract setAudioScenario(scenario: AudioScenarioType): number;

  /**
   * @ignore
   */
  abstract enableLocalAudio(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /**
   * @ignore
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * @ignore
   */
  abstract setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * @ignore
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  /**
   * @ignore
   */
  abstract muteLocalVideoStream(mute: boolean): number;

  /**
   * @ignore
   */
  abstract enableLocalVideo(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  /**
   * @ignore
   */
  abstract setDefaultMuteAllRemoteVideoStreams(mute: boolean): number;

  /**
   * @ignore
   */
  abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

  /**
   * @ignore
   */
  abstract setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteVideoSubscriptionOptions(
    uid: number,
    options: VideoSubscriptionOptions
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

  /**
   * @ignore
   */
  abstract setSubscribeAudioBlacklist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeAudioWhitelist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeVideoBlacklist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeVideoWhitelist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number;

  /**
   * @ignore
   */
  abstract registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * @ignore
   */
  abstract stopAudioRecording(): number;

  /**
   * @ignore
   */
  abstract createMediaPlayer(): IMediaPlayer;

  /**
   * @ignore
   */
  abstract destroyMediaPlayer(mediaPlayer: IMediaPlayer): number;

  /**
   * @ignore
   */
  abstract stopAudioMixing(): number;

  /**
   * @ignore
   */
  abstract pauseAudioMixing(): number;

  /**
   * @ignore
   */
  abstract resumeAudioMixing(): number;

  /**
   * @ignore
   */
  abstract selectAudioTrack(index: number): number;

  /**
   * @ignore
   */
  abstract getAudioTrackCount(): number;

  /**
   * @ignore
   */
  abstract adjustAudioMixingVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract adjustAudioMixingPublishVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract getAudioMixingPublishVolume(): number;

  /**
   * @ignore
   */
  abstract adjustAudioMixingPlayoutVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract getAudioMixingPlayoutVolume(): number;

  /**
   * @ignore
   */
  abstract getAudioMixingDuration(): number;

  /**
   * @ignore
   */
  abstract getAudioMixingCurrentPosition(): number;

  /**
   * @ignore
   */
  abstract setAudioMixingPosition(pos: number): number;

  /**
   * @ignore
   */
  abstract setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): number;

  /**
   * @ignore
   */
  abstract setAudioMixingPitch(pitch: number): number;

  /**
   * @ignore
   */
  abstract getEffectsVolume(): number;

  /**
   * @ignore
   */
  abstract setEffectsVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract preloadEffect(
    soundId: number,
    filePath: string,
    startPos?: number
  ): number;

  /**
   * @ignore
   */
  abstract playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean,
    startPos?: number
  ): number;

  /**
   * @ignore
   */
  abstract playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean
  ): number;

  /**
   * @ignore
   */
  abstract getVolumeOfEffect(soundId: number): number;

  /**
   * @ignore
   */
  abstract setVolumeOfEffect(soundId: number, volume: number): number;

  /**
   * @ignore
   */
  abstract pauseEffect(soundId: number): number;

  /**
   * @ignore
   */
  abstract pauseAllEffects(): number;

  /**
   * @ignore
   */
  abstract resumeEffect(soundId: number): number;

  /**
   * @ignore
   */
  abstract resumeAllEffects(): number;

  /**
   * @ignore
   */
  abstract stopEffect(soundId: number): number;

  /**
   * @ignore
   */
  abstract stopAllEffects(): number;

  /**
   * @ignore
   */
  abstract unloadEffect(soundId: number): number;

  /**
   * @ignore
   */
  abstract unloadAllEffects(): number;

  /**
   * @ignore
   */
  abstract getEffectDuration(filePath: string): number;

  /**
   * @ignore
   */
  abstract setEffectPosition(soundId: number, pos: number): number;

  /**
   * @ignore
   */
  abstract getEffectCurrentPosition(soundId: number): number;

  /**
   * @ignore
   */
  abstract enableSoundPositionIndication(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): number;

  /**
   * @ignore
   */
  abstract enableSpatialAudio(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract setRemoteUserSpatialAudioParams(
    uid: number,
    params: SpatialAudioParams
  ): number;

  /**
   * @ignore
   */
  abstract setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number;

  /**
   * @ignore
   */
  abstract setAudioEffectPreset(preset: AudioEffectPreset): number;

  /**
   * @ignore
   */
  abstract setVoiceConversionPreset(preset: VoiceConversionPreset): number;

  /**
   * @ignore
   */
  abstract setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * @ignore
   */
  abstract setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * @ignore
   */
  abstract setVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * @ignore
   */
  abstract setLocalVoicePitch(pitch: number): number;

  /**
   * @ignore
   */
  abstract setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number;

  /**
   * @ignore
   */
  abstract setLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): number;

  /**
   * @ignore
   */
  abstract setLogFile(filePath: string): number;

  /**
   * @ignore
   */
  abstract setLogFilter(filter: LogFilterType): number;

  /**
   * @ignore
   */
  abstract setLogLevel(level: LogLevel): number;

  /**
   * @ignore
   */
  abstract setLogFileSize(fileSizeInKBytes: number): number;

  /**
   * @ignore
   */
  abstract uploadLogFile(requestId: string): number;

  /**
   * @ignore
   */
  abstract setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number;

  /**
   * @ignore
   */
  abstract setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number;

  /**
   * @ignore
   */
  abstract enableEchoCancellationExternal(
    enabled: boolean,
    audioSourceDelay: number
  ): number;

  /**
   * @ignore
   */
  abstract enableCustomAudioLocalPlayback(
    sourceId: number,
    enabled: boolean
  ): number;

  /**
   * @ignore
   */
  abstract startPrimaryCustomAudioTrack(config: AudioTrackConfig): number;

  /**
   * @ignore
   */
  abstract stopPrimaryCustomAudioTrack(): number;

  /**
   * @ignore
   */
  abstract startSecondaryCustomAudioTrack(config: AudioTrackConfig): number;

  /**
   * @ignore
   */
  abstract stopSecondaryCustomAudioTrack(): number;

  /**
   * @ignore
   */
  abstract setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * @ignore
   */
  abstract setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * @ignore
   */
  abstract setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number;

  /**
   * @ignore
   */
  abstract setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): number;

  /**
   * @ignore
   */
  abstract enableAudioSpectrumMonitor(intervalInMS?: number): number;

  /**
   * @ignore
   */
  abstract disableAudioSpectrumMonitor(): number;

  /**
   * @ignore
   */
  abstract registerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * @ignore
   */
  abstract unregisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * @ignore
   */
  abstract adjustRecordingSignalVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract muteRecordingSignal(mute: boolean): number;

  /**
   * @ignore
   */
  abstract adjustPlaybackSignalVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract adjustUserPlaybackSignalVolume(uid: number, volume: number): number;

  /**
   * @ignore
   */
  abstract setLocalPublishFallbackOption(option: StreamFallbackOptions): number;

  /**
   * @ignore
   */
  abstract setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): number;

  /**
   * @ignore
   */
  abstract enableLoopbackRecording(
    enabled: boolean,
    deviceName?: string
  ): number;

  /**
   * @ignore
   */
  abstract adjustLoopbackSignalVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract getLoopbackRecordingVolume(): number;

  /**
   * @ignore
   */
  abstract enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number;

  /**
   * @ignore
   */
  abstract setInEarMonitoringVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract loadExtensionProvider(
    path: string,
    unloadAfterUse?: boolean
  ): number;

  /**
   * @ignore
   */
  abstract setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): number;

  /**
   * @ignore
   */
  abstract enableExtension(
    provider: string,
    extension: string,
    enable?: boolean,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    bufLen: number,
    type?: MediaSourceType
  ): string;

  /**
   * @ignore
   */
  abstract setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract createCustomVideoTrack(): number;

  /**
   * @ignore
   */
  abstract createCustomEncodedVideoTrack(senderOption: SenderOptions): number;

  /**
   * @ignore
   */
  abstract destroyCustomVideoTrack(videoTrackId: number): number;

  /**
   * @ignore
   */
  abstract destroyCustomEncodedVideoTrack(videoTrackId: number): number;

  /**
   * @ignore
   */
  abstract switchCamera(): number;

  /**
   * @ignore
   */
  abstract isCameraZoomSupported(): boolean;

  /**
   * @ignore
   */
  abstract isCameraFaceDetectSupported(): boolean;

  /**
   * @ignore
   */
  abstract isCameraTorchSupported(): boolean;

  /**
   * @ignore
   */
  abstract isCameraFocusSupported(): boolean;

  /**
   * @ignore
   */
  abstract isCameraAutoFocusFaceModeSupported(): boolean;

  /**
   * @ignore
   */
  abstract setCameraZoomFactor(factor: number): number;

  /**
   * @ignore
   */
  abstract enableFaceDetection(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract getCameraMaxZoomFactor(): number;

  /**
   * @ignore
   */
  abstract setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number;

  /**
   * @ignore
   */
  abstract setCameraTorchOn(isOn: boolean): number;

  /**
   * @ignore
   */
  abstract setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract isCameraExposurePositionSupported(): boolean;

  /**
   * @ignore
   */
  abstract setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number;

  /**
   * @ignore
   */
  abstract isCameraAutoExposureFaceModeSupported(): boolean;

  /**
   * @ignore
   */
  abstract setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): number;

  /**
   * @ignore
   */
  abstract setEnableSpeakerphone(speakerOn: boolean): number;

  /**
   * @ignore
   */
  abstract isSpeakerphoneEnabled(): boolean;

  /**
   * @ignore
   */
  abstract getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[];

  /**
   * @ignore
   */
  abstract setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number;

  /**
   * @ignore
   */
  abstract startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * @ignore
   */
  abstract startScreenCaptureByScreenRect(
    screenRect: Rectangle,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * @ignore
   */
  abstract getAudioDeviceInfo(): DeviceInfo;

  /**
   * @ignore
   */
  abstract startScreenCaptureByWindowId(
    windowId: any,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * @ignore
   */
  abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

  /**
   * @ignore
   */
  abstract setScreenCaptureScenario(screenScenario: ScreenScenarioType): number;

  /**
   * @ignore
   */
  abstract updateScreenCaptureRegion(regionRect: Rectangle): number;

  /**
   * @ignore
   */
  abstract updateScreenCaptureParameters(
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * @ignore
   */
  abstract startScreenCapture(captureParams: ScreenCaptureParameters2): number;

  /**
   * @ignore
   */
  abstract updateScreenCapture(captureParams: ScreenCaptureParameters2): number;

  /**
   * @ignore
   */
  abstract stopScreenCapture(): number;

  /**
   * @ignore
   */
  abstract getCallId(): string;

  /**
   * @ignore
   */
  abstract rate(callId: string, rating: number, description: string): number;

  /**
   * @ignore
   */
  abstract complain(callId: string, description: string): number;

  /**
   * @ignore
   */
  abstract startRtmpStreamWithoutTranscoding(url: string): number;

  /**
   * @ignore
   */
  abstract startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): number;

  /**
   * @ignore
   */
  abstract updateRtmpTranscoding(transcoding: LiveTranscoding): number;

  /**
   * @ignore
   */
  abstract stopRtmpStream(url: string): number;

  /**
   * @ignore
   */
  abstract startLocalVideoTranscoder(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract updateLocalTranscoderConfiguration(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract stopLocalVideoTranscoder(): number;

  /**
   * @ignore
   */
  abstract startPrimaryCameraCapture(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract startSecondaryCameraCapture(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract stopPrimaryCameraCapture(): number;

  /**
   * @ignore
   */
  abstract stopSecondaryCameraCapture(): number;

  /**
   * @ignore
   */
  abstract setCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  /**
   * @ignore
   */
  abstract setScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  /**
   * @ignore
   */
  abstract startPrimaryScreenCapture(
    config: ScreenCaptureConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract startSecondaryScreenCapture(
    config: ScreenCaptureConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract stopPrimaryScreenCapture(): number;

  /**
   * @ignore
   */
  abstract stopSecondaryScreenCapture(): number;

  /**
   * @ignore
   */
  abstract getConnectionState(): ConnectionStateType;

  /**
   * @ignore
   */
  abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

  /**
   * @ignore
   */
  abstract unregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): boolean;

  /**
   * @ignore
   */
  abstract setRemoteUserPriority(
    uid: number,
    userPriority: PriorityType
  ): number;

  /**
   * @ignore
   */
  abstract setEncryptionMode(encryptionMode: string): number;

  /**
   * @ignore
   */
  abstract setEncryptionSecret(secret: string): number;

  /**
   * @ignore
   */
  abstract enableEncryption(enabled: boolean, config: EncryptionConfig): number;

  /**
   * @ignore
   */
  abstract sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number;

  /**
   * @ignore
   */
  abstract clearVideoWatermark(): number;

  /**
   * @ignore
   */
  abstract clearVideoWatermarks(): number;

  /**
   * @ignore
   */
  abstract addInjectStreamUrl(url: string, config: InjectStreamConfig): number;

  /**
   * @ignore
   */
  abstract removeInjectStreamUrl(url: string): number;

  /**
   * @ignore
   */
  abstract pauseAudio(): number;

  /**
   * @ignore
   */
  abstract resumeAudio(): number;

  /**
   * @ignore
   */
  abstract enableWebSdkInteroperability(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): number;

  /**
   * @ignore
   */
  abstract registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /**
   * @ignore
   */
  abstract unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /**
   * @ignore
   */
  abstract startAudioFrameDump(
    channelId: string,
    userId: number,
    location: string,
    uuid: string,
    passwd: string,
    durationMs: number,
    autoUpload: boolean
  ): number;

  /**
   * @ignore
   */
  abstract stopAudioFrameDump(
    channelId: string,
    userId: number,
    location: string
  ): number;

  /**
   * @ignore
   */
  abstract registerLocalUserAccount(appId: string, userAccount: string): number;

  /**
   * @ignore
   */
  abstract joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: ChannelMediaOptions
  ): number;

  /**
   * @ignore
   */
  abstract getUserInfoByUserAccount(userAccount: string): UserInfo;

  /**
   * @ignore
   */
  abstract getUserInfoByUid(uid: number): UserInfo;

  /**
   * @ignore
   */
  abstract startChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract updateChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract stopChannelMediaRelay(): number;

  /**
   * @ignore
   */
  abstract pauseAllChannelMediaRelay(): number;

  /**
   * @ignore
   */
  abstract resumeAllChannelMediaRelay(): number;

  /**
   * @ignore
   */
  abstract setDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): number;

  /**
   * @ignore
   */
  abstract setDirectCdnStreamingVideoConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number;

  /**
   * @ignore
   */
  abstract stopDirectCdnStreaming(): number;

  /**
   * @ignore
   */
  abstract updateDirectCdnStreamingMediaOptions(
    options: DirectCdnStreamingMediaOptions
  ): number;

  /**
   * @ignore
   */
  abstract startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: AgoraRhythmPlayerConfig
  ): number;

  /**
   * @ignore
   */
  abstract stopRhythmPlayer(): number;

  /**
   * @ignore
   */
  abstract configRhythmPlayer(config: AgoraRhythmPlayerConfig): number;

  /**
   * @ignore
   */
  abstract takeSnapshot(uid: number, filePath: string): number;

  /**
   * @ignore
   */
  abstract enableContentInspect(
    enabled: boolean,
    config: ContentInspectConfig
  ): number;

  /**
   * @ignore
   */
  abstract adjustCustomAudioPublishVolume(
    sourceId: number,
    volume: number
  ): number;

  /**
   * @ignore
   */
  abstract adjustCustomAudioPlayoutVolume(
    sourceId: number,
    volume: number
  ): number;

  /**
   * @ignore
   */
  abstract setCloudProxy(proxyType: CloudProxyType): number;

  /**
   * @ignore
   */
  abstract setLocalAccessPoint(config: LocalAccessPointConfiguration): number;

  /**
   * @ignore
   */
  abstract setAdvancedAudioOptions(options: AdvancedAudioOptions): number;

  /**
   * @ignore
   */
  abstract setAVSyncSource(channelId: string, uid: number): number;

  /**
   * @ignore
   */
  abstract enableVideoImageSource(
    enable: boolean,
    options: ImageTrackOptions
  ): number;

  /**
   * @ignore
   */
  abstract enableWirelessAccelerate(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract joinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number;

  /**
   * @ignore
   */
  abstract leaveChannel(options?: LeaveChannelOptions): number;

  /**
   * @ignore
   */
  abstract setClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): number;

  /**
   * @ignore
   */
  abstract startEchoTest(intervalInSeconds?: number): number;

  /**
   * @ignore
   */
  abstract startPreview(sourceType?: VideoSourceType): number;

  /**
   * @ignore
   */
  abstract stopPreview(sourceType?: VideoSourceType): number;

  /**
   * @ignore
   */
  abstract setAudioProfile(
    profile: AudioProfileType,
    scenario?: AudioScenarioType
  ): number;

  /**
   * @ignore
   */
  abstract startAudioRecording(config: AudioRecordingConfiguration): number;

  /**
   * @ignore
   */
  abstract startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos?: number
  ): number;

  /**
   * @ignore
   */
  abstract setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode?: VideoMirrorModeType
  ): number;

  /**
   * @ignore
   */
  abstract enableDualStreamMode(
    enabled: boolean,
    sourceType?: VideoSourceType,
    streamConfig?: SimulcastStreamConfig
  ): number;

  /**
   * @ignore
   */
  abstract createDataStream(config: DataStreamConfig): number;

  /**
   * @ignore
   */
  abstract addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): number;

  /**
   * @ignore
   */
  abstract joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number;

  /**
   * @ignore
   */
  abstract destroyRendererByView(view: any): void;

  /**
   * @ignore
   */
  abstract destroyRendererByConfig(
    sourceType: VideoSourceType,
    channelId?: string,
    uid?: number
  ): void;

  /**
   * @ignore
   */
  abstract getAudioDeviceManager(): IAudioDeviceManager;

  /**
   * @ignore
   */
  abstract getVideoDeviceManager(): IVideoDeviceManager;

  /**
   * @ignore
   */
  abstract getMediaEngine(): IMediaEngine;

  /**
   * @ignore
   */
  abstract getMediaRecorder(): IMediaRecorder;

  /**
   * @ignore
   */
  abstract getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine;

  /**
   * @ignore
   */
  abstract sendMetaData(
    metadata: Metadata,
    sourceType: VideoSourceType
  ): number;

  /**
   * @ignore
   */
  abstract setMaxMetadataSize(size: number): number;

  /**
   * @ignore
   */
  abstract unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * @ignore
   */
  abstract setParameters(parameters: string): number;
}

/**
 * @ignore
 */
export enum QualityReportFormatType {
  /**
   * @ignore
   */
  QualityReportJson = 0,
  /**
   * @ignore
   */
  QualityReportHtml = 1,
}

/**
 * Media device states.
 */
export enum MediaDeviceStateType {
  /**
   * @ignore
   */
  MediaDeviceStateIdle = 0,
  /**
   * 1: The device is in use.
   */
  MediaDeviceStateActive = 1,
  /**
   * 2: The device is disabled.
   */
  MediaDeviceStateDisabled = 2,
  /**
   * 4: The device is not found.
   */
  MediaDeviceStateNotPresent = 4,
  /**
   * 8: The device is not connected.
   */
  MediaDeviceStateUnplugged = 8,
}

/**
 * The video profile.
 */
export enum VideoProfileType {
  /**
   * 0: 160 × 120, frame rate 15 fps, bitrate 65 Kbps.
   */
  VideoProfileLandscape120p = 0,
  /**
   * 2: 120 × 120, frame rate 15 fps, bitrate 50 Kbps.
   */
  VideoProfileLandscape120p3 = 2,
  /**
   * 10: 320 × 180, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfileLandscape180p = 10,
  /**
   * 12: 180 × 180, frame rate 15 fps, bitrate 100 Kbps.
   */
  VideoProfileLandscape180p3 = 12,
  /**
   * 13: 240 × 180, frame rate 15 fps, bitrate 120 Kbps.
   */
  VideoProfileLandscape180p4 = 13,
  /**
   * 20: 320 × 240, frame rate 15 fps, bitrate 200 Kbps.
   */
  VideoProfileLandscape240p = 20,
  /**
   * 22: 240 × 240, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfileLandscape240p3 = 22,
  /**
   * 23: 424 × 240, frame rate 15 fps, bitrate 220 Kbps.
   */
  VideoProfileLandscape240p4 = 23,
  /**
   * 30: 640 × 360, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape360p = 30,
  /**
   * 32: 360 × 360, frame rate 15 fps, bitrate 260 Kbps.
   */
  VideoProfileLandscape360p3 = 32,
  /**
   * 33: 640 × 360, frame rate 30 fps, bitrate 600 Kbps.
   */
  VideoProfileLandscape360p4 = 33,
  /**
   * 35: 360 × 360, frame rate 30 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape360p6 = 35,
  /**
   * 36: 480 × 360, frame rate 15 fps, bitrate 320 Kbps.
   */
  VideoProfileLandscape360p7 = 36,
  /**
   * 37: 480 × 360, frame rate 30 fps, bitrate 490 Kbps.
   */
  VideoProfileLandscape360p8 = 37,
  /**
   * 38: 640 × 360, frame rate 15 fps, bitrate 800 Kbps.
   * This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p9 = 38,
  /**
   * 39: 640 × 360, frame rate 24 fps, bitrate 800 Kbps.
   * This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p10 = 39,
  /**
   * 100: 640 × 360, frame rate 24 fps, bitrate 1000 Kbps.
   * This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p11 = 100,
  /**
   * 40: 640 × 480, frame rate 15 fps, bitrate 500 Kbps.
   */
  VideoProfileLandscape480p = 40,
  /**
   * 42: 480 × 480, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape480p3 = 42,
  /**
   * 43: 640 × 480, frame rate 30 fps, bitrate 750 Kbps.
   */
  VideoProfileLandscape480p4 = 43,
  /**
   * 45: 480 × 480, frame rate 30 fps, bitrate 600 Kbps.
   */
  VideoProfileLandscape480p6 = 45,
  /**
   * 47: 848 × 480, frame rate 15 fps, bitrate 610 Kbps.
   */
  VideoProfileLandscape480p8 = 47,
  /**
   * 48: 848 × 480, frame rate 30 fps, bitrate 930 Kbps.
   */
  VideoProfileLandscape480p9 = 48,
  /**
   * 49: 640 × 480, frame rate 10 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape480p10 = 49,
  /**
   * 50: 1280 × 720, frame rate 15 fps, bitrate 1130 Kbps.
   */
  VideoProfileLandscape720p = 50,
  /**
   * 52: 1280 × 720, frame rate 30 fps, bitrate 1710 Kbps.
   */
  VideoProfileLandscape720p3 = 52,
  /**
   * 54: 960 × 720, frame rate 15 fps, bitrate 910 Kbps.
   */
  VideoProfileLandscape720p5 = 54,
  /**
   * 55: 960 × 720, frame rate 30 fps, bitrate 1380 Kbps.
   */
  VideoProfileLandscape720p6 = 55,
  /**
   * 60: 1920 × 1080, frame rate 15 fps, bitrate 2080 Kbps.
   */
  VideoProfileLandscape1080p = 60,
  /**
   * 60: 1920 × 1080, frame rate 30 fps, bitrate 3150 Kbps.
   */
  VideoProfileLandscape1080p3 = 62,
  /**
   * 64: 1920 × 1080, frame rate 60 fps, bitrate 4780 Kbps.
   */
  VideoProfileLandscape1080p5 = 64,
  /**
   * @ignore
   */
  VideoProfileLandscape1440p = 66,
  /**
   * @ignore
   */
  VideoProfileLandscape1440p2 = 67,
  /**
   * @ignore
   */
  VideoProfileLandscape4k = 70,
  /**
   * @ignore
   */
  VideoProfileLandscape4k3 = 72,
  /**
   * 1000: 120 × 160, frame rate 15 fps, bitrate 65 Kbps.
   */
  VideoProfilePortrait120p = 1000,
  /**
   * 1002: 120 × 120, frame rate 15 fps, bitrate 50 Kbps.
   */
  VideoProfilePortrait120p3 = 1002,
  /**
   * 1010: 180 × 320, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfilePortrait180p = 1010,
  /**
   * 1012: 180 × 180, frame rate 15 fps, bitrate 100 Kbps.
   */
  VideoProfilePortrait180p3 = 1012,
  /**
   * 1013: 180 × 240, frame rate 15 fps, bitrate 120 Kbps.
   */
  VideoProfilePortrait180p4 = 1013,
  /**
   * 1020: 240 × 320, frame rate 15 fps, bitrate 200 Kbps.
   */
  VideoProfilePortrait240p = 1020,
  /**
   * 1022: 240 × 240, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfilePortrait240p3 = 1022,
  /**
   * 1023: 240 × 424, frame rate 15 fps, bitrate 220 Kbps.
   */
  VideoProfilePortrait240p4 = 1023,
  /**
   * 1030: 360 × 640, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait360p = 1030,
  /**
   * 1032: 360 × 360, frame rate 15 fps, bitrate 260 Kbps.
   */
  VideoProfilePortrait360p3 = 1032,
  /**
   * 1033: 360 × 640, frame rate 15 fps, bitrate 600 Kbps.
   */
  VideoProfilePortrait360p4 = 1033,
  /**
   * 1035: 360 × 360, frame rate 30 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait360p6 = 1035,
  /**
   * 1036: 360 × 480, frame rate 15 fps, bitrate 320 Kbps.
   */
  VideoProfilePortrait360p7 = 1036,
  /**
   * 1037: 360 × 480, frame rate 30 fps, bitrate 490 Kbps.
   */
  VideoProfilePortrait360p8 = 1037,
  /**
   * 1038: 360 × 640, frame rate 15 fps, bitrate 800 Kbps.
   * This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p9 = 1038,
  /**
   * 1039: 360 × 640, frame rate 24 fps, bitrate 800 Kbps.
   * This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p10 = 1039,
  /**
   * 1100: 360 × 640, frame rate 24 fps, bitrate 1000 Kbps.
   * This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p11 = 1100,
  /**
   * 1040: 480 × 640, frame rate 15 fps, bitrate 500 Kbps.
   */
  VideoProfilePortrait480p = 1040,
  /**
   * 1042: 480 × 480, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait480p3 = 1042,
  /**
   * 1043: 480 × 640, frame rate 30 fps, bitrate 750 Kbps.
   */
  VideoProfilePortrait480p4 = 1043,
  /**
   * 1045: 480 × 480, frame rate 30 fps, bitrate 600 Kbps.
   */
  VideoProfilePortrait480p6 = 1045,
  /**
   * 1047: 480 × 848, frame rate 15 fps, bitrate 610 Kbps.
   */
  VideoProfilePortrait480p8 = 1047,
  /**
   * 1048: 480 × 848, frame rate 30 fps, bitrate 930 Kbps.
   */
  VideoProfilePortrait480p9 = 1048,
  /**
   * 1049: 480 × 640, frame rate 10 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait480p10 = 1049,
  /**
   * 1050: 720 × 1280, frame rate 15 fps, bitrate 1130 Kbps.
   */
  VideoProfilePortrait720p = 1050,
  /**
   * 1052: 720 × 1280, frame rate 30 fps, bitrate 1710 Kbps.
   */
  VideoProfilePortrait720p3 = 1052,
  /**
   * 1054: 720 × 960, frame rate 15 fps, bitrate 910 Kbps.
   */
  VideoProfilePortrait720p5 = 1054,
  /**
   * 1055: 720 × 960, frame rate 30 fps, bitrate 1380 Kbps.
   */
  VideoProfilePortrait720p6 = 1055,
  /**
   * 1060: 1080 × 1920, frame rate 15 fps, bitrate 2080 Kbps.
   */
  VideoProfilePortrait1080p = 1060,
  /**
   * 1062: 1080 × 1920, frame rate 30 fps, bitrate 3150 Kbps.
   */
  VideoProfilePortrait1080p3 = 1062,
  /**
   * 1064: 1080 × 1920, frame rate 60 fps, bitrate 4780 Kbps.
   */
  VideoProfilePortrait1080p5 = 1064,
  /**
   * @ignore
   */
  VideoProfilePortrait1440p = 1066,
  /**
   * @ignore
   */
  VideoProfilePortrait1440p2 = 1067,
  /**
   * @ignore
   */
  VideoProfilePortrait4k = 1070,
  /**
   * @ignore
   */
  VideoProfilePortrait4k3 = 1072,
  /**
   * (Default) 640 × 360, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfileDefault = 30,
}

/**
 * @ignore
 */
export class SDKBuildInfo {
  /**
   * @ignore
   */
  build?: number;
  /**
   * @ignore
   */
  version?: string;
}

/**
 * The VideoDeviceInfo class that contains the ID and device name of the video devices.
 */
export class VideoDeviceInfo {
  /**
   * The device ID.
   */
  deviceId?: string;
  /**
   * The device name.
   */
  deviceName?: string;
}

/**
 * The AudioDeviceInfo class that contains the ID and device name of the audio devices.
 */
export class AudioDeviceInfo {
  /**
   * The device ID.
   */
  deviceId?: string;
  /**
   * The device name.
   */
  deviceName?: string;
}
