import Component from '../Component';
import * as Konva from "konva";

class Receiver extends Component {
    protected computeShapes(): void {
        let receiverShape = new Konva.Circle({
            x: 843.75 + 62.5,
            y: 26.65 + 62.5,
            radius: 62.5,
            fill: 'gray'
        });
        this.shapes.push(receiverShape);
    }
}

export default Receiver;