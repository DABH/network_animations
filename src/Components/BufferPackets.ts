/*
 * File: BufferPackets.ts
 * Description: Packets that appear in the router buffer in the SingleAIMDFlow animation.
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