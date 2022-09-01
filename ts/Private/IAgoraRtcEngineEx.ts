import './extension/IAgoraRtcEngineExExtension';
import { IRtcEngine, ChannelMediaOptions } from './IAgoraRtcEngine';
import {
  VideoEncoderConfiguration,
  VideoCanvas,
  VideoStreamType,
  VideoSubscriptionOptions,
  SpatialAudioParams,
  VideoMirrorModeType,
  ConnectionStateType,
  EncryptionConfig,
  WatermarkOptions,
  UserInfo,
  VideoSourceType,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  DataStreamConfig,
} from './AgoraBase';
import { RenderModeType } from './AgoraMediaBase';
/**
 * Contains connection information.
 */
export class RtcConnection {
  /**
   * The channel name.
   */
  channelId?: string;
  /**
   * The ID of the local user.
   */
  localUid?: number;
}

/**
 * This interface class contains multi-channel methods.
 * Inherited from IRtcEngine .
 */
export abstract class IRtcEngineEx extends IRtcEngine {
  /**
   * Joins a channel with the connection ID.
   * You can call this method multiple times to join more than one channels. If you are already in a channel, you cannot rejoin it with the same user ID.
   * If you want to join the same channel from different devices, ensure that the user IDs in all devices are different.
   * Ensure that the app ID you use to generate the token is the same with the app ID used when creating the IRtcEngine instance.
   *
   * @param options The channel media options. See ChannelMediaOptions .
   *
   * @param token The token generated on your server for authentication. See
   *
   * @param connection
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   * -2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in the ChannelMediaOptions structure is invalid. You need to pass in a valid parameter and join the channel again.
   * -3: Failes to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.
   * -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   * -8: IRtcEngineThe internal state of the object is wrong. The typical cause is that you call this method to join the channel without calling stopEchoTest to stop the test after calling startEchoTest to start a call loop test. You need to call stopEchoTest before calling this method.
   * -17: The request to join the channel is rejected. The typical cause is that the user is in the channel. Agora recommends using the onConnectionStateChanged callback to get whether the user is in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected(1) state.
   * -102: The channel name is invalid. You need to pass in a valid channel name inchannelId to rejoin the channel.
   * -121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  /**
   * Leaves a channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract leaveChannelEx(connection: RtcConnection): number;

  /**
   * Updates the channel media options after joining the channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param options The channel media options. See ChannelMediaOptions .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   * -2: The value of a member in the ChannelMediaOptions structure is invalid. For example, the token or the user ID is invalid. You need to fill in a valid parameter.
   * -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   * -8: IRtcEngineThe internal state of the object is wrong. The possible reason is that the user is not in the channel. Agora recommends using the onConnectionStateChanged callback to get whether the user is in the channel. If you receive the ConnectionStateDisconnected (1) or ConnectionStateFailed (5) state, the user is not in the channel. You need to call joinChannelWithOptions to join a channel before calling this method.
   */
  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  /**
   * Sets the encoder configuration for the local video.
   * Each configuration profile corresponds to a set of video parameters, including the resolution, frame rate, and bitrate.
   * The config specified in this method is the maximum values under ideal network conditions. If the network condition is not good, the video engine cannot use the
   * config renders local video, which automatically reduces to an appropriate video parameter setting.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param config Video profile. See VideoEncoderConfiguration .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setupRemoteVideoEx(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes receiving the audio stream of a specified user.
   * This method is used to stops or resumes receiving the audio stream of a specified user. You can call this method before or after joining a channel. If a user leaves a channel, the settings in this method become invalid.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param uid The ID of the specified user.
   *
   * @param mute Whether to stop receiving the audio stream of the specified user: true: Stop receiving the audio stream of the specified user.
   *  false: (Default) Resume receiving the audio stream of the specified user.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes receiving the video stream of a specified user.
   * This method is used to stops or resumes receiving the video stream of a specified user. You can call this method before or after joining a channel. If a user leaves a channel, the settings in this method become invalid.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param uid The user ID of the remote user.
   *
   * @param mute Whether to stop receiving the video stream of the specified user:
   *  true: Stop receiving the video stream of the specified user.
   *  false: (Default) Resume receiving the video stream of the specified user.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeAudioBlacklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeAudioWhitelistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeVideoBlacklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeVideoWhitelistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number;

  /**
   * Enables loopback audio capture.
   * If you enable loopback audio capture, the output of the sound card is mixed into the audio stream sent to the other end.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param enabled Sets whether to enable loopback audio capture:
   *  true: Enable loopback audio capture.
   *  false: (Default) Disable loopback audio capture.
   *
   * @param deviceName The device name.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number;

  /**
   * Gets the current connection state of the SDK.
   * You can call this method either before or after joining a channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * The current connection state.  ConnectionStateType
   */
  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  /**
   * @ignore
   */
  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  /**
   * Sends data stream messages.
   * After calling createDataStreamEx , you can call this method to send data stream messages to all users in the channel.
   * The SDK has the following restrictions on this method:
   * Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 kB.
   * Each client can send up to 6 KB of data per second.
   * Each user can have up to five data streams simultaneously. A successful method call triggers the onStreamMessage callback on the remote client, from which the remote user gets the stream message.
   * A failed method call triggers the onStreamMessageError callback on the remote client. Ensure that you call createDataStreamEx to create a data channel before calling this method.
   * This method applies only to the `COMMUNICATION` profile or to the hosts in the `LIVE_BROADCASTING` profile. If an audience in the `LIVE_BROADCASTING` profile calls this method, the audience may be switched to a host.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param streamId The data stream ID. You can get the data stream ID by calling createDataStreamEx.
   *
   * @param data The data to be sent.
   *
   * @param length The length of the data.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  /**
   * Adds a watermark image to the local video.
   * This method adds a PNG watermark image to the local video in the live streaming. Once the watermark image is added, all the audience in the channel (CDN audience included), and the capturing device can see and capture it. Agora supports adding only one watermark image onto the local video, and the newly watermark image replaces the previous one.
   * The watermark coordinatesare dependent on the settings in the setVideoEncoderConfigurationEx method:
   * If the orientation mode of the encoding video ( OrientationMode ) is fixed landscape mode or the adaptive landscape mode, the watermark uses the landscape orientation.
   * If the orientation mode of the encoding video (OrientationMode) is fixed portrait mode or the adaptive portrait mode, the watermark uses the portrait orientation.
   * When setting the watermark position, the region must be less than thesetVideoEncoderConfigurationEx dimensions set in the method; otherwise, the watermark image will be cropped.
   * Ensure that you have called enableVideo before calling this method.
   * This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.
   * If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.
   * If you have enabled the local video preview by calling the startPreview method, you can use the visibleInPreview member to set whether or not the watermark is visible in the preview.
   * If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time. You can implement the watermark function in your application layer.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param options The options of the watermark image to be added.
   *
   * @param watermarkUrl The local file path of the watermark image to be added. This method supports adding a watermark image from the local absolute or relative file path.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  /**
   * Removes the watermark image from the video stream.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  /**
   * Agora supports reporting and analyzing customized messages.
   * Agora supports reporting and analyzing customized messages. This function is in the beta stage with a free trial. The ability provided in its beta test version is reporting a maximum of 10 message pieces within 6 seconds, with each message piece not exceeding 256 bytes and each string not exceeding 100 bytes. To try out this function, contact and discuss the format of customized messages with us.
   */
  abstract sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo;

  /**
   * @ignore
   */
  abstract getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo;

  /**
   * @ignore
   */
  abstract setVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): number;

  /**
   * @ignore
   */
  abstract enableDualStreamModeEx(
    sourceType: VideoSourceType,
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setDualStreamModeEx(
    sourceType: VideoSourceType,
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract enableWirelessAccelerate(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract takeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): number;

  /**
   * @ignore
   */
  abstract createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;
}
