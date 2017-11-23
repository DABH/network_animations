function dynamicLabels(s_win, q_util) {
    var shapes = [];

    var windowSizeLabel = new Konva.Text({
        x: 72,
        y: 76,
        text: 'W = '+s_win.toString(),
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        id: 'windowSizeLabel'
    });
    shapes.push(windowSizeLabel);

    var utilizationLabel = new Konva.Text({
        x: 660,
        y: 140,
        text: 'util = '+q_util.toString()+'%',
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        id: 'utilizationLabel'
    });
    shapes.push(utilizationLabel);

    return shapes;
}