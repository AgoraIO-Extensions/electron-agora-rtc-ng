import { IRtcEngineEx } from './Private/IAgoraRtcEngineEx';
import { RtcEngineExImplInternal } from './Private/internal/RtcEngineExImplInternal';
import { IMediaPlayerCacheManager } from './Private/IAgoraMediaPlayer';
import { IMediaPlayerCacheManagerImpl } from './Private/impl/IAgoraMediaPlayerImpl';

export * from './Private/AgoraBase';
export * from './Private/AgoraMediaBase';
export * from './Private/AgoraMediaPlayerTypes';
export * from './Private/IAgoraMediaPlayer';
export * from './Private/IAgoraMediaPlayerSource';
export * from './Private/IAgoraRtcEngine';
export * from './Private/IAgoraRtcEngineEx';
export * from './Private/IAudioDeviceManager';
export * from './Private/impl/IAgoraRtcEngineImpl';
export * from './Private/impl/IAudioDeviceManagerImpl';
export * from './Private/internal/RtcEngineExImplInternal';
export * from './Renderer/RendererManager';
export * from './Types';
export * from './Utils';

const instance = new RtcEngineExImplInternal();

/**
 * Creates the IRtcEngine object.
 * Currently, the Agora RTC SDK v4.0.0 supports creating only one IRtcEngine object for an app.
 *
 * @returns
 * IRtcEngine object.
 */
export function createAgoraRtcEngine(): IRtcEngineEx {
  return instance;
}

export function getMediaPlayerCacheManager(): IMediaPlayerCacheManager {
  return new IMediaPlayerCacheManagerImpl();
}
