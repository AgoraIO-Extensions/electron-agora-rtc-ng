import { IRtcEngineEx } from './Private/IAgoraRtcEngineEx';
import { RtcEngineExInternal } from './Private/internal/RtcEngineExInternal';
import { IMediaPlayerCacheManager } from './Private/IAgoraMediaPlayer';
import { IMediaPlayerCacheManagerImpl } from './Private/impl/IAgoraMediaPlayerImpl';

export * from './Private/AgoraBase';
export * from './Private/AgoraMediaBase';
export * from './Private/AgoraMediaPlayerTypes';
export * from './Private/IAgoraLog';
export * from './Private/IAgoraMediaEngine';
export * from './Private/IAgoraMediaPlayer';
export * from './Private/IAgoraMediaPlayerSource';
export * from './Private/IAgoraMediaRecorder';
export * from './Private/IAgoraRhythmPlayer';
export * from './Private/IAgoraRtcEngine';
export * from './Private/IAgoraRtcEngineEx';
export * from './Private/IAgoraSpatialAudio';
export * from './Private/IAudioDeviceManager';
export * from './Renderer/RendererManager';
export * from './Types';
export * from './Utils';

const instance = new RtcEngineExInternal();

/**
 * Creates theIRtcEngine object.
 * Currently, the Agora RTC SDK v4.0.0 supports creating only oneIRtcEngine object for an app.
 *
 * @returns
 * IRtcEngine object.
 */
export function createAgoraRtcEngine(): IRtcEngineEx {
  return instance;
}

/**
 * @ignore
 */
export function getMediaPlayerCacheManager(): IMediaPlayerCacheManager {
  return new IMediaPlayerCacheManagerImpl();
}

export default createAgoraRtcEngine;
