import React, { Component } from "react";
import Graph from "react-graph-vis";

class ReactGraphVis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: {
        nodes: this.props.nodes,
        edges: this.props.edges
      },
      options: {
        nodes: {
          color: "#fff",
          shape: "dot",
          scaling: {
            min: 5,
            max: 50,
            label: {
              min: 6,
              max: 300,
              drawThreshold: 5,
              maxVisible: 4000
            }
          },
          font: {
            size: 30,
            face: "Times"
          }
        },
        edges: {
          color: "#ff70e8",
          width: 0.1,
          smooth: {
            type: "continuous"
          },
          length: 250
        },
        layout: {
          improvedLayout: true
        },
        interaction: {
          hover: true,
          // tooltipDelay: 200,
          hoverConnectedEdges: true
        },
        physics: {
          stabilization: true
          // ,
          // barnesHut: {
          //   gravitationalConstant: -8000,
          //   springConstant: 0.001,
          //   springLength: 3000
          // }
        }
      },
      events: {
        doubleClick: event => {
          this.handleDoubleClick(event);
        }
      },
      network: null,
      highlightActive: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nodes != this.props.nodes) {
      this.state.network.setData({
        nodes: nextProps.nodes,
        edges: nextProps.edges
      });
    }
  }

  setNetworkInstance = nw => {
    this.setState({
      network: nw
    });
  };

  // handleDoubleClick = event => {
  //   const selectedId = event.nodes[0];
  //   this.props.nodeUp(selectedId);
  // };

  render() {
    const { graph, options, events, network } = this.state;
    return (
      <div className="graph-container" style={{ position: "absolute" }}>
        <Graph
          style={{
            position: "revative",
            width: "100vw",
            height: "100vh",
            border: "1px solid lightgray"
          }}
          graph={graph}
          options={options}
          events={events}
          getNetwork={this.setNetworkInstance}
        />
      </div>
    );
  }
}

export default ReactGraphVis;
