import * as Konva from "konva";

class Component {
    public static add(layer: Konva.Layer, componentShapes: Konva.Shape[]): void {
        for (let i = 0; i < componentShapes.length; i++) {
            layer.add(componentShapes[i]);
        }
    };

    public addToLayer(layer: Konva.Layer): void {
        this.computeShapes();
        Component.add(layer, this.shapes);
    };

    constructor(options?: object) {
        this.options = options;
    }

    protected computeShapes(): void {};

    protected shapes: Konva.Shape[] = [];
    protected options: object;
}

export default Component;