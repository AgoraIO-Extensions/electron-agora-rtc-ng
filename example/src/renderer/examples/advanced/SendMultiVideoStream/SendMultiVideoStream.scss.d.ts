declare namespace SendMultiVideoStreamScssNamespace {
  export interface ISendMultiVideoStreamScss {
    previewShot: string
    previewShotBig: string
  }
}

declare const SendMultiVideoStreamScssModule: SendMultiVideoStreamScssNamespace.ISendMultiVideoStreamScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SendMultiVideoStreamScssNamespace.ISendMultiVideoStreamScss
}

export = SendMultiVideoStreamScssModule
