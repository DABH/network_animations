import * as Konva from "konva";

class Animation {
    protected width: number;
    protected height: number;
    protected fps: number;
    protected playing: boolean;
    protected stage: Konva.Stage;

    protected createStage(): Konva.Stage {
        return new Konva.Stage({
            container: 'container',
            width: this.width,
            height: this.height
        });
    };

    protected createComponents(layerDictionary: object): void {

    };

    constructor(props?: object) {
        this.width = props['width'] || 1024;
        this.height = props['height'] || 500;
        this.fps = props['fps'] || 120.0;
        this.playing = props['playing'] || true;
    }
}

export default Animation;