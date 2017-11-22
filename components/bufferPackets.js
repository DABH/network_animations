function bufferPackets(q_buffer) {
    var shapes = [];

    for (i=1; i<=q_buffer; i++) {
        var packet = new Konva.Rect({
            x: 553,
            y: 91,
            width: 12,
            height: 30,
            fill: 'blue',
            id: 'QueuePkt' + i.toString(),
            visible: false
        });
        packet.setX(packet.getAttr('x') - (i-1)*120/q_buffer);
        shapes.push(packet);
    }

    return shapes;
}