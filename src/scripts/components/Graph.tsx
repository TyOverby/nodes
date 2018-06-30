import { Component } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Canvas } from "./canvas";
import { Node } from "./node";

export interface Port {
    name: string,
    enabled?: boolean
}

export interface Block {
    title: string,
    inPorts: Port[],
    outPorts: Port[],
}

export interface GraphProps {
    blocks: {
        [id: string]: Block,
    }
}

interface GraphState {
    blocksOrder: string[]
}

export class Graph extends Component<GraphProps, GraphState> {
    constructor(props: GraphProps) {
        super(props);
        this.state = {
            blocksOrder: Object.keys(props.blocks),
        }
    }

    giveVisualPriority(blockId: string) {
        this.setState(oldState => {
            const idx = oldState.blocksOrder.indexOf(blockId);
            oldState.blocksOrder.splice(idx, 1);
            oldState.blocksOrder.push(blockId);
            return {
                blocksOrder: oldState.blocksOrder,
            }
        });
    }

    render() {
        const nodes = this.state.blocksOrder
            .map(id => ({ id, block: this.props.blocks[id] }))
            .map(({ id, block }) =>
                <Node
                    key={id}
                    inPorts={block.inPorts}
                    outPorts={block.outPorts}
                    title={block.title}
                    onMovement={() => this.giveVisualPriority(id)}>
                </Node >);

        return <Canvas width={1000} height={1000}>
            {nodes}
        </Canvas>
    }
}
