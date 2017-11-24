import Component from '../Component';
import * as Konva from "konva";

class BufferPackets extends Component {
    protected computeShapes(): void {
        for (let i = 1; i <= this.options['bufferCapacity']; i++) {
            let packet = new Konva.Rect({
                x: 553,
                y: 91,
                width: 12,
                height: 30,
                fill: 'blue',
                id: 'QueuePkt' + i.toString(),
                visible: false
            });
            packet.x(packet.x() - (i - 1) * 120 / this.options['bufferCapacity']);
            this.shapes.push(packet);
        }
    }
}

export default BufferPackets;