/*
 * File: Animation.ts
 * Description: A base class for network animations.  Members of this class should be generically useful to multiple
 *              child animation classes; animation-specific features should go in child classes.
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

import * as Konva from "konva";

class Animation {
    protected width: number;
    protected height: number;
    public fps: number;
    protected playing: boolean;
    stage: Konva.Stage;
    time: number = 0.0;

    protected createStage(): Konva.Stage {
        return new Konva.Stage({
            container: 'container',
            width: this.width,
            height: this.height
        });
    };

    protected createComponents(layerDictionary: object): void {

    };

    protected addKeyDownActions(actions: object): void {
        const aliases = {
            'Right': 'ArrowRight',
            'Left': 'ArrowLeft',
            'Down': 'ArrowDown'
        };
        document.addEventListener('keydown', (event) => {
            if(actions[event.key])
                actions[event.key]();
            else if(aliases[event.key])
                actions[aliases[event.key]]();
        });
    };

    constructor(props?: object) {
        this.width = props['width'] || 1024;
        this.height = props['height'] || 500;
        this.fps = props['fps'] || 120.0;
        this.playing = props['playing'] || true;
    }
}

export default Animation;