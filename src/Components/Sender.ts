/*
 * File: Sender.ts
 * Description: The sender node drawn in the SingleAIMDFlow animation.
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
