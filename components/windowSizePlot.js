function windowSizePlot() {
    var shapes = [];

    var plotYAxis = new Konva.Arrow({
        x: 89,
        y: 460,
        points: [0,0, 0, -275],
        pointerLength: 20,
        pointerWidth : 20,
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: 4
    });
    shapes.push(plotYAxis);

    var plotXAxis = new Konva.Arrow({
        x: 72,
        y: 440,
        points: [0,0, 850, 0],
        pointerLength: 20,
        pointerWidth : 20,
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: 4
    });
    shapes.push(plotXAxis);

    var plotYAxisLabel = new Konva.Text({
        x: 50,
        y: 250,
        text: 'W',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black'
    });
    shapes.push(plotYAxisLabel);

    var plotXAxisLabel = new Konva.Text({
        x: 750,
        y: 450,
        text: 'Time',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black'
    });
    shapes.push(plotXAxisLabel);

    var windowSizeCurve = new Konva.Line({
        points: [89, 440-1*10.0],
        stroke: 'red',
        strokeWidth: 4,
        lineCap: 'round',
        lineJoin: 'round',
        id: 'windowSizeCurve'
    });
    shapes.push(windowSizeCurve);

    return shapes;
}