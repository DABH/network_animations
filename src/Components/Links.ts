import Component from '../Component';
import * as Konva from "konva";

class Links extends Component {
    protected computeShapes(): void {
        let senderToRouterArrow = new Konva.Arrow({
            x: 173.8,
            y: 105.50,
            points: [0, 0, 255, 0],
            pointerLength: 20,
            pointerWidth: 20,
            fill: '#5688BA',
            stroke: '#5688BA',
            strokeWidth: 4
        });
        this.shapes.push(senderToRouterArrow);

        let routerToReceiverArrow = new Konva.Arrow({
            x: 585,
            y: 105.50,
            points: [0, 0, 258.25, 0],
            pointerLength: 20,
            pointerWidth: 20,
            fill: '#5688BA',
            stroke: '#5688BA',
            strokeWidth: 4
        });
        this.shapes.push(routerToReceiverArrow);

        let receiverToSenderArc = new Konva.Arrow({
            x: 890,
            y: 32.30,
            points: [0, 0, -750, 0],
            pointerLength: 20,
            pointerWidth: 20,
            fill: '#5688BA',
            stroke: '#5688BA',
            strokeWidth: 4
        });
        this.shapes.push(receiverToSenderArc);
    }
}

export default Links;