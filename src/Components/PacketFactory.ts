/*
 * File: PacketFactory.ts
 * Description: Contains factories for the packet components used in the SingleAIMDFlow animation.
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

import Konva from "konva";

const PacketFactory = {
    uid: 100,
    'sender': () => {
        PacketFactory.uid++;
        return new Konva.Rect({
            x: 163.80,
            y: 91,
            width: 12.15,
            height: 30,
            fill: 'blue',
            id: 'sender' + PacketFactory.uid.toString()
        });
    },
    'router': () => {
        PacketFactory.uid++;
        return new Konva.Rect({
            x: 475.05,
            y: 93,
            width: 108.0,
            height: 26,
            fill: 'blue',
            id: 'RouterPkt' + PacketFactory.uid.toString()
        });
    },
    'ack': () => {
        PacketFactory.uid++;
        return new Konva.Rect({
            x: 840.50,
            y: 24,
            width: 14.85,
            height: 14.85,
            fill: 'red',
            id: 'AckPkt' + PacketFactory.uid.toString()
        });
    },
    'dropped': () => {
        PacketFactory.uid++;
        let packet = new Konva.Rect({
            x: 432.05,
            y: 93,
            width: 12.15,
            height: 30,
            fill: 'blue',
            id: 'DroppedPkt' + PacketFactory.uid.toString()
        });
        packet.setAttr('dy', 0);
        return packet;
    }
};

export default PacketFactory;
