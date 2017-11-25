/*
 * File: WindowSizePlot.ts
 * Description: All components for the window size plot in the SingleAIMDFlow animation.
 *
 * Copyright 2017 <https://github.com/DABH>
 * Adapted in part from work Copyright 2008-2014 Guido Appenzeller.
 *
 * This file is part of network_animations, a collection of network
 * animations built using modern web technologies.
 * (see https://github.com/DABH/web_animations).  It is licensed under the
 * terms described in LICENSE.md.  If you did not receive a copy of this file,
 * see <https://github.com/DABH/web_animations>.
 */

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
            points: [89, 440 - 10.0], // -1*10.0 = -10.0, 10px/packet
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