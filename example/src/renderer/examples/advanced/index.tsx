import AudioMixing from './AudioMixing/AudioMixing'
import SendMultiVideoStream from './SendMultiVideoStream/SendMultiVideoStream'
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay'
import ContentInspect from './ContentInspect/ContentInspect'
import StreamMessage from './StreamMessage/StreamMessage'
import DirectCdnStreaming from './DirectCdnStreaming/DirectCdnStreaming'
import LocalVideoTranscoder from './LocalVideoTranscoder/LocalVideoTranscoder'
import MediaPlayer from './MediaPlayer/MediaPlayer'
import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel'
import RhythmPlayer from './RhythmPlayer/RhythmPlayer'
import ScreenShare from './ScreenShare/ScreenShare'
import SendMetaData from './SendMetaData/SendMetaData'
import Encryption from './Encryption/Encryption'
import RTMPStreaming from './RTMPStreaming/RTMPStreaming'
import SpatialAudio from './SpatialAudio/SpatialAudio'
import TakeSnapshot from './TakeSnapshot/TakeSnapshot'
import VirtualBackground from './VirtualBackground/VirtualBackground'
import VoiceChanger from './VoiceChanger/VoiceChanger'
import AudioSpectrum from './AudioSpectrum/AudioSpectrum'
import BeautyEffect from './BeautyEffect/BeautyEffect'
import EncodedVideoFrame from './EncodedVideoFrame/EncodedVideoFrame'
import MediaRecorder from './MediaRecorder/MediaRecorder'

const advanceRoute = [
  { path: '/AudioMixing', component: AudioMixing, title: 'AudioMixing' },
  { path: '/AudioSpectrum', component: AudioSpectrum, title: 'AudioSpectrum' },
  { path: '/BeautyEffect', component: BeautyEffect, title: 'BeautyEffect' },
  {
    path: '/SendMultiVideoStream',
    component: SendMultiVideoStream,
    title: 'SendMultiVideoStream',
  },
  {
    path: '/ChannelMediaRelay',
    component: ChannelMediaRelay,
    title: 'ChannelMediaRelay',
  },
  {
    path: '/ContentInspect',
    component: ContentInspect,
    title: 'ContentInspect',
  },
  {
    path: '/StreamMessage',
    component: StreamMessage,
    title: 'StreamMessage',
  },
  {
    path: '/DirectCdnStreaming',
    component: DirectCdnStreaming,
    title: 'DirectCdnStreaming',
  },
  {
    path: '/EncodedVideoFrame',
    component: EncodedVideoFrame,
    title: 'EncodedVideoFrame',
  },
  {
    path: '/LocalVideoTranscoder',
    component: LocalVideoTranscoder,
    title: 'LocalVideoTranscoder',
  },
  { path: '/MediaPlayer', component: MediaPlayer, title: 'MediaPlayer' },
  { path: '/MediaRecorder', component: MediaRecorder, title: 'MediaRecorder' },
  {
    path: '/JoinMultipleChannel',
    component: JoinMultipleChannel,
    title: 'JoinMultipleChannel',
  },
  { path: '/RhythmPlayer', component: RhythmPlayer, title: 'RhythmPlayer' },
  { path: '/ScreenShare', component: ScreenShare, title: 'ScreenShare' },
  { path: '/SendMetaData', component: SendMetaData, title: 'SendMetaData' },
  { path: '/SetEncryption', component: Encryption, title: 'SetEncryption' },
  {
    path: '/RTMPStreaming',
    component: RTMPStreaming,
    title: 'RTMPStreaming',
  },
  { path: '/SpatialAudio', component: SpatialAudio, title: 'SpatialAudio' },
  { path: '/TakeSnapshot', component: TakeSnapshot, title: 'TakeSnapshot' },
  {
    path: '/VirtualBackground',
    component: VirtualBackground,
    title: 'VirtualBackground',
  },
  { path: '/VoiceChanger', component: VoiceChanger, title: 'VoiceChanger' },
]

export default advanceRoute
