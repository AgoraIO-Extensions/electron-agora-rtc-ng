import { logDebug } from "../../Utils";
import { EncodedVideoFrameInfo, ErrorCodeType } from "../AgoraBase";
import { AudioFrame, ExternalVideoFrame, MediaSourceType } from "../AgoraMediaBase";
import { IMediaEngineImpl } from "../impl/IAgoraMediaEngineImpl";
import { callIrisApi } from "./IrisApiEngine";

export class MediaEngineImplInternal extends IMediaEngineImpl {
  constructor() {
    super();
    logDebug("MediaEngineImplInternal constructor()");
  }

  override pushVideoFrame(frame: ExternalVideoFrame, videoTrackId = 0): number {
    const apiType = "MediaEngine_pushVideoFrame";
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

    if (frame.buffer == null || frame.buffer == undefined)
      return ErrorCodeType.ErrInvalidArgument;

    let bufferArray = [frame.buffer, undefined, frame.metadata_buffer];
    const jsonResults = callIrisApi.call(
      this,
      apiType,
      jsonParams,
      bufferArray,
      bufferArray.length
    );
    return jsonResults.result;
  }

  override pushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
    videoTrackId?: number
  ): number {
    const apiType = "MediaEngine_pushEncodedVideoImage";
    const jsonParams = {
      imageBuffer,
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

    if (imageBuffer == null || imageBuffer == undefined)
      return ErrorCodeType.ErrInvalidArgument;

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

  override pushAudioFrame(
    type: MediaSourceType,
    frame: AudioFrame,
    wrap = false,
    sourceId = 0
  ): number {
    const apiType = "MediaEngine_pushAudioFrame";
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
    if (frame.buffer == null || frame.buffer == undefined)
      return ErrorCodeType.ErrInvalidArgument;

    let bufferArray = [frame.buffer];

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
