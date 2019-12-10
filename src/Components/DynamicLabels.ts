/*
 * File: DynamicLabels.ts
 * Description: The dynamic labels used in the SingleAIMDFlow animation.
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
import Konva from "konva";

class DynamicLabels extends Component {
    protected computeShapes(): void {
        let windowSizeLabel = new Konva.Text({
            x: 72,
            y: 76,
            text: 'W = ' + this.options['sendWindowSize'].toString(),
            fontSize: 24,
            fontFamily: 'Calibri',
            fill: 'black',
            id: 'windowSizeLabel'
        });
        this.shapes.push(windowSizeLabel);

        let utilizationLabel = new Konva.Text({
            x: 660,
            y: 140,
            text: 'util = ' + this.options['linkUtilization'].toString() + '%',
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
