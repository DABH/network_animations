import Component from '../Component';
import * as Konva from "konva";

class Router extends Component {
    protected computeShapes(): void {
        let routerRect = new Konva.Rect({
            x: 433.05,
            y: 7.30,
            width: 150,
            height: 130,
            fill: 'white',
            stroke: 'gray',
            strokeWidth: 4
        });
        this.shapes.push(routerRect);

        let routerBufferBorder = new Konva.Line({
            points: [443, 128, 573, 128, 573, 83, 443, 83],
            stroke: 'black',
            strokeWidth: 4,
            lineCap: 'butt',
            lineJoin: 'butt'
        });
        this.shapes.push(routerBufferBorder);
    }
}

export default Router;