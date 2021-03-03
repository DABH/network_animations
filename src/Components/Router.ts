/*
 * File: Router.ts
 * Description: The router and buffer drawn in the SingleAIMDFlow animation.
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
            lineJoin: 'miter'
        });
        this.shapes.push(routerBufferBorder);
    }
}

export default Router;
