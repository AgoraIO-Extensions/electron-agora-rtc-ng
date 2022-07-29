import { AgoraElectronBridge, Result } from "../../Types";
import { AgoraEnv, logDebug, logError, logWarn, parseJSON } from "../../Utils";
import { IMediaPlayer } from "../IAgoraMediaPlayer";
import { IDirectCdnStreamingEventHandler } from "../IAgoraRtcEngine";
import { processIMediaPlayerSourceObserver } from "../impl/IAgoraMediaPlayerSourceImpl";
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from "../impl/IAgoraRtcEngineImpl";
const agora = require("../../../build/Release/agora_node_ext");

const MetadataSplitString = "MetadataObserver_";
const MediaPlayerSplitString = "MediaPlayerSourceObserver_";

export const getBridge = (): AgoraElectronBridge => {
  let bridge = AgoraEnv.AgoraElectronBridge;
  if (!bridge) {
    bridge = new agora.AgoraElectronBridge();
    bridge!.sendMsg = sendMsg;
    AgoraEnv.AgoraElectronBridge = bridge;
  }
  return bridge!;
};

export const handlerRTCEvent = function (
  event: string,
  data: string,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
) {
  const parseData = "onApiError" === event ? data : parseJSON(data);
  logDebug(
    "event",
    event,
    "data",
    parseData,
    "buffer",
    buffer,
    "bufferLength",
    bufferLength,
    "bufferCount",
    bufferCount
  );
  const isEx = event.endsWith("Ex");
  const isMetadata = event.startsWith("MetadataObserver");
  preProcessEvent(event, parseData, buffer, bufferLength, bufferCount);

  if (!isMetadata) {
    AgoraEnv.rtcEventHandlers.forEach((value) => {
      if (!value) {
        return;
      }
      if (event.endsWith("Ex")) {
        event = event.replace("Ex", "");
      }

      if (event.startsWith("DirectCdnStreamingEventHandler_")) {
        event = event.replace("DirectCdnStreamingEventHandler_", "");
        try {
          processIDirectCdnStreamingEventHandler(
            value as IDirectCdnStreamingEventHandler,
            event,
            parseData
          );
        } catch (error) {
          logError(
            "rtcEventHandlers::processIDirectCdnStreamingEventHandler",
            error
          );
        }
        return;
      }

      try {
        processIRtcEngineEventHandler(value, event, parseData);
      } catch (error) {
        logError("rtcEventHandlers::processIRtcEngineEventHandler", error);
      }
    });
  }

  if (isMetadata) {
    let splitStr = event.split(MetadataSplitString);
    AgoraEnv.metadataObservers.forEach((value) => {
      processIMetadataObserver(value, splitStr[1], parseData);
    });
  }
};

export const handlerMPKEvent = function (
  event: string,
  data: string,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
) {
  const obj = parseJSON(data);
  logDebug(
    "event",
    event,
    "data",
    obj,
    "buffer",
    buffer,
    "bufferLength",
    bufferLength,
    "bufferCount",
    bufferCount
  );

  let splitStr = event.split(MediaPlayerSplitString);
  logDebug("agora  ", splitStr);
  AgoraEnv.mpkEventHandlers.forEach((value) => {
    if (!value) {
      return;
    }
    try {
      processIMediaPlayerSourceObserver(value.handler, splitStr[1], obj);
    } catch (error) {
      logError("mpkEventHandlers::processIMediaPlayerSourceObserver");
    }
  });
};

export const handlerObserverEvent = function (
  event: string,
  data: string,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
) {
  logDebug("handlerObserverEvent ==");
};

export const sendMsg = (
  funcName: string,
  params: any,
  buffer?: (Uint8Array | undefined)[],
  bufferCount = 0
): Result => {
  const irisReturnValue = getBridge().CallApi(
    funcName,
    JSON.stringify(params),
    buffer,
    bufferCount
  );
  logDebug(
    "sendMsg",
    "funcName",
    funcName,
    "params",
    params,
    "irisReturnValue",
    irisReturnValue
  );

  const result = parseJSON(irisReturnValue.callApiResult);
  return result;
};

const ResultOk = {
  result: 0,
};
const ResultFail = {
  result: 0,
};

export function callIrisApi(
  funcName: string,
  params: any,
  buffer?: (Uint8Array | undefined)[],
  bufferCount: number = 0
): any {
  const isMediaPlayer = funcName.startsWith("MediaPlayer_");
  if (isMediaPlayer) {
    //@ts-ignore
    params.mediaPlayerId = (this as IMediaPlayer).getMediaPlayerId();
    const json = params.toJSON?.call();
    params.toJSON = function () {
      return { ...json, playerId: params.mediaPlayerId };
    };
  }
  return sendMsg(funcName, params, buffer, bufferCount);
}

function preProcessEvent(
  event: string,
  data: any,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
): any {
  switch (event) {
    case "onStreamMessage":
    case "onStreamMessageEx":
      data.data = buffer[0];
      break;
    case "MetadataObserver_onMetadataReceived":
      data.metadata.buffer = buffer[0];
      break;
  }
}
