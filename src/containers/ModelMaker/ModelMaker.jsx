import React, { Component } from "react";
import FormulaParser from "formula-parser";
import { MPL } from "../../MPL/MPL";

import ReactGraphVis from "../ReactGraphVis/ReactGraphVis";

class ModelMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propositions: ["p", "q", "r", "s"],
      len: 3,
      model: null,
      nodes: null,
      edges: null,
      isGraph: false
    };
  }

  randomProp = prop => {
    return { [`${prop}`]: Math.random() < 0.5 };
  };

  randomEdges = from => {
    const { len } = this.state;
    const edges = [];
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.5) edges.push({ from, to: i });
    }
    return edges;
  };

  handleInput = e => {
    e.preventDefault();
    const len = parseInt(e.target.value);
    this.setState({ len });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { len } = this.state;
    this.handleGenerate(len);
  };

  handleGenerate = len => {
    const { propositions } = this.state;
    const listModel = [];
    const edges = [];
    for (let i = 0; i < len; i++) {
      edges.push(...this.randomEdges(i));
      let w = [];
      propositions.forEach(prop => {
        w.push(this.randomProp(prop));
      });
      listModel.push(w);
    }

    const nodes = listModel.map((li, idx) => {
      let content = [];
      li.forEach(prop => {
        const mass = Object.entries(prop)[0];
        if (mass[1] === true) {
          content.push(mass[0]);
        }
      });
      return { id: idx, label: `w${idx}⊨ ${content.join(", ")}` };
    });
    this.setState({ listModel, edges, nodes, isGraph: true });
    console.log("nodes", nodes);
    console.log("edges", edges);
    this.handleCreateModel(listModel, edges);
  };

  handleCreateModel = (listModel, edges) => {
    let model = new MPL.Model();

    listModel.forEach(w => {
      const state = {};
      w.forEach(prop => {
        const [char, value] = Object.entries(prop)[0];
        state[`${char}`] = value;
      });
      model.addState(state);
    });

    edges.forEach(edge => {
      model.addTransition(edge.from, edge.to);
    });

    this.setState({ model });
    console.log(model.getStates());
    // console.log("getSuccessorsOf 0:", model.getSuccessorsOf(0));
  };

  render() {
    const { nodes, edges, isGraph, len } = this.state;
    return (
      <div className="ModelMaker">
        <form onSubmit={this.handleSubmit}>
          <input
            type="range"
            min="1"
            max="10"
            onChange={this.handleInput}
            value={len}
          />
          <input type="submit" />
        </form>
        {isGraph ? <ReactGraphVis nodes={nodes} edges={edges} /> : null}
      </div>
    );
  }
}

// <select defaultValue="3" onChange={this.handleInput}>
//   <option value="1">1</option>
//   <option value="2">2</option>
//   <option value="3">3</option>
//   <option value="4">4</option>
//   <option value="5">5</option>
// </select>

export default ModelMaker;
