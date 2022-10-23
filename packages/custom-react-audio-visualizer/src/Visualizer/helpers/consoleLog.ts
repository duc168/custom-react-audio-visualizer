class LogModel {
    private model: string = '';
    log(...arg: any[]) {
        const parameters = [
            `[${this.model.toUpperCase()}]`,
            ...arg,
        ]
        console.log(...parameters);
    }

    error(...arg: any[]) {
        const parameters = [
            `[${this.model.toUpperCase()}]`,
            ...arg,
        ]
        console.error(...parameters);
    }

    constructor(modelName: string) {
        this.model = modelName;
    }
}

export default {
    LogModel
};