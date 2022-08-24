import { AgoraEnv, logDebug } from '../../Utils';
import { EncodedVideoFrameInfo, ErrorCodeType } from '../AgoraBase';
import {
  AudioFrame,
  ExternalVideoFrame,
  IAudioFrameObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
  MediaSourceType,
} from '../AgoraMediaBase';
import { IMediaEngineImpl } from '../impl/IAgoraMediaEngineImpl';
import { callIrisApi } from './IrisApiEngine';

export class MediaEngineInternal extends IMediaEngineImpl {
  constructor() {
    super();
    logDebug('MediaEngineImplInternal constructor()');
  }

  registerAudioFrameObserver(observer: IAudioFrameObserver): number {
    const res = AgoraEnv.rtcAudioFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.rtcAudioFrameObservers.push(observer);
    }
    return super.registerAudioFrameObserver(observer);
  }

  unregisterAudioFrameObserver(observer: IAudioFrameObserver): number {
    AgoraEnv.rtcAudioFrameObservers = AgoraEnv.rtcAudioFrameObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterAudioFrameObserver(observer);
  }

  registerVideoFrameObserver(observer: IVideoFrameObserver): number {
    const res = AgoraEnv.rtcVideoFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.rtcVideoFrameObservers.push(observer);
    }
    return super.registerVideoFrameObserver(observer);
  }

  unregisterVideoFrameObserver(observer: IVideoFrameObserver): number {
    AgoraEnv.rtcVideoFrameObservers = AgoraEnv.rtcVideoFrameObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterVideoFrameObserver(observer);
  }

  registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    const res = AgoraEnv.rtcVideoEncodedFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.rtcVideoEncodedFrameObservers.push(observer);
    }
    return super.registerVideoEncodedFrameObserver(observer);
  }

  unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    AgoraEnv.rtcVideoEncodedFrameObservers =
      AgoraEnv.rtcVideoEncodedFrameObservers.filter(
        (value) => value !== observer
      );
    return super.unregisterVideoEncodedFrameObserver(observer);
  }

  release() {
    AgoraEnv.rtcAudioFrameObservers = [];
    AgoraEnv.rtcVideoFrameObservers = [];
    AgoraEnv.rtcVideoEncodedFrameObservers = [];
    super.release();
  }

  pushVideoFrame(frame: ExternalVideoFrame, videoTrackId = 0): number {
    const apiType = 'MediaEngine_pushVideoFrame';
    const jsonParams = {
      frame,
      videoTrackId,
      toJSON: () => {
        return {
          frame,
          videoTrackId,
        };
      },
    };

    if (!frame.buffer == null) return ErrorCodeType.ErrInvalidArgument;

    let buffers = [frame.buffer, undefined, undefined];
    frame.buffer = undefined;
    const jsonResults = callIrisApi.call(
      this,
      apiType,
      jsonParams,
      buffers,
      buffers.length
    );
    return jsonResults.result;
  }

  pushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
    videoTrackId?: number
  ): number {
    const apiType = 'MediaEngine_pushEncodedVideoImage';
    const jsonParams = {
      length,
      videoEncodedFrameInfo,
      videoTrackId,
      toJSON: () => {
        return {
          length,
          videoEncodedFrameInfo,
          videoTrackId,
        };
      },
    };

    if (!imageBuffer) return ErrorCodeType.ErrInvalidArgument;

    let bufferArray = [imageBuffer];

    const jsonResults = callIrisApi.call(
      this,
      apiType,
      jsonParams,
      bufferArray,
      bufferArray.length
    );
    return jsonResults.result;
  }

  pushAudioFrame(
    type: MediaSourceType,
    frame: AudioFrame,
    wrap = false,
    sourceId = 0
  ): number {
    const apiType = 'MediaEngine_pushAudioFrame';
    const jsonParams = {
      type,
      frame,
      wrap,
      sourceId,
      toJSON: () => {
        return {
          type,
          frame,
          wrap,
          sourceId,
        };
      },
    };
    if (!frame.buffer) return ErrorCodeType.ErrInvalidArgument;

    let bufferArray = [frame.buffer];
    frame.buffer = undefined;

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
