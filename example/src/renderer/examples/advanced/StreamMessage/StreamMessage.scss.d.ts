declare namespace StreamMessageScssNamespace {
  export interface IStreamMessageScss {
    msg: string;
    msgList: string;
    toolBarContent: string;
  }
}

declare const StreamMessageScssModule: StreamMessageScssNamespace.IStreamMessageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StreamMessageScssNamespace.IStreamMessageScss;
};

export = StreamMessageScssModule;
