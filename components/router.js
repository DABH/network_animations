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
        points: [450, 128, 565, 128, 565, 78, 450, 78],
        stroke: 'black',
        strokeWidth: 4,
        lineCap: 'butt',
        lineJoin: 'butt'
    });
    shapes.push(routerBufferBorder);

    return shapes;
}