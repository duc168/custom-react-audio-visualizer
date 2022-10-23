import React from 'react';

var BarDrawing = /** @class */ (function () {
    function BarDrawing(analyser, canvasHTMLElement, canvasContext, currentColor) {
        if (!canvasContext) {
            throw Error('Canvas Context is null, please check it.');
        }
        this.analyser = analyser;
        this.canvasHtmlElement = canvasHTMLElement;
        this.canvasContext = canvasContext;
        this.currentColor = currentColor;
    }
    BarDrawing.prototype.frameLooper = function () {
        try {
            window.requestAnimationFrame(this.frameLooper.bind(this));
        }
        catch (error) {
            window.webkitRequestAnimationFrame(this.frameLooper.bind(this));
        }
        if (!this.analyser) {
            console.log('no analyser');
            return;
        }
        this.fbcArray = new Uint8Array(this.analyser.frequencyBinCount);
        if (!this.fbcArray) {
            console.log('no fbc array');
            return;
        }
        this.analyser.getByteFrequencyData(this.fbcArray);
        if (!this.canvasContext) {
            console.log('no canvas context');
            return;
        }
        if (this.canvasHtmlElement === null) {
            console.log('no canvas html element');
            return;
        }
        if (this.canvasHtmlElement === undefined) {
            console.log('no canvas html element');
            return;
        }
        this.canvasContext.clearRect(0, 0, this.canvasHtmlElement.width, this.canvasHtmlElement.height); // Clear the canvas
        this.canvasContext.fillStyle = this.currentColor;
        this.bars = 100;
        for (var i = 0; i < this.bars; i++) {
            this.barX = i * 3;
            this.barWidth = 2;
            this.barHeight = this.fbcArray[i] / 3 === 0 ? 0 : -(this.fbcArray[i] / 3);
            //  fillRect( x, y, width, height ) // Explanation of the parameters below
            this.canvasContext.fillRect(this.barX, this.canvasHtmlElement.height, this.barWidth, this.barHeight);
            // console.log('drawing visualizer', this.barX, this.fbcArray[i], this.barWidth, this.barHeight);
        }
    };
    return BarDrawing;
}());

var AudioConnector$1 = /** @class */ (function () {
    function AudioConnector() {
        var _this = this;
        this.FFT_SIZE = Math.pow(2, 10);
        this.SMOOTHING_TIME_CONSTANT = 0;
        this.setup = function (id, audioUrl, currentColor) {
            // console.log('setup audio connector', id, audioUrl);
            var canvasElementId = id + '-canvas';
            var audioElementId = id + '-audio';
            _this.stop(_this.getAudioElement(audioElementId));
            var canvasElement = _this.getCanvasElement(canvasElementId);
            var canvasContext = _this.getCanvasContext(canvasElement);
            var audioElement = _this.getAudioElement(audioElementId);
            var context = _this.getContext();
            _this.analyser = _this.getAnalyser(context, _this.FFT_SIZE, _this.SMOOTHING_TIME_CONSTANT);
            var analyser = _this.analyser;
            var source = _this.getSource(context, audioElement);
            _this.connectAudioSource(source, analyser, context);
            _this.setUrl(audioElement, audioUrl);
            _this.play(audioElement);
            _this.drawBar(analyser, canvasElement, canvasContext, currentColor);
            _this.context = context;
            return {
                canvasElement: canvasElement,
                audioElement: audioElement,
            };
        };
        this.connectAudioSource = function (inputSource, inputAnalyser, inputContext) {
            inputSource.connect(inputAnalyser);
            inputSource.connect(inputContext.destination);
        };
    }
    AudioConnector.prototype.getContext = function () {
        if (this.context) {
            return this.context;
        }
        var context = new AudioContext();
        this.context = context;
        return context;
    };
    AudioConnector.prototype.setUrl = function (audioElement, audioUrl) {
        audioElement.src = audioUrl;
    };
    AudioConnector.prototype.stop = function (audioElement) {
        audioElement.pause();
    };
    AudioConnector.prototype.play = function (audioElement) {
        audioElement.play();
    };
    AudioConnector.prototype.getSource = function (context, audioElement) {
        if (this.source) {
            return this.source;
        }
        var source = context.createMediaElementSource(audioElement);
        this.source = source;
        return source;
    };
    AudioConnector.prototype.getCanvasContext = function (canvasElement) {
        return canvasElement.getContext('2d');
    };
    AudioConnector.prototype.getCanvasElement = function (canvasElementId) {
        if (!document.getElementById(canvasElementId)) {
            var canvasElement = document.createElement("canvas");
            canvasElement.id = canvasElementId;
            document.body.appendChild(canvasElement);
            return canvasElement;
        }
        return document.getElementById(canvasElementId);
    };
    AudioConnector.prototype.getAudioElement = function (audioElementId) {
        if (!document.getElementById(audioElementId)) {
            var audioElement = document.createElement("audio");
            audioElement.id = audioElementId;
            audioElement.crossOrigin = "anonymous";
            audioElement.controls = true;
            document.body.appendChild(audioElement);
            return audioElement;
        }
        return document.getElementById(audioElementId);
    };
    AudioConnector.prototype.getAnalyser = function (context, FFT_SIZE, SMOOTHING_TIME_CONSTANT) {
        if (this.analyser) {
            return this.analyser;
        }
        var analyser = context.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        analyser.smoothingTimeConstant = SMOOTHING_TIME_CONSTANT;
        return analyser;
    };
    AudioConnector.prototype.drawBar = function (analyser, canvasHTMLElement, canvasContext, currentColor) {
        var barDrawing = new BarDrawing(analyser, canvasHTMLElement, canvasContext, currentColor);
        barDrawing.frameLooper();
    };
    return AudioConnector;
}());
var audioConnector = new AudioConnector$1();

var AudioConnector = /** @class */ (function () {
    function AudioConnector(id, audioUrl) {
        this.FFT_SIZE = Math.pow(2, 11);
        this.SMOOTHING_TIME_CONSTANT = 0;
        this.connectAudioSource = function (inputSource, inputAnalyser, inputContext) {
            inputSource.connect(inputAnalyser);
            inputSource.connect(inputContext.destination);
        };
        var canvasElementId = id + '-canvas';
        var audioElementId = id + '-audio';
        var canvasElement = this.getCanvasElement(canvasElementId);
        var canvasContext = this.getCanvasContext(canvasElement);
        var audioElement = this.getAudioElement(audioElementId);
        var context = this.getAudioContext();
        var analyser = this.getAnalyser(context, this.FFT_SIZE, this.SMOOTHING_TIME_CONSTANT);
        var source = this.getSource(context, audioElement);
        this.connectAudioSource(source, analyser, context);
        this.setUrl(audioElement, audioUrl);
        this.play(audioElement);
        this.drawBar(analyser, canvasElement, canvasContext, 'violet');
    }
    AudioConnector.prototype.setUrl = function (audioElement, audioUrl) {
        audioElement.src = audioUrl;
    };
    AudioConnector.prototype.play = function (audioElement) {
        audioElement.play();
    };
    AudioConnector.prototype.getSource = function (context, audioElement) {
        return context.createMediaElementSource(audioElement);
    };
    AudioConnector.prototype.getCanvasContext = function (canvasElement) {
        return canvasElement.getContext('2d');
    };
    AudioConnector.prototype.getCanvasElement = function (canvasElementId) {
        if (!document.getElementById(canvasElementId)) {
            var canvasElement = document.createElement("canvas");
            canvasElement.id = canvasElementId;
            document.body.appendChild(canvasElement);
            return canvasElement;
        }
        return document.getElementById(canvasElementId);
    };
    AudioConnector.prototype.getAudioElement = function (audioElementId) {
        if (!document.getElementById(audioElementId)) {
            var audioElement = document.createElement("audio");
            audioElement.id = audioElementId;
            audioElement.crossOrigin = "anonymous";
            audioElement.controls = true;
            document.body.appendChild(audioElement);
            return audioElement;
        }
        return document.getElementById(audioElementId);
    };
    // private disconnectAudioSource = (inputSource: MediaElementAudioSourceNode, inputAnalyser: AnalyserNode, inputContext: AudioContext) => {
    //     inputSource.disconnect(inputAnalyser);
    //     inputSource.disconnect(inputContext.destination);
    // }
    AudioConnector.prototype.getAnalyser = function (context, FFT_SIZE, SMOOTHING_TIME_CONSTANT) {
        var analyser = context.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        analyser.smoothingTimeConstant = SMOOTHING_TIME_CONSTANT;
        return analyser;
    };
    AudioConnector.prototype.getAudioContext = function () {
        return new AudioContext();
    };
    AudioConnector.prototype.drawBar = function (analyser, canvasHTMLElement, canvasContext, currentColor) {
        var barDrawing = new BarDrawing(analyser, canvasHTMLElement, canvasContext, currentColor);
        barDrawing.frameLooper();
    };
    return AudioConnector;
}());

var Visualizer = function () {
    return React.createElement("div", null);
};

export { AudioConnector as AudioConnectorLegacy, audioConnector, Visualizer as default };
//# sourceMappingURL=index.js.map
