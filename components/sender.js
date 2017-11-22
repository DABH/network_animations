function sender() {
    var shapes = [];

    var senderShape = new Konva.Circle({
        x: 52.55+62.5,
        y: 26.65+62.5,
        radius: 62.5,
        fill: 'gray'
    });
    shapes.push(senderShape);

    return shapes;
}