function links() {
    var shapes = [];

    var senderToRouterArrow = new Konva.Arrow({
        x: 173.8,
        y: 105.50,
        points: [0,0, 255, 0],
        pointerLength: 20,
        pointerWidth : 20,
        fill: '#5688BA',
        stroke: '#5688BA',
        strokeWidth: 4
    });
    shapes.push(senderToRouterArrow);

    var routerToReceiverArrow = new Konva.Arrow({
        x: 585,
        y: 105.50,
        points: [0,0, 258.25, 0],
        pointerLength: 20,
        pointerWidth : 20,
        fill: '#5688BA',
        stroke: '#5688BA',
        strokeWidth: 4
    });
    shapes.push(routerToReceiverArrow);

    var receiverToSenderArc = new Konva.Arrow({
        x: 890,
        y: 32.30,
        points: [0,0, -750, 0],
        pointerLength: 20,
        pointerWidth : 20,
        fill: '#5688BA',
        stroke: '#5688BA',
        strokeWidth: 4
    });
    shapes.push(receiverToSenderArc);

    return shapes;
}