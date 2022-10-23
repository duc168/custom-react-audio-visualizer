import BarDrawing from "./BarDrawing";

interface ISetup {
    canvasElement: HTMLCanvasElement;
    audioElement: HTMLAudioElement;
}

class AudioConnector {

    // private canvasElement: HTMLCanvasElement;
    // private audioElement: HTMLAudioElement;
    private context: AudioContext;
    private analyser: AnalyserNode;
    private source: MediaElementAudioSourceNode;

    private FFT_SIZE = 2 ** 10;
    private SMOOTHING_TIME_CONSTANT = 0;

    constructor() {

    }

    setup = (id: string, audioUrl: string, currentColor: string): ISetup => {

        // console.log('setup audio connector', id, audioUrl);
        const canvasElementId = id + '-canvas';
        const audioElementId = id + '-audio';
        this.stop(this.getAudioElement(audioElementId));

        const canvasElement = this.getCanvasElement(canvasElementId);
        const canvasContext = this.getCanvasContext(canvasElement);

        const audioElement = this.getAudioElement(audioElementId);

        const context = this.getContext();
        this.analyser = this.getAnalyser(context, this.FFT_SIZE, this.SMOOTHING_TIME_CONSTANT);
        const analyser = this.analyser;

        const source = this.getSource(context, audioElement);

        this.connectAudioSource(source, analyser, context);

        this.setUrl(audioElement, audioUrl);
        this.play(audioElement);
        this.drawBar(analyser, canvasElement, canvasContext, currentColor);

        this.context = context;
        return {
            canvasElement,
            audioElement,
        }
    }

    private getContext() {
        if (this.context) {
            return this.context;
        }
        const context = new AudioContext();
        this.context = context;
        return context;
    }


    private setUrl(audioElement: HTMLAudioElement, audioUrl: string) {
        audioElement.src = audioUrl;
    }

    private stop(audioElement: HTMLAudioElement) {
        audioElement.pause();
    }

    private play(audioElement: HTMLAudioElement) {
        audioElement.play();
    }

    private getSource(context: AudioContext, audioElement: HTMLAudioElement) {
        if (this.source) {
            return this.source;
        }
        const source = context.createMediaElementSource(audioElement);
        this.source = source;
        return source;
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

    private getAnalyser(context: AudioContext, FFT_SIZE: number, SMOOTHING_TIME_CONSTANT: number) {
        if (this.analyser) {
            return this.analyser;
        }
        const analyser = context.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        analyser.smoothingTimeConstant = SMOOTHING_TIME_CONSTANT;
        return analyser;
    }

    private drawBar(analyser: AnalyserNode, canvasHTMLElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D | null, currentColor: string) {
        const barDrawing = new BarDrawing(analyser, canvasHTMLElement, canvasContext, currentColor);
        barDrawing.frameLooper();
    }

}

const audioConnector = new AudioConnector();

export default audioConnector;