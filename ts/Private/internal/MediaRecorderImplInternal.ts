import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';
import { RtcConnection } from '../IAgoraRtcEngineEx';
import { IMediaRecorderObserver } from '../AgoraMediaBase';

export class MediaRecorderInternal extends IMediaRecorderImpl {
  static _observers: Map<string, IMediaRecorderObserver> = new Map<
    string,
    IMediaRecorderObserver
  >();

  setMediaRecorderObserver(
    connection: RtcConnection,
    callback: IMediaRecorderObserver
  ): number {
    const key = connection.channelId ?? '' + connection.localUid;
    MediaRecorderInternal._observers.set(key, callback);
    return super.setMediaRecorderObserver(connection, callback);
  }

  release() {
    MediaRecorderInternal._observers.clear();
    super.release();
  }
}