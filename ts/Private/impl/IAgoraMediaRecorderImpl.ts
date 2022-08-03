import { callIrisApi } from '../internal/IrisApiEngine'
import { IMediaRecorder } from '../IAgoraMediaRecorder'
import { RtcConnection } from '../IAgoraRtcEngineEx'
import { IMediaRecorderObserver, MediaRecorderConfiguration } from '../AgoraMediaBase'
export class IMediaRecorderImpl implements IMediaRecorder {
  setMediaRecorderObserver (connection: RtcConnection, callback: IMediaRecorderObserver): number {
    const apiType = this.getApiTypeFromSetMediaRecorderObserver(connection, callback)
    const jsonParams = {
      connection,
      callback,
      toJSON: () => {
        return {
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetMediaRecorderObserver (connection: RtcConnection, callback: IMediaRecorderObserver): string {
    return 'MediaRecorder_setMediaRecorderObserver'
  }

  startRecording (connection: RtcConnection, config: MediaRecorderConfiguration): number {
    const apiType = this.getApiTypeFromStartRecording(connection, config)
    const jsonParams = {
      connection,
      config,
      toJSON: () => {
        return {
          connection,
          config
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromStartRecording (connection: RtcConnection, config: MediaRecorderConfiguration): string {
    return 'MediaRecorder_startRecording'
  }

  stopRecording (connection: RtcConnection): number {
    const apiType = this.getApiTypeFromStopRecording(connection)
    const jsonParams = {
      connection,
      toJSON: () => {
        return {
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromStopRecording (connection: RtcConnection): string {
    return 'MediaRecorder_stopRecording'
  }

  release (): void {
    const apiType = this.getApiTypeFromRelease()
    const jsonParams = {
    }
    callIrisApi.call(this, apiType, jsonParams)
  }

  protected getApiTypeFromRelease (): string {
    return 'MediaRecorder_release'
  }
}
