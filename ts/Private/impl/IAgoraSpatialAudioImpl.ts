import { callIrisApi } from '../internal/IrisApiEngine'
import { IBaseSpatialAudioEngine, RemoteVoicePositionInfo, ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio'
import { RtcConnection } from '../IAgoraRtcEngineEx'
export class IBaseSpatialAudioEngineImpl implements IBaseSpatialAudioEngine {
  release (): void {
    const apiType = this.getApiTypeFromRelease()
    const jsonParams = {
    }
    callIrisApi.call(this, apiType, jsonParams)
  }

  protected getApiTypeFromRelease (): string {
    return 'BaseSpatialAudioEngine_release'
  }

  setMaxAudioRecvCount (maxCount: number): number {
    const apiType = this.getApiTypeFromSetMaxAudioRecvCount(maxCount)
    const jsonParams = {
      maxCount,
      toJSON: () => {
        return {
          maxCount
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetMaxAudioRecvCount (maxCount: number): string {
    return 'BaseSpatialAudioEngine_setMaxAudioRecvCount'
  }

  setAudioRecvRange (range: number): number {
    const apiType = this.getApiTypeFromSetAudioRecvRange(range)
    const jsonParams = {
      range,
      toJSON: () => {
        return {
          range
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetAudioRecvRange (range: number): string {
    return 'BaseSpatialAudioEngine_setAudioRecvRange'
  }

  setDistanceUnit (unit: number): number {
    const apiType = this.getApiTypeFromSetDistanceUnit(unit)
    const jsonParams = {
      unit,
      toJSON: () => {
        return {
          unit
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetDistanceUnit (unit: number): string {
    return 'BaseSpatialAudioEngine_setDistanceUnit'
  }

  updateSelfPosition (position: number[], axisForward: number[], axisRight: number[], axisUp: number[]): number {
    const apiType = this.getApiTypeFromUpdateSelfPosition(position, axisForward, axisRight, axisUp)
    const jsonParams = {
      position,
      axisForward,
      axisRight,
      axisUp,
      toJSON: () => {
        return {
          position,
          axisForward,
          axisRight,
          axisUp
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUpdateSelfPosition (position: number[], axisForward: number[], axisRight: number[], axisUp: number[]): string {
    return 'BaseSpatialAudioEngine_updateSelfPosition'
  }

  updateSelfPositionEx (position: number[], axisForward: number[], axisRight: number[], axisUp: number[], connection: RtcConnection): number {
    const apiType = this.getApiTypeFromUpdateSelfPositionEx(position, axisForward, axisRight, axisUp, connection)
    const jsonParams = {
      position,
      axisForward,
      axisRight,
      axisUp,
      connection,
      toJSON: () => {
        return {
          position,
          axisForward,
          axisRight,
          axisUp,
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUpdateSelfPositionEx (position: number[], axisForward: number[], axisRight: number[], axisUp: number[], connection: RtcConnection): string {
    return 'BaseSpatialAudioEngine_updateSelfPositionEx'
  }

  updatePlayerPositionInfo (playerId: number, positionInfo: RemoteVoicePositionInfo): number {
    const apiType = this.getApiTypeFromUpdatePlayerPositionInfo(playerId, positionInfo)
    const jsonParams = {
      playerId,
      positionInfo,
      toJSON: () => {
        return {
          playerId,
          positionInfo
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUpdatePlayerPositionInfo (playerId: number, positionInfo: RemoteVoicePositionInfo): string {
    return 'BaseSpatialAudioEngine_updatePlayerPositionInfo'
  }

  setParameters (params: string): number {
    const apiType = this.getApiTypeFromSetParameters(params)
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

  protected getApiTypeFromSetParameters (params: string): string {
    return 'BaseSpatialAudioEngine_setParameters'
  }

  muteLocalAudioStream (mute: boolean): number {
    const apiType = this.getApiTypeFromMuteLocalAudioStream(mute)
    const jsonParams = {
      mute,
      toJSON: () => {
        return {
          mute
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromMuteLocalAudioStream (mute: boolean): string {
    return 'BaseSpatialAudioEngine_muteLocalAudioStream'
  }

  muteAllRemoteAudioStreams (mute: boolean): number {
    const apiType = this.getApiTypeFromMuteAllRemoteAudioStreams(mute)
    const jsonParams = {
      mute,
      toJSON: () => {
        return {
          mute
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromMuteAllRemoteAudioStreams (mute: boolean): string {
    return 'BaseSpatialAudioEngine_muteAllRemoteAudioStreams'
  }
}

export class ILocalSpatialAudioEngineImpl extends IBaseSpatialAudioEngineImpl implements ILocalSpatialAudioEngine {
  initialize (): number {
    const apiType = this.getApiTypeFromInitialize()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromInitialize (): string {
    return 'LocalSpatialAudioEngine_initialize'
  }

  updateRemotePosition (uid: number, posInfo: RemoteVoicePositionInfo): number {
    const apiType = this.getApiTypeFromUpdateRemotePosition(uid, posInfo)
    const jsonParams = {
      uid,
      posInfo,
      toJSON: () => {
        return {
          uid,
          posInfo
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUpdateRemotePosition (uid: number, posInfo: RemoteVoicePositionInfo): string {
    return 'LocalSpatialAudioEngine_updateRemotePosition'
  }

  updateRemotePositionEx (uid: number, posInfo: RemoteVoicePositionInfo, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromUpdateRemotePositionEx(uid, posInfo, connection)
    const jsonParams = {
      uid,
      posInfo,
      connection,
      toJSON: () => {
        return {
          uid,
          posInfo,
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromUpdateRemotePositionEx (uid: number, posInfo: RemoteVoicePositionInfo, connection: RtcConnection): string {
    return 'LocalSpatialAudioEngine_updateRemotePositionEx'
  }

  removeRemotePosition (uid: number): number {
    const apiType = this.getApiTypeFromRemoveRemotePosition(uid)
    const jsonParams = {
      uid,
      toJSON: () => {
        return {
          uid
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRemoveRemotePosition (uid: number): string {
    return 'LocalSpatialAudioEngine_removeRemotePosition'
  }

  removeRemotePositionEx (uid: number, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromRemoveRemotePositionEx(uid, connection)
    const jsonParams = {
      uid,
      connection,
      toJSON: () => {
        return {
          uid,
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromRemoveRemotePositionEx (uid: number, connection: RtcConnection): string {
    return 'LocalSpatialAudioEngine_removeRemotePositionEx'
  }

  clearRemotePositions (): number {
    const apiType = this.getApiTypeFromClearRemotePositions()
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromClearRemotePositions (): string {
    return 'LocalSpatialAudioEngine_clearRemotePositions'
  }

  clearRemotePositionsEx (connection: RtcConnection): number {
    const apiType = this.getApiTypeFromClearRemotePositionsEx(connection)
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

  protected getApiTypeFromClearRemotePositionsEx (connection: RtcConnection): string {
    return 'LocalSpatialAudioEngine_clearRemotePositionsEx'
  }
}
