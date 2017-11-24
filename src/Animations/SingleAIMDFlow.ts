import Animation from "../Animation";
import Links from "../Components/Links";
import Sender from "../Components/Sender";
import WindowSizePlot from "../Components/WindowSizePlot";
import DynamicLabels from "../Components/DynamicLabels";
import BufferPackets from "../Components/BufferPackets";
import Router from "../Components/Router";
import Receiver from "../Components/Receiver";
import * as Konva from "konva";

class SingleAIMDFlow extends Animation {
    uid: number = 100;
    time: number = 0.0;

    // sender
    s_win: number = 1.0;
    s_out: number = 0;
    s_tx: boolean = false;
    s_lost: number = 9999;
    s_pktno: number = 1;
    s_dropc: number = 0;

    // router
    q_queue: number = 0;
    q_tx: boolean = false;
    q_util: number = 0;
    q_droppkt: number = -1;
    q_buffer: number = 8;

    private layers: object = {
        linkLayer: new Konva.Layer(), // ha
        packetLayer: new Konva.Layer(),
        componentLayer: new Konva.Layer(),
    };

    constructor(props?: object) {
        super(props);
        this.q_buffer = props['bufferCapacity'] || 8;

        this.stage = this.createStage();
        this.createComponents(this.layers);
        this.stage.add(this.layers['linkLayer']);
        this.stage.add(this.layers['packetLayer']);
        this.stage.add(this.layers['componentLayer']);

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key === 'ArrowRight') {
                this.fps = 40.0;
            }
            if (key === 'ArrowLeft') {
                this.fps = 360.0;
            }
            if (key === 'ArrowDown') {
                this.fps = 120.0;
            }
        });

        window.setInterval(this.updatePlotAndUtilization.bind(this), 5.0/this.fps * 1000.0);
        this.do_sender();
    }

    protected createComponents(layerDictionary: object): void {
        new Links().addToLayer(layerDictionary['linkLayer']);
        new Sender().addToLayer(layerDictionary['componentLayer']);
        new Receiver().addToLayer(layerDictionary['componentLayer']);
        new Router().addToLayer(layerDictionary['componentLayer']);
        new WindowSizePlot().addToLayer(layerDictionary['componentLayer']);
        new DynamicLabels({
            s_win: this.s_win,
            q_util: this.q_util,
        }).addToLayer(layerDictionary['componentLayer']);
        new BufferPackets({
            bufferCapacity: this.q_buffer,
        }).addToLayer(layerDictionary['componentLayer']);
    }

    private drop_pkt(): void {
        if(this.s_lost === 9999)
            this.s_lost = this.s_pktno + this.s_out-2;

        this.s_dropc += 1;
        this.q_droppkt = this.q_queue-1;
        this.stage.find('#dropLabel')[0].x(30);
        this.stage.find('#dropLabel')[0].y(50);
        this.stage.find('#dropLabel')[0].visible(true);
        this.tx_packet("dropped",false);
    }

    private rem_queue(): void {
        if (!this.q_tx && this.q_queue > 0) {
            this.stage.find('#QueuePkt' + this.q_queue.toString())[0].visible(false);
            this.layers['componentLayer'].draw();
            this.q_queue -= 1;
            if (this.q_droppkt === 0) {
                this.tx_packet("RouterPktI", true);
                this.q_droppkt = -1;
            } else {
                this.tx_packet("RouterPktI", false);
            }
            this.q_droppkt -= 1;
            if (this.q_droppkt > 0) {
                this.stage.find('#dropLabel')[0].x(this.stage.find('#QueuePkt' + this.q_droppkt.toString())[0].x()-10);
            }
            this.q_tx = true;
        }
    }

    private add_queue(): void {
        if (this.q_queue < this.q_buffer) {
            this.q_queue +=1;
            if (!this.q_tx) {  // Currently not transmitting packet
                this.rem_queue();
            } else {   // If currently transmitting -> queue
                this.stage.find('#QueuePkt'+ this.q_queue.toString())[0].visible(true);
                this.layers['componentLayer'].draw();
            }
        } else {
            this.drop_pkt();
        }
    }

    private createNewPacket(name, uid): Konva.Shape {
        if(name === 'sender'){
            return new Konva.Rect({
                x: 163.80,
                y: 91,
                width: 12.15,
                height: 30,
                fill: 'blue',
                id: 'sender' + uid.toString()
            });
        }else if(name === 'RouterPktI'){
            return new Konva.Rect({
                x: 475.05,
                y: 93,
                width: 108.0,
                height: 26,
                fill: 'blue',
                id: 'RouterPkt' + uid.toString()
            });
        }else if(name === 'AckI'){
            return new Konva.Rect({
                x: 840.50,
                y: 24,
                width: 14.85,
                height: 14.85,
                fill: 'red',
                id: 'AckPkt' + uid.toString()
            });
        }else if(name === 'dropped'){
            let packet = new Konva.Rect({
                x: 432.05,
                y: 93,
                width: 12.15,
                height: 30,
                fill: 'blue',
                id: 'DroppedPkt' + uid.toString()
            });
            packet.setAttr('dy', 0);
            return packet;
        }
    }

    private recv_pkt(drop) {
        this.tx_packet("AckI", drop);
    }

    private recv_ack() {
        if (this.s_pktno >= this.s_lost) {
            this.s_win   = Math.trunc(this.s_win/2.0);
            this.s_lost  = 9999;
            this.s_out   = this.s_out - this.s_dropc - 1;
            this.s_dropc = 0;
        } else {
            if (this.s_win >= this.s_out) {
                this.s_win = this.s_win + 1.0/Math.trunc(this.s_win)+0.000001;
            }
            this.s_out -= 1;
            this.do_sender();
        }
        this.stage.find("#windowSizeLabel")[0].text('W = '+Math.trunc(10.0* this.s_win)/10.0);
        this.layers['componentLayer'].draw();
    }

    private tx_packet(name, drop) {
        let newPacket = this.createNewPacket(name, this.uid);
        newPacket.setAttr('active', true);
        newPacket.setAttr('tx_done', false);
        newPacket.setAttr('drop', drop);
        this.layers['packetLayer'].add(newPacket);
        let anim;
        if(name === 'sender') {
            anim = new Konva.Animation(function() {
                if (!newPacket.getAttr('active'))
                    return;
                newPacket.x(newPacket.x() + 2.0 * (430.0 - 164.0) / this.fps);

                if (newPacket.x() > 430.0) {
                    this.add_queue();
                    newPacket.destroy();
                    anim.stop();
                }

                if (!newPacket.getAttr('tx_done') && newPacket.x() > 182.0) {
                    newPacket.setAttr('tx_done', true);
                    this.s_tx = false;
                    this.do_sender();
                }
            }.bind(this, anim), this.layers['packetLayer']);
        }else if(name === 'RouterPktI'){
            anim = new Konva.Animation(function() {
                if (!newPacket.getAttr('active'))
                    return;

                newPacket.x(newPacket.x() + (830.0-515.0)/this.fps);

                if (drop){
                    this.stage.find('#dropLabel')[0].x(this.stage.find('#QueuePkt1')[0].x()-10 + newPacket.x() - 475.05);
                }

                if(newPacket.x() > 830.0){
                    this.recv_pkt(drop);
                    newPacket.destroy();
                    anim.stop();
                }

                if(!newPacket.getAttr('tx_done') && newPacket.x() > 590.0){
                    newPacket.setAttr('tx_done', true);
                    this.q_tx = false;
                    this.rem_queue();
                }
            }.bind(this, anim), this.layers['packetLayer']);
        }else if(name === 'AckI'){
            anim = new Konva.Animation(function() {
                if (!newPacket.getAttr('active'))
                    return;

                if(drop){
                    this.stage.find('#dropLabel')[0].x(newPacket.x() - 70);
                    this.stage.find('#dropLabel')[0].y(newPacket.y() - 20);
                }

                newPacket.x(newPacket.x() - (845.0-164.0)/this.fps/1.33);

                if(newPacket.x() < 164.0){
                    this.recv_ack();
                    if(drop)
                        this.stage.find('#dropLabel')[0].visible(false);
                    newPacket.destroy();
                    anim.stop();
                }
            }.bind(this, anim), this.layers['packetLayer']);
        }else if(name === 'dropped') {
            anim = new Konva.Animation(function() {
                if (!newPacket.getAttr('active'))
                    return;

                newPacket.setAttr('dy', newPacket.getAttr('dy') + 2);
                newPacket.y(93 + newPacket.getAttr('dy'));

                if (newPacket.getAttr('dy') > 200) {
                    newPacket.destroy();
                    anim.stop();
                }
            }.bind(this, anim), this.layers['packetLayer']);
        }
        anim.start();
        this.uid += 1;
    }

    private do_sender() {
        if(!this.playing)
            return;
        if(!this.s_tx && this.s_out < Math.trunc(this.s_win)) {
            this.tx_packet("sender",false);
            this.s_out += 1;
            this.s_tx = true;
            this.s_pktno += 1;
        }
    }

    private updatePlotAndUtilization() {
        // Check if over, if yes stop
        if(!this.playing)
            return;

        // Plot graph
        this.time += 5.0/ this.fps;
        this.stage.find('#windowSizeCurve')[0].points(this.stage.find('#windowSizeCurve')[0].points().concat([89+ this.time, 440.0-this.s_win*10.0]));
        if(this.time > 695)
            this.playing = false;

        // Update Utilization
        const f = 0.01*30.0/this.fps;
        if(this.q_tx){
            this.q_util = this.q_util*(1-f)+ f;
        } else {
            this.q_util = this.q_util*(1-f);
        }
        this.stage.find('#utilizationLabel')[0].text('util = '+Math.trunc(this.q_util*20.0+0.5)*5+'%');
        this.layers['componentLayer'].draw();
    }
}

export default SingleAIMDFlow;