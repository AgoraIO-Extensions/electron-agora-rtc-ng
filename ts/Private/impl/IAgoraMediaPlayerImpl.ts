import { callIrisApi } from '../internal/IrisApiEngine'
import { IMediaPlayer, IMediaPlayerAudioFrameObserver, IMediaPlayerVideoFrameObserver, IMediaPlayerCacheManager } from '../IAgoraMediaPlayer'
import { MediaSource, PlayerStreamInfo, MediaPlayerState } from '../AgoraMediaPlayerTypes'
import { RenderModeType, IAudioSpectrumObserver, AudioDualMonoMode } from '../AgoraMediaBase'
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource'
import { SpatialAudioParams } from '../AgoraBase'
export class IMediaPlayerImpl implements IMediaPlayer {
  getMediaPlayerId (): number {
    const apiType = this.getApiTypeFromGetMediaPlayerId()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetMediaPlayerId (): string {
    return 'MediaPlayer_getMediaPlayerId'
  }

  open (url: string, startPos: number): number {
    const apiType = this.getApiTypeFromOpen(url, startPos)
    const jsonParams = {
      url,
      startPos,
      toJSON: () => {
        return {
          url,
          startPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromOpen (url: string, startPos: number): string {
    return 'MediaPlayer_open'
  }

  openWithMediaSource (source: MediaSource): number {
    const apiType = this.getApiTypeFromOpenWithMediaSource(source)
    const jsonParams = {
      source,
      toJSON: () => {
        return {
          source
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromOpenWithMediaSource (source: MediaSource): string {
    return 'MediaPlayer_openWithMediaSource'
  }

  play (): number {
    const apiType = this.getApiTypeFromPlay()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromPlay (): string {
    return 'MediaPlayer_play'
  }

  pause (): number {
    const apiType = this.getApiTypeFromPause()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromPause (): string {
    return 'MediaPlayer_pause'
  }

  stop (): number {
    const apiType = this.getApiTypeFromStop()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromStop (): string {
    return 'MediaPlayer_stop'
  }

  resume (): number {
    const apiType = this.getApiTypeFromResume()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromResume (): string {
    return 'MediaPlayer_resume'
  }

  seek (newPos: number): number {
    const apiType = this.getApiTypeFromSeek(newPos)
    const jsonParams = {
      newPos,
      toJSON: () => {
        return {
          newPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSeek (newPos: number): string {
    return 'MediaPlayer_seek'
  }

  setAudioPitch (pitch: number): number {
    const apiType = this.getApiTypeFromSetAudioPitch(pitch)
    const jsonParams = {
      pitch,
      toJSON: () => {
        return {
          pitch
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetAudioPitch (pitch: number): string {
    return 'MediaPlayer_setAudioPitch'
  }

  getDuration (): number {
    const apiType = this.getApiTypeFromGetDuration()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const duration = jsonResults.duration
    return duration
  }

  protected getApiTypeFromGetDuration (): string {
    return 'MediaPlayer_getDuration'
  }

  getPlayPosition (): number {
    const apiType = this.getApiTypeFromGetPlayPosition()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const pos = jsonResults.pos
    return pos
  }

  protected getApiTypeFromGetPlayPosition (): string {
    return 'MediaPlayer_getPlayPosition'
  }

  getStreamCount (): number {
    const apiType = this.getApiTypeFromGetStreamCount()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const count = jsonResults.count
    return count
  }

  protected getApiTypeFromGetStreamCount (): string {
    return 'MediaPlayer_getStreamCount'
  }

  getStreamInfo (index: number): PlayerStreamInfo {
    const apiType = this.getApiTypeFromGetStreamInfo(index)
    const jsonParams = {
      index,
      toJSON: () => {
        return {
          index
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const info = jsonResults.info
    return info
  }

  protected getApiTypeFromGetStreamInfo (index: number): string {
    return 'MediaPlayer_getStreamInfo'
  }

  setLoopCount (loopCount: number): number {
    const apiType = this.getApiTypeFromSetLoopCount(loopCount)
    const jsonParams = {
      loopCount,
      toJSON: () => {
        return {
          loopCount
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetLoopCount (loopCount: number): string {
    return 'MediaPlayer_setLoopCount'
  }

  setPlaybackSpeed (speed: number): number {
    const apiType = this.getApiTypeFromSetPlaybackSpeed(speed)
    const jsonParams = {
      speed,
      toJSON: () => {
        return {
          speed
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetPlaybackSpeed (speed: number): string {
    return 'MediaPlayer_setPlaybackSpeed'
  }

  selectAudioTrack (index: number): number {
    const apiType = this.getApiTypeFromSelectAudioTrack(index)
    const jsonParams = {
      index,
      toJSON: () => {
        return {
          index
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSelectAudioTrack (index: number): string {
    return 'MediaPlayer_selectAudioTrack'
  }

  takeScreenshot (filename: string): number {
    const apiType = this.getApiTypeFromTakeScreenshot(filename)
    const jsonParams = {
      filename,
      toJSON: () => {
        return {
          filename
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromTakeScreenshot (filename: string): string {
    return 'MediaPlayer_takeScreenshot'
  }

  selectInternalSubtitle (index: number): number {
    const apiType = this.getApiTypeFromSelectInternalSubtitle(index)
    const jsonParams = {
      index,
      toJSON: () => {
        return {
          index
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSelectInternalSubtitle (index: number): string {
    return 'MediaPlayer_selectInternalSubtitle'
  }

  setExternalSubtitle (url: string): number {
    const apiType = this.getApiTypeFromSetExternalSubtitle(url)
    const jsonParams = {
      url,
      toJSON: () => {
        return {
          url
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetExternalSubtitle (url: string): string {
    return 'MediaPlayer_setExternalSubtitle'
  }

  getState (): MediaPlayerState {
    const apiType = this.getApiTypeFromGetState()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetState (): string {
    return 'MediaPlayer_getState'
  }

  mute (muted: boolean): number {
    const apiType = this.getApiTypeFromMute(muted)
    const jsonParams = {
      muted,
      toJSON: () => {
        return {
          muted
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromMute (muted: boolean): string {
    return 'MediaPlayer_mute'
  }

  getMute (): boolean {
    const apiType = this.getApiTypeFromGetMute()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const muted = jsonResults.muted
    return muted
  }

  protected getApiTypeFromGetMute (): string {
    return 'MediaPlayer_getMute'
  }

  adjustPlayoutVolume (volume: number): number {
    const apiType = this.getApiTypeFromAdjustPlayoutVolume(volume)
    const jsonParams = {
      volume,
      toJSON: () => {
        return {
          volume
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromAdjustPlayoutVolume (volume: number): string {
    return 'MediaPlayer_adjustPlayoutVolume'
  }

  getPlayoutVolume (): number {
    const apiType = this.getApiTypeFromGetPlayoutVolume()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const volume = jsonResults.volume
    return volume
  }

  protected getApiTypeFromGetPlayoutVolume (): string {
    return 'MediaPlayer_getPlayoutVolume'
  }

  adjustPublishSignalVolume (volume: number): number {
    const apiType = this.getApiTypeFromAdjustPublishSignalVolume(volume)
    const jsonParams = {
      volume,
      toJSON: () => {
        return {
          volume
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromAdjustPublishSignalVolume (volume: number): string {
    return 'MediaPlayer_adjustPublishSignalVolume'
  }

  getPublishSignalVolume (): number {
    const apiType = this.getApiTypeFromGetPublishSignalVolume()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const volume = jsonResults.volume
    return volume
  }

  protected getApiTypeFromGetPublishSignalVolume (): string {
    return 'MediaPlayer_getPublishSignalVolume'
  }

  setView (view: any): number {
    const apiType = this.getApiTypeFromSetView(view)
    const jsonParams = {
      view,
      toJSON: () => {
        return {
          view
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetView (view: any): string {
    return 'MediaPlayer_setView'
  }

  setRenderMode (renderMode: RenderModeType): number {
    const apiType = this.getApiTypeFromSetRenderMode(renderMode)
    const jsonParams = {
      renderMode,
      toJSON: () => {
        return {
          renderMode
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetRenderMode (renderMode: RenderModeType): string {
    return 'MediaPlayer_setRenderMode'
  }

  registerPlayerSourceObserver (observer: IMediaPlayerSourceObserver): number {
    const apiType = this.getApiTypeFromRegisterPlayerSourceObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRegisterPlayerSourceObserver (observer: IMediaPlayerSourceObserver): string {
    return 'MediaPlayer_registerPlayerSourceObserver'
  }

  unregisterPlayerSourceObserver (observer: IMediaPlayerSourceObserver): number {
    const apiType = this.getApiTypeFromUnregisterPlayerSourceObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUnregisterPlayerSourceObserver (observer: IMediaPlayerSourceObserver): string {
    return 'MediaPlayer_unregisterPlayerSourceObserver'
  }

  registerMediaPlayerAudioSpectrumObserver (observer: IAudioSpectrumObserver, intervalInMS: number): number {
    const apiType = this.getApiTypeFromRegisterMediaPlayerAudioSpectrumObserver(observer, intervalInMS)
    const jsonParams = {
      observer,
      intervalInMS,
      toJSON: () => {
        return {
          intervalInMS
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRegisterMediaPlayerAudioSpectrumObserver (observer: IAudioSpectrumObserver, intervalInMS: number): string {
    return 'MediaPlayer_registerMediaPlayerAudioSpectrumObserver'
  }

  unregisterMediaPlayerAudioSpectrumObserver (observer: IAudioSpectrumObserver): number {
    const apiType = this.getApiTypeFromUnregisterMediaPlayerAudioSpectrumObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUnregisterMediaPlayerAudioSpectrumObserver (observer: IAudioSpectrumObserver): string {
    return 'MediaPlayer_unregisterMediaPlayerAudioSpectrumObserver'
  }

  setAudioDualMonoMode (mode: AudioDualMonoMode): number {
    const apiType = this.getApiTypeFromSetAudioDualMonoMode(mode)
    const jsonParams = {
      mode,
      toJSON: () => {
        return {
          mode
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetAudioDualMonoMode (mode: AudioDualMonoMode): string {
    return 'MediaPlayer_setAudioDualMonoMode'
  }

  getPlayerSdkVersion (): string {
    const apiType = this.getApiTypeFromGetPlayerSdkVersion()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetPlayerSdkVersion (): string {
    return 'MediaPlayer_getPlayerSdkVersion'
  }

  getPlaySrc (): string {
    const apiType = this.getApiTypeFromGetPlaySrc()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetPlaySrc (): string {
    return 'MediaPlayer_getPlaySrc'
  }

  openWithAgoraCDNSrc (src: string, startPos: number): number {
    const apiType = this.getApiTypeFromOpenWithAgoraCDNSrc(src, startPos)
    const jsonParams = {
      src,
      startPos,
      toJSON: () => {
        return {
          src,
          startPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromOpenWithAgoraCDNSrc (src: string, startPos: number): string {
    return 'MediaPlayer_openWithAgoraCDNSrc'
  }

  getAgoraCDNLineCount (): number {
    const apiType = this.getApiTypeFromGetAgoraCDNLineCount()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetAgoraCDNLineCount (): string {
    return 'MediaPlayer_getAgoraCDNLineCount'
  }

  switchAgoraCDNLineByIndex (index: number): number {
    const apiType = this.getApiTypeFromSwitchAgoraCDNLineByIndex(index)
    const jsonParams = {
      index,
      toJSON: () => {
        return {
          index
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSwitchAgoraCDNLineByIndex (index: number): string {
    return 'MediaPlayer_switchAgoraCDNLineByIndex'
  }

  getCurrentAgoraCDNIndex (): number {
    const apiType = this.getApiTypeFromGetCurrentAgoraCDNIndex()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetCurrentAgoraCDNIndex (): string {
    return 'MediaPlayer_getCurrentAgoraCDNIndex'
  }

  enableAutoSwitchAgoraCDN (enable: boolean): number {
    const apiType = this.getApiTypeFromEnableAutoSwitchAgoraCDN(enable)
    const jsonParams = {
      enable,
      toJSON: () => {
        return {
          enable
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromEnableAutoSwitchAgoraCDN (enable: boolean): string {
    return 'MediaPlayer_enableAutoSwitchAgoraCDN'
  }

  renewAgoraCDNSrcToken (token: string, ts: number): number {
    const apiType = this.getApiTypeFromRenewAgoraCDNSrcToken(token, ts)
    const jsonParams = {
      token,
      ts,
      toJSON: () => {
        return {
          token,
          ts
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRenewAgoraCDNSrcToken (token: string, ts: number): string {
    return 'MediaPlayer_renewAgoraCDNSrcToken'
  }

  switchAgoraCDNSrc (src: string, syncPts = false): number {
    const apiType = this.getApiTypeFromSwitchAgoraCDNSrc(src, syncPts)
    const jsonParams = {
      src,
      syncPts,
      toJSON: () => {
        return {
          src,
          syncPts
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSwitchAgoraCDNSrc (src: string, syncPts = false): string {
    return 'MediaPlayer_switchAgoraCDNSrc'
  }

  switchSrc (src: string, syncPts = true): number {
    const apiType = this.getApiTypeFromSwitchSrc(src, syncPts)
    const jsonParams = {
      src,
      syncPts,
      toJSON: () => {
        return {
          src,
          syncPts
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSwitchSrc (src: string, syncPts = true): string {
    return 'MediaPlayer_switchSrc'
  }

  preloadSrc (src: string, startPos: number): number {
    const apiType = this.getApiTypeFromPreloadSrc(src, startPos)
    const jsonParams = {
      src,
      startPos,
      toJSON: () => {
        return {
          src,
          startPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromPreloadSrc (src: string, startPos: number): string {
    return 'MediaPlayer_preloadSrc'
  }

  playPreloadedSrc (src: string): number {
    const apiType = this.getApiTypeFromPlayPreloadedSrc(src)
    const jsonParams = {
      src,
      toJSON: () => {
        return {
          src
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromPlayPreloadedSrc (src: string): string {
    return 'MediaPlayer_playPreloadedSrc'
  }

  unloadSrc (src: string): number {
    const apiType = this.getApiTypeFromUnloadSrc(src)
    const jsonParams = {
      src,
      toJSON: () => {
        return {
          src
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUnloadSrc (src: string): string {
    return 'MediaPlayer_unloadSrc'
  }

  setSpatialAudioParams (params: SpatialAudioParams): number {
    const apiType = this.getApiTypeFromSetSpatialAudioParams(params)
    const jsonParams = {
      params,
      toJSON: () => {
        return {
          params
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetSpatialAudioParams (params: SpatialAudioParams): string {
    return 'MediaPlayer_setSpatialAudioParams'
  }

  setSoundPositionParams (pan: number, gain: number): number {
    const apiType = this.getApiTypeFromSetSoundPositionParams(pan, gain)
    const jsonParams = {
      pan,
      gain,
      toJSON: () => {
        return {
          pan,
          gain
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetSoundPositionParams (pan: number, gain: number): string {
    return 'MediaPlayer_setSoundPositionParams'
  }

  registerAudioFrameObserver (observer: IMediaPlayerAudioFrameObserver): number {
    const apiType = this.getApiTypeFromRegisterAudioFrameObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRegisterAudioFrameObserver (observer: IMediaPlayerAudioFrameObserver): string {
    return 'MediaPlayer_registerAudioFrameObserver'
  }

  unregisterAudioFrameObserver (observer: IMediaPlayerAudioFrameObserver): number {
    const apiType = this.getApiTypeFromUnregisterAudioFrameObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUnregisterAudioFrameObserver (observer: IMediaPlayerAudioFrameObserver): string {
    return 'MediaPlayer_unregisterAudioFrameObserver'
  }

  registerVideoFrameObserver (observer: IMediaPlayerVideoFrameObserver): number {
    const apiType = this.getApiTypeFromRegisterVideoFrameObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRegisterVideoFrameObserver (observer: IMediaPlayerVideoFrameObserver): string {
    return 'MediaPlayer_registerVideoFrameObserver'
  }

  unregisterVideoFrameObserver (observer: IMediaPlayerVideoFrameObserver): number {
    const apiType = this.getApiTypeFromUnregisterVideoFrameObserver(observer)
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUnregisterVideoFrameObserver (observer: IMediaPlayerVideoFrameObserver): string {
    return 'MediaPlayer_unregisterVideoFrameObserver'
  }

  setPlayerOptionInInt (key: string, value: number): number {
    const apiType = this.getApiTypeFromSetPlayerOptionInInt(key, value)
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetPlayerOptionInInt (key: string, value: number): string {
    return 'MediaPlayer_setPlayerOptionInInt'
  }

  setPlayerOptionInString (key: string, value: string): number {
    const apiType = this.getApiTypeFromSetPlayerOptionInString(key, value)
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetPlayerOptionInString (key: string, value: string): string {
    return 'MediaPlayer_setPlayerOptionInString'
  }
}

export class IMediaPlayerCacheManagerImpl implements IMediaPlayerCacheManager {
  removeAllCaches (): number {
    const apiType = this.getApiTypeFromRemoveAllCaches()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRemoveAllCaches (): string {
    return 'MediaPlayerCacheManager_removeAllCaches'
  }

  removeOldCache (): number {
    const apiType = this.getApiTypeFromRemoveOldCache()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRemoveOldCache (): string {
    return 'MediaPlayerCacheManager_removeOldCache'
  }

  removeCacheByUri (uri: string): number {
    const apiType = this.getApiTypeFromRemoveCacheByUri(uri)
    const jsonParams = {
      uri,
      toJSON: () => {
        return {
          uri
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRemoveCacheByUri (uri: string): string {
    return 'MediaPlayerCacheManager_removeCacheByUri'
  }

  setCacheDir (path: string): number {
    const apiType = this.getApiTypeFromSetCacheDir(path)
    const jsonParams = {
      path,
      toJSON: () => {
        return {
          path
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetCacheDir (path: string): string {
    return 'MediaPlayerCacheManager_setCacheDir'
  }

  setMaxCacheFileCount (count: number): number {
    const apiType = this.getApiTypeFromSetMaxCacheFileCount(count)
    const jsonParams = {
      count,
      toJSON: () => {
        return {
          count
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetMaxCacheFileCount (count: number): string {
    return 'MediaPlayerCacheManager_setMaxCacheFileCount'
  }

  setMaxCacheFileSize (cacheSize: number): number {
    const apiType = this.getApiTypeFromSetMaxCacheFileSize(cacheSize)
    const jsonParams = {
      cacheSize,
      toJSON: () => {
        return {
          cacheSize
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetMaxCacheFileSize (cacheSize: number): string {
    return 'MediaPlayerCacheManager_setMaxCacheFileSize'
  }

  enableAutoRemoveCache (enable: boolean): number {
    const apiType = this.getApiTypeFromEnableAutoRemoveCache(enable)
    const jsonParams = {
      enable,
      toJSON: () => {
        return {
          enable
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromEnableAutoRemoveCache (enable: boolean): string {
    return 'MediaPlayerCacheManager_enableAutoRemoveCache'
  }

  getCacheDir (length: number): string {
    const apiType = this.getApiTypeFromGetCacheDir(length)
    const jsonParams = {
      length,
      toJSON: () => {
        return {
          length
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const path = jsonResults.path
    return path
  }

  protected getApiTypeFromGetCacheDir (length: number): string {
    return 'MediaPlayerCacheManager_getCacheDir'
  }

  getMaxCacheFileCount (): number {
    const apiType = this.getApiTypeFromGetMaxCacheFileCount()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetMaxCacheFileCount (): string {
    return 'MediaPlayerCacheManager_getMaxCacheFileCount'
  }

  getMaxCacheFileSize (): number {
    const apiType = this.getApiTypeFromGetMaxCacheFileSize()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetMaxCacheFileSize (): string {
    return 'MediaPlayerCacheManager_getMaxCacheFileSize'
  }

  getCacheFileCount (): number {
    const apiType = this.getApiTypeFromGetCacheFileCount()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromGetCacheFileCount (): string {
    return 'MediaPlayerCacheManager_getCacheFileCount'
  }
}

export function processIMediaPlayerAudioFrameObserver (handler: IMediaPlayerAudioFrameObserver, event: string, jsonParams: any) {
  switch (event) {
    case 'onFrame':
      if (handler.onFrame !== undefined) {
        handler.onFrame(jsonParams.frame)
      }
      break
  }
}

export function processIMediaPlayerVideoFrameObserver (handler: IMediaPlayerVideoFrameObserver, event: string, jsonParams: any) {
  switch (event) {
    case 'onFrame':
      if (handler.onFrame !== undefined) {
        handler.onFrame(jsonParams.frame)
      }
      break
  }
}
