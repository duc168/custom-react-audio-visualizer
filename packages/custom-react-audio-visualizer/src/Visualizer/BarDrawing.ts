export default class BarDrawing {
    private analyser: AnalyserNode;
    private canvasHtmlElement: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private currentColor: string;

    private fbcArray?: Uint8Array;
    private bars?: number
    private barX?: number
    private barWidth?: number
    private barHeight?: number
    constructor(analyser: AnalyserNode, canvasHTMLElement: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D | null, currentColor: string) {
        if (!canvasContext) {
            throw Error('Canvas Context is null, please check it.');
        }
        this.analyser = analyser;
        this.canvasHtmlElement = canvasHTMLElement;
        this.canvasContext = canvasContext;
        this.currentColor = currentColor;
    }

    frameLooper() {
        try {
            window.requestAnimationFrame(this.frameLooper.bind(this));
        } catch (error) {
            (window as any).webkitRequestAnimationFrame(this.frameLooper.bind(this));
        }
        if (!this.analyser) {
            console.log('no analyser');
            return
        }
        this.fbcArray = new Uint8Array(this.analyser.frequencyBinCount);
        if (!this.fbcArray) {
            console.log('no fbc array');
            return
        }
        this.analyser.getByteFrequencyData(this.fbcArray);
        if (!this.canvasContext) {
            console.log('no canvas context')
            return
        }
        if (this.canvasHtmlElement === null) {
            console.log('no canvas html element')
            return
        }
        if (this.canvasHtmlElement === undefined) {
            console.log('no canvas html element')
            return
        }
        this.canvasContext.clearRect(0, 0, this.canvasHtmlElement.width, this.canvasHtmlElement.height); // Clear the canvas
        this.canvasContext.fillStyle = this.currentColor;
        this.bars = 100;
        for (let i = 0; i < this.bars; i++) {
            this.barX = i * 3;
            this.barWidth = 2;
            this.barHeight = this.fbcArray[i] / 3 === 0 ? 0 : -(this.fbcArray[i] / 3);
            //  fillRect( x, y, width, height ) // Explanation of the parameters below
            this.canvasContext.fillRect(this.barX, this.canvasHtmlElement.height, this.barWidth, this.barHeight);
            // console.log('drawing visualizer', this.barX, this.fbcArray[i], this.barWidth, this.barHeight);
        }
    }
}
