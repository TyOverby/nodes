import { Canvas } from "./components/canvas";
import { Node } from "./components/Node";
import * as ReactDom from "react-dom";
import * as React from "react";

const dom = document.querySelector("#container");
ReactDom.render(
    <Canvas width={1000} height={1000}>
        <Node title={"my node"} />
        <Node title={"my node 2"} />
    </Canvas>,
    dom
);
