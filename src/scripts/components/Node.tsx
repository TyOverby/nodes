import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { dragBox } from "../dragbox";
import { Port } from "./Graph";
import { PortRow } from "./PortRow";

export interface NodeProps {
    title: string;
    inPorts: Port[],
    outPorts: Port[],
    onMovement?: () => void;
}

interface NodeState {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Node extends Component<NodeProps, NodeState> {
    dragboxUnsubscribe: () => void = () => { };
    resizeUnsubscribe: () => void = () => { };

    constructor(props: NodeProps) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        };
    }

    componentDidMount() {
        const element = ReactDOM.findDOMNode(this) as Element;
        const resize = element.querySelector(".resize")!;
        this.resizeUnsubscribe = dragBox(resize, (dx, dy) => {
            this.setState({
                width: Math.max(20, this.state.width + dx),
                height: Math.max(20, this.state.height + dy),
            });
            this.props.onMovement && this.props.onMovement();
        });

        this.dragboxUnsubscribe = dragBox(element, (dx, dy) => {
            this.setState({
                x: this.state.x + dx,
                y: this.state.y + dy,
            });

            this.props.onMovement && this.props.onMovement();
        });
    }
    componentWillUnmount() {
        this.dragboxUnsubscribe();
        this.resizeUnsubscribe();
    }

    render() {
        const common: React.SVGProps<SVGTextElement> = {
            dominantBaseline: "hanging",
            width: this.state.width,
        };

        const inPorts = this.props.inPorts.map((port, idx) =>
            <PortRow key={idx} left={true} offset={idx} port={port} width={this.state.width} onDrag={(x, y) => console.log({ x, y })} />);

        const outPorts = this.props.outPorts.map((port, idx) =>
            <PortRow key={idx} left={false} offset={idx} port={port} width={this.state.width} onDrag={(x, y) => { console.log({ x, y }) }} />);

        return <svg x={this.state.x} y={this.state.y}>
            <rect width={this.state.width} height={this.state.height} fill={"white"} stroke={"black"}></rect>
            <rect className="resize" x={this.state.width - 10} y={this.state.height - 10} width={10} height={10} fill={"red"} stroke={"black"}></rect>
            <text {...common}> {this.props.title} </text>
            {inPorts}
            {outPorts}
        </svg>
    }
}
