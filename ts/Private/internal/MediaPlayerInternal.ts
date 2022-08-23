import { AgoraEnv, logWarn } from '../../Utils';
import { VideoSourceType } from '../AgoraBase';
import { IAudioSpectrumObserver, RenderModeType } from '../AgoraMediaBase';
import {
  IMediaPlayerAudioFrameObserver,
  IMediaPlayerVideoFrameObserver,
} from '../IAgoraMediaPlayer';
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import { IMediaPlayerImpl } from '../impl/IAgoraMediaPlayerImpl';

export class MediaPlayerInternal extends IMediaPlayerImpl {
  static _observers: IMediaPlayerSourceObserver[] = [];
  _mediaPlayerId: number;

  constructor(mediaPlayerId: number) {
    super();
    this._mediaPlayerId = mediaPlayerId;
  }

  getMediaPlayerId(): number {
    return this._mediaPlayerId;
  }

  registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    AgoraEnv.mpkEventHandlers.push({ mpk: this, handler: observer });
    return 0;
  }

  unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    AgoraEnv.mpkEventHandlers = AgoraEnv.mpkEventHandlers.filter(
      (value) => value.handler !== observer
    );
    return 0;
  }

  registerAudioFrameObserver(observer: IMediaPlayerAudioFrameObserver): number {
    const res = AgoraEnv.mpkAudioFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.mpkAudioFrameObservers.push({
        mpk: this,
        handler: observer,
      });
    }
    return super.registerAudioFrameObserver(observer);
  }

  unregisterAudioFrameObserver(
    observer: IMediaPlayerAudioFrameObserver
  ): number {
    AgoraEnv.mpkAudioFrameObservers = AgoraEnv.mpkAudioFrameObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterAudioFrameObserver(observer);
  }

  registerVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number {
    const res = AgoraEnv.mpkVideoFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.mpkVideoFrameObservers.push({
        mpk: this,
        handler: observer,
      });
    }
    return super.registerVideoFrameObserver(observer);
  }

  unregisterVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): number {
    AgoraEnv.mpkVideoFrameObservers = AgoraEnv.mpkVideoFrameObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterVideoFrameObserver(observer);
  }

  registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): number {
    const res = AgoraEnv.mpkAudioSpectrumObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.mpkAudioSpectrumObservers.push({ mpk: this, handler: observer });
    }
    return super.registerMediaPlayerAudioSpectrumObserver(
      observer,
      intervalInMS
    );
  }

  unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number {
    AgoraEnv.mpkAudioSpectrumObservers =
      AgoraEnv.mpkAudioSpectrumObservers.filter((value) => value !== observer);
    return super.unregisterMediaPlayerAudioSpectrumObserver(observer);
  }

  protected getApiTypeFromSetPlayerOptionInInt(
    key: string,
    value: number
  ): string {
    return 'MediaPlayer_setPlayerOption';
  }

  protected getApiTypeFromSetPlayerOptionInString(
    key: string,
    value: string
  ): string {
    return 'MediaPlayer_setPlayerOption2';
  }

  setView(view: HTMLElement): number {
    logWarn('Also can use other api setupLocalVideo');
    AgoraEnv.AgoraRendererManager?.setupVideo({
      videoSourceType: VideoSourceType.VideoSourceMediaPlayer,
      uid: this._mediaPlayerId,
      view,
    });
    return 0;
  }

  setRenderMode(renderMode: RenderModeType): number {
    logWarn(
      'Also can use other api setRenderOption or setRenderOptionByConfig'
    );
    AgoraEnv.AgoraRendererManager?.setRenderOptionByConfig({
      videoSourceType: VideoSourceType.VideoSourceMediaPlayer,
      uid: this._mediaPlayerId,
      rendererOptions: {
        contentMode:
          renderMode === RenderModeType.RenderModeFit
            ? RenderModeType.RenderModeFit
            : RenderModeType.RenderModeHidden,
        mirror: true,
      },
    });
    return 0;
  }
}
