import { Canvas } from "./components/Canvas";
import { Node } from "./components/Node";
import * as ReactDom from "react-dom";
import * as React from "react";
import { Graph } from "./components/Graph";

const dom = document.querySelector("#container");
const blocks = {
    "a": { title: "aaaaa", inPorts: [{ name: "hello" }, { name: "world" }], outPorts: [] },
    "b": { title: "bbbbb", inPorts: [], outPorts: [{ name: "OUT" }] },
    "c": { title: "aaaaa", inPorts: [{ name: "hello" }, { name: "world" }], outPorts: [{ name: "OUT" }] },
}
ReactDom.render(
    <Graph blocks={blocks} />,
    dom
);
