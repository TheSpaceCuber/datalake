import "./App.css";

function Graph() {
  // const graphs = [1, 1, 1, 1, 1];

  // function generateGraphs(x) {
  //     return
  // }


  // NOTE: IFRAMES do not work without local instance of grafana configured to give anonymous access to panels.
  return (
    <div className="container">
      <div className="graph">
        <iframe
          src="http://localhost:3000/d-solo/dE789P87k/dashboard-1?orgId=1&panelId=6"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </div>
      <div className="graph">
        <iframe
          src="http://localhost:3000/d-solo/dE789P87k/dashboard-1?orgId=1&panelId=4"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </div>
      <div className="graph">
        <iframe
          src="http://localhost:3000/d-solo/dE789P87k/dashboard-1?orgId=1&panelId=8"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default Graph;
