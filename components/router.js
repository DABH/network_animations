function router() {
    var shapes = [];

    var routerRect = new Konva.Rect({
        x: 433.05,
        y: 7.30,
        width: 150,
        height: 130,
        fill: 'white',
        stroke: 'gray',
        strokeWidth: 4
    });
    shapes.push(routerRect);

    var routerBufferBorder = new Konva.Line({
        points: [443, 128, 573, 128, 573, 83, 443, 83],
        stroke: 'black',
        strokeWidth: 4,
        lineCap: 'butt',
        lineJoin: 'butt'
    });
    shapes.push(routerBufferBorder);

    return shapes;
}