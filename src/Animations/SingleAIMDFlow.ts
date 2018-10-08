/*
 * File: SingleAIMDFlow.ts
 * Description: An animation demonstrating the principles of a single AIMD flow between a sender and a receiver,
 *              with a router and buffer in the middle.  The sender window size, W, is plotted as a function of time
 *              beneath the network.
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

import Animation from "../Animation";
import Links from "../Components/Links";
import Sender from "../Components/Sender";
import WindowSizePlot from "../Components/WindowSizePlot";
import DynamicLabels from "../Components/DynamicLabels";
import BufferPackets from "../Components/BufferPackets";
import PacketFactory from "../Components/PacketFactory";
import Router from "../Components/Router";
import Receiver from "../Components/Receiver";
import * as Konva from "konva";
import PacketAnimations from "./Util/PacketAnimations";

class SingleAIMDFlow extends Animation {
    // Sender
    sendWindowSize: number = 1.0;
    numPacketsOutstanding: number = 0;
    senderIsTransmitting: boolean = false;
    lostPacketNumber: number = 9999;
    senderCurrentPacketNumber: number = 1;
    numPacketsDropped: number = 0;

    // Router
    numPacketsInBuffer: number = 0;
    routerIsTransmitting: boolean = false;
    linkUtilization: number = 0;
    droppedPacketBufferPosition: number = -1;
    bufferCapacity: number;

    public layers: object = {
        linkLayer: new Konva.Layer(), // ha
        packetLayer: new Konva.Layer(),
        componentLayer: new Konva.Layer(),
    };

    constructor(props?: object) {
        super(props);
        this.bufferCapacity = props['bufferCapacity'] || 8;

        this.stage = this.createStage();
        this.createComponents(this.layers);
        this.stage.add(this.layers['linkLayer']);
        this.stage.add(this.layers['packetLayer']);
        this.stage.add(this.layers['componentLayer']);

        this.addKeyDownActions({
            'ArrowRight': () => {
                this.fps = 40.0;
            },
            'ArrowLeft': () => {
                this.fps = 360.0;
            },
            'ArrowDown': () => {
                this.fps = 120.0;
            }
        });

        window.setInterval(this.updatePlotAndUtilization.bind(this), 5.0/this.fps * 1000.0);
        this.sendPacketFromSender();
    }

    protected createComponents(layerDictionary: object): void {
        new Links().addToLayer(layerDictionary['linkLayer']);
        new Sender().addToLayer(layerDictionary['componentLayer']);
        new Receiver().addToLayer(layerDictionary['componentLayer']);
        new Router().addToLayer(layerDictionary['componentLayer']);
        new WindowSizePlot().addToLayer(layerDictionary['componentLayer']);
        new DynamicLabels({
            sendWindowSize: this.sendWindowSize,
            linkUtilization: this.linkUtilization,
        }).addToLayer(layerDictionary['componentLayer']);
        new BufferPackets({
            bufferCapacity: this.bufferCapacity,
        }).addToLayer(layerDictionary['componentLayer']);
    }

    private dropPacket(): void {
        if(this.lostPacketNumber === 9999)
            this.lostPacketNumber = this.senderCurrentPacketNumber + this.numPacketsOutstanding-2;

        this.numPacketsDropped += 1;
        this.droppedPacketBufferPosition = this.numPacketsInBuffer-1;
        this.stage.find('#dropLabel')[0].x(30);
        this.stage.find('#dropLabel')[0].y(50);
        this.stage.find('#dropLabel')[0].visible(true);
        this.transmitPacket("dropped",false);
    }

    removePacketFromQueue(): void {
        if (!this.routerIsTransmitting && this.numPacketsInBuffer > 0) {
            this.stage.find('#QueuePkt' + this.numPacketsInBuffer.toString())[0].visible(false);
            this.layers['componentLayer'].draw();
            this.numPacketsInBuffer -= 1;
            if (this.droppedPacketBufferPosition === 0) {
                this.transmitPacket("router", true);
                this.droppedPacketBufferPosition = -1;
            } else {
                this.transmitPacket("router", false);
            }
            this.droppedPacketBufferPosition -= 1;
            if (this.droppedPacketBufferPosition > 0) {
                this.stage.find('#dropLabel')[0].x(
                    this.stage.find('#QueuePkt' + this.droppedPacketBufferPosition.toString())[0].x()-10);
            }
            this.routerIsTransmitting = true;
        }
    }

    addPacketToQueue(): void {
        if (this.numPacketsInBuffer < this.bufferCapacity) {
            this.numPacketsInBuffer +=1;
            if (!this.routerIsTransmitting) {  // Currently not transmitting packet
                this.removePacketFromQueue();
            } else {   // If currently transmitting -> queue
                this.stage.find('#QueuePkt'+ this.numPacketsInBuffer.toString())[0].visible(true);
                this.layers['componentLayer'].draw();
            }
        } else {
            this.dropPacket();
        }
    }

    processReceivedPacket(drop: boolean): void {
        this.transmitPacket("ack", drop);
    }

    processReceivedAcknowledgment(): void {
        if (this.senderCurrentPacketNumber >= this.lostPacketNumber) {
            this.sendWindowSize   = Math.trunc(this.sendWindowSize/2.0);
            this.lostPacketNumber  = 9999;
            this.numPacketsOutstanding = this.numPacketsOutstanding - this.numPacketsDropped - 1;
            this.numPacketsDropped = 0;
        } else {
            if (this.sendWindowSize >= this.numPacketsOutstanding) {
                this.sendWindowSize = this.sendWindowSize + 1.0/Math.trunc(this.sendWindowSize)+0.000001;
            }
            this.numPacketsOutstanding -= 1;
            this.sendPacketFromSender();
        }
        (this.stage.find("#windowSizeLabel")[0] as Konva.Text).text('W = '+Math.trunc(10.0* this.sendWindowSize)/10.0);
        this.layers['componentLayer'].draw();
    }

    private transmitPacket(name: string, drop: boolean): void {
        let newPacket: Konva.Shape = PacketFactory[name]();
        newPacket.setAttr('active', true);
        newPacket.setAttr('tx_done', false);
        newPacket.setAttr('drop', drop);
        this.layers['packetLayer'].add(newPacket);
        PacketAnimations[name](newPacket, this, drop).start();
    }

    public sendPacketFromSender(): void {
        if(!this.playing)
            return;
        if(!this.senderIsTransmitting && this.numPacketsOutstanding < Math.trunc(this.sendWindowSize)) {
            this.transmitPacket("sender",false);
            this.numPacketsOutstanding += 1;
            this.senderIsTransmitting = true;
            this.senderCurrentPacketNumber += 1;
        }
    }

    private updatePlotAndUtilization(): void {
        // Check if over, if yes stop
        if(!this.playing)
            return;

        // Plot graph
        this.time += 5.0/ this.fps;
        (this.stage.find('#windowSizeCurve')[0] as Konva.Line).points((this.stage.find('#windowSizeCurve')[0] as Konva.Line)
            .points().concat([89+ this.time, 440.0-this.sendWindowSize*10.0]));
        if(this.time > 695)
            this.playing = false;

        // Update Utilization
        const f: number = 0.01*30.0/this.fps;
        if(this.routerIsTransmitting){
            this.linkUtilization = this.linkUtilization*(1-f)+ f;
        } else {
            this.linkUtilization = this.linkUtilization*(1-f);
        }
        (this.stage.find('#utilizationLabel')[0] as Konva.Text).text(
            'util = '+Math.trunc(this.linkUtilization*20.0+0.5)*5+'%');
        this.layers['componentLayer'].draw();
    }
}

export default SingleAIMDFlow;
