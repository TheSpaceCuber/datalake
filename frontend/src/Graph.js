import "./App.css";

function Graph() {
    const graphs = [1, 1, 1, 1, 1];

    function generateGraphs(x) {
        return <div className="graph">
                  <iframe src="http://localhost:3000/d-solo/dE789P87k/new-dashboard?orgId=1&from=1650245484226&to=1650267084226&panelId=2" width="450" height="200" frameborder="0"></iframe>

        </div>
    }
    
    return (
        <div className="container">
            {graphs.map(x => generateGraphs(x))}
        </div>
    )
}

export default Graph; 