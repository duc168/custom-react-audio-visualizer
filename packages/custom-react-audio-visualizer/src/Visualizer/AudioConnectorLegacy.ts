import BarDrawing from "./BarDrawing";

export default class AudioConnector {

    private FFT_SIZE = 2 ** 11;
    private SMOOTHING_TIME_CONSTANT = 0;


    constructor(id: string, audioUrl: string) {
        const canvasElementId = id + '-canvas';
        const audioElementId = id + '-audio';

        const canvasElement = this.getCanvasElement(canvasElementId);
        const canvasContext = this.getCanvasContext(canvasElement);

        const audioElement = this.getAudioElement(audioElementId);


        const context = this.getAudioContext();
        const analyser = this.getAnalyser(context, this.FFT_SIZE, this.SMOOTHING_TIME_CONSTANT);

        const source = this.getSource(context, audioElement);
        this.connectAudioSource(source, analyser, context);
        this.setUrl(audioElement, audioUrl);
        this.play(audioElement);
        this.drawBar(analyser, canvasElement, canvasContext, 'violet');
    }

    private setUrl(audioElement: HTMLAudioElement, audioUrl: string) {
        audioElement.src = audioUrl;
    }

    private play(audioElement: HTMLAudioElement) {
        audioElement.play();
    }

    private getSource(context: AudioContext, audioElement: HTMLAudioElement) {
        return context.createMediaElementSource(audioElement);
    }

    private getCanvasContext(canvasElement: HTMLCanvasElement) {
        return canvasElement.getContext('2d');
    }

    private getCanvasElement(canvasElementId: string) {
        if (!document.getElementById(canvasElementId)) {
            const canvasElement = document.createElement("canvas");
            canvasElement.id = canvasElementId;
            document.body.appendChild(canvasElement);
            return canvasElement;
        }
        return document.getElementById(canvasElementId) as HTMLCanvasElement;
    }

    private getAudioElement(audioElementId: string) {
        if (!document.getElementById(audioElementId)) {
            const audioElement = document.createElement("audio");
            audioElement.id = audioElementId;
            audioElement.crossOrigin = "anonymous";
            audioElement.controls = true;
            document.body.appendChild(audioElement);
            return audioElement;
        }
        return document.getElementById(audioElementId) as HTMLAudioElement;
    }

    private connectAudioSource = (inputSource: MediaElementAudioSourceNode, inputAnalyser: AnalyserNode, inputContext: AudioContext) => {
        inputSource.connect(inputAnalyser);
        inputSource.connect(inputContext.destination);
    }

    // private disconnectAudioSource = (inputSource: MediaElementAudioSourceNode, inputAnalyser: AnalyserNode, inputContext: AudioContext) => {
    //     inputSource.disconnect(inputAnalyser);
    //     inputSource.disconnect(inputContext.destination);
    // }

    private getAnalyser(context: AudioContext, FFT_SIZE: number, SMOOTHING_TIME_CONSTANT: number) {
        const analyser = context.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        analyser.smoothingTimeConstant = SMOOTHING_TIME_CONSTANT;
        return analyser;
    }

    private getAudioContext() {
        return new AudioContext();
    }

    private drawBar(analyser: AnalyserNode, canvasHTMLElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D | null, currentColor: string) {
        const barDrawing = new BarDrawing(analyser, canvasHTMLElement, canvasContext, currentColor);
        barDrawing.frameLooper();
    }

}