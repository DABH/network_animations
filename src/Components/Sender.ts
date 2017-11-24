import Component from '../Component';
import * as Konva from "konva";

class Sender extends Component {
    protected computeShapes(): void {
        let senderShape = new Konva.Circle({
            x: 52.55 + 62.5,
            y: 26.65 + 62.5,
            radius: 62.5,
            fill: 'gray'
        });
        this.shapes.push(senderShape);
    }
}

export default Sender;