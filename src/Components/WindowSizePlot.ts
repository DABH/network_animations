import Component from '../Component';
import * as Konva from "konva";

class WindowSizePlot extends Component {
    protected computeShapes(): void {
        let plotYAxis = new Konva.Arrow({
            x: 89,
            y: 460,
            points: [0, 0, 0, -275],
            pointerLength: 20,
            pointerWidth: 20,
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 4
        });
        this.shapes.push(plotYAxis);

        let plotXAxis = new Konva.Arrow({
            x: 72,
            y: 440,
            points: [0, 0, 850, 0],
            pointerLength: 20,
            pointerWidth: 20,
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 4
        });
        this.shapes.push(plotXAxis);

        let plotYAxisLabel = new Konva.Text({
            x: 50,
            y: 250,
            text: 'W',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
        });
        this.shapes.push(plotYAxisLabel);

        let plotXAxisLabel = new Konva.Text({
            x: 750,
            y: 450,
            text: 'Time',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
        });
        this.shapes.push(plotXAxisLabel);

        let windowSizeCurve = new Konva.Line({
            points: [89, 440 - 1 * 10.0],
            stroke: 'red',
            strokeWidth: 4,
            lineCap: 'round',
            lineJoin: 'round',
            id: 'windowSizeCurve'
        });
        this.shapes.push(windowSizeCurve);
    }
}

export default WindowSizePlot;