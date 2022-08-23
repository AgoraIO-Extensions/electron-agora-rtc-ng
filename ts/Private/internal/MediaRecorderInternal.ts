import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';
import { RtcConnection } from '../IAgoraRtcEngineEx';
import { IMediaRecorderObserver } from '../AgoraMediaBase';
import { AgoraEnv } from '../../Utils';

export class MediaRecorderInternal extends IMediaRecorderImpl {
  setMediaRecorderObserver(
    connection: RtcConnection,
    callback: IMediaRecorderObserver
  ): number {
    const key = (connection.channelId ?? '') + connection.localUid;
    AgoraEnv.mediaRecorderObservers.set(key, callback);
    return super.setMediaRecorderObserver(connection, callback);
  }

  release() {
    AgoraEnv.mediaRecorderObservers.clear();
    super.release();
  }
}
