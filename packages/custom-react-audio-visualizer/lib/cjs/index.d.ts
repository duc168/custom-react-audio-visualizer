import React from 'react';

interface ISetup {
    canvasElement: HTMLCanvasElement;
    audioElement: HTMLAudioElement;
}
declare class AudioConnector$1 {
    private context;
    private analyser;
    private source;
    private FFT_SIZE;
    private SMOOTHING_TIME_CONSTANT;
    constructor();
    setup: (id: string, audioUrl: string, currentColor: string) => ISetup;
    private getContext;
    private setUrl;
    private stop;
    private play;
    private getSource;
    private getCanvasContext;
    private getCanvasElement;
    private getAudioElement;
    private connectAudioSource;
    private getAnalyser;
    private drawBar;
}
declare const audioConnector: AudioConnector$1;

declare class AudioConnector {
    private FFT_SIZE;
    private SMOOTHING_TIME_CONSTANT;
    constructor(id: string, audioUrl: string);
    private setUrl;
    private play;
    private getSource;
    private getCanvasContext;
    private getCanvasElement;
    private getAudioElement;
    private connectAudioSource;
    private getAnalyser;
    private getAudioContext;
    private drawBar;
}

declare const Visualizer: React.FC<any>;

export { AudioConnector as AudioConnectorLegacy, audioConnector, Visualizer as default };
//# sourceMappingURL=index.d.ts.map
