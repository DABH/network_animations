function receiver() {
    var shapes = [];

    var receiverShape = new Konva.Circle({
        x: 843.75+62.5,
        y: 26.65+62.5,
        radius: 62.5,
        fill: 'gray'
    });
    shapes.push(receiverShape);

    return shapes;
}