/*
 * File: Component.ts
 * Description: GUI elements in network_animations are organized in a modular, object-oriented way so they can be
 *              re-used in different animations.  Components are located under the Components directory and extend
 *              this Component class, which serves as a base class with common functionality for all components.
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

import Konva from "konva";

class Component {
    public static add(layer: Konva.Layer, componentShapes: Konva.Shape[]): void {
        for (let i = 0; i < componentShapes.length; i++) {
            layer.add(componentShapes[i]);
        }
    };

    public addToLayer(layer: Konva.Layer): void {
        this.computeShapes();
        Component.add(layer, this.shapes);
    };

    constructor(options?: object) {
        this.options = options;
    }

    protected computeShapes(): void {};

    protected shapes: Konva.Shape[] = [];
    protected options: object;
}

export default Component;
