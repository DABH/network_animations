import Component from '../Component';
import * as Konva from "konva";

class DynamicLabels extends Component {
    protected computeShapes(): void {
        let windowSizeLabel = new Konva.Text({
            x: 72,
            y: 76,
            text: 'W = ' + this.options['s_win'].toString(),
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
            id: 'windowSizeLabel'
        });
        this.shapes.push(windowSizeLabel);

        let utilizationLabel = new Konva.Text({
            x: 660,
            y: 140,
            text: 'util = ' + this.options['q_util'].toString() + '%',
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
            id: 'utilizationLabel'
        });
        this.shapes.push(utilizationLabel);

        let dropLabel = new Konva.Text({
            x: 150,
            y: 50,
            text: 'drop',
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
            id: 'dropLabel',
            visible: false
        });
        this.shapes.push(dropLabel);
    }
}

export default DynamicLabels;