import AudioMixing from './AudioMixing/AudioMixing'
import SendMultiVideoStream from './SendMultiVideoStream/SendMultiVideoStream.scss'
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay'
import ContentInspect from './ContentInspect/ContentInspect'
import StreamMessage from './StreamMessage/StreamMessage.scss'
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

const advanceRoute = [
  { path: '/AudioMixing', component: AudioMixing, title: 'AudioMixing' },
  { path: '/AudioSpectrum', component: AudioSpectrum, title: 'AudioSpectrum' },
  {
    path: '/CameraAndScreenShare',
    component: SendMultiVideoStream,
    title: 'CameraAndScreenShare',
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
    path: '/CreateDataStream',
    component: StreamMessage,
    title: 'CreateDataStream',
  },
  {
    path: '/DirectCdnStreaming',
    component: DirectCdnStreaming,
    title: 'DirectCdnStreaming',
  },
  {
    path: '/LocalVideoTranscoder',
    component: LocalVideoTranscoder,
    title: 'LocalVideoTranscoder',
  },
  { path: '/MediaPlayer', component: MediaPlayer, title: 'MediaPlayer' },
  {
    path: '/MultipleChannel',
    component: JoinMultipleChannel,
    title: 'MultipleChannel',
  },
  { path: '/RhythmPlayer', component: RhythmPlayer, title: 'RhythmPlayer' },
  { path: '/ScreenShare', component: ScreenShare, title: 'ScreenShare' },
  { path: '/SendMetaData', component: SendMetaData, title: 'SendMetaData' },
  { path: '/SetEncryption', component: Encryption, title: 'SetEncryption' },
  {
    path: '/SetLiveTranscoding',
    component: RTMPStreaming,
    title: 'SetLiveTranscoding',
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
