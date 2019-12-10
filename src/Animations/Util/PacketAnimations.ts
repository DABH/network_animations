/*
 * File: PacketAnimations.ts
 * Description: Contains factories for the Konva animations for different types of packets.
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
import SingleAIMDFlow from "../SingleAIMDFlow";

const PacketAnimations = {
    'sender': (newPacket: Konva.Shape, animation: SingleAIMDFlow) => {
        let anim = new Konva.Animation(function () {
            if (!newPacket.getAttr('active'))
                return;
            newPacket.x(newPacket.x() + 2.0 * (430.0 - 164.0) / animation.fps);

            if (newPacket.x() > 430.0) {
                animation.addPacketToQueue();
                newPacket.destroy();
                anim.stop();
            }

            if (!newPacket.getAttr('tx_done') && newPacket.x() > 182.0) {
                newPacket.setAttr('tx_done', true);
                animation.senderIsTransmitting = false;
                animation.sendPacketFromSender();
            }
        }, animation.layers['packetLayer']);
        return anim;
    },
    'router': (newPacket: Konva.Shape, animation: SingleAIMDFlow, drop: boolean) => {
        let anim = new Konva.Animation(function () {
            if (!newPacket.getAttr('active'))
                return;

            newPacket.x(newPacket.x() + (830.0 - 515.0) / animation.fps);

            if (drop) {
                animation.stage.find('#dropLabel')[0].x(
                    animation.stage.find('#QueuePkt1')[0].x() - 10 + newPacket.x() - 475.05);
            }

            if (newPacket.x() > 830.0) {
                animation.processReceivedPacket(drop);
                newPacket.destroy();
                anim.stop();
            }

            if (!newPacket.getAttr('tx_done') && newPacket.x() > 590.0) {
                newPacket.setAttr('tx_done', true);
                animation.routerIsTransmitting = false;
                animation.removePacketFromQueue();
            }
        }, animation.layers['packetLayer']);
        return anim;
    },
    'ack': (newPacket: Konva.Shape, animation: SingleAIMDFlow, drop: boolean) => {
        let anim = new Konva.Animation(function () {
            if (!newPacket.getAttr('active'))
                return;

            if (drop) {
                animation.stage.find('#dropLabel')[0].x(newPacket.x() - 70);
                animation.stage.find('#dropLabel')[0].y(newPacket.y() - 20);
            }

            newPacket.x(newPacket.x() - (845.0 - 164.0) / animation.fps / 1.33);

            if (newPacket.x() < 164.0) {
                animation.processReceivedAcknowledgment();
                if (drop)
                    animation.stage.find('#dropLabel')[0].visible(false);
                newPacket.destroy();
                anim.stop();
            }
        }, animation.layers['packetLayer']);
        return anim;
    },
    'dropped': (newPacket: Konva.Shape, animation: SingleAIMDFlow) => {
        let anim = new Konva.Animation(function () {
            if (!newPacket.getAttr('active'))
                return;

            newPacket.setAttr('dy', newPacket.getAttr('dy') + 2);
            newPacket.y(93 + newPacket.getAttr('dy'));

            if (newPacket.getAttr('dy') > 200) {
                newPacket.destroy();
                anim.stop();
            }
        }, animation.layers['packetLayer']);
        return anim;
    }
};

export default PacketAnimations;
