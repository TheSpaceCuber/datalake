import "./App.css";

function Graph() {
    const graphs = [1, 1, 1, 1, 1];

    function generateGraphs(x) {
        return <div className="graph"></div>
    }
    
    return (
        <div className="container">
            {graphs.map(x => generateGraphs(x))}
        </div>
    )
}

export default Graph; 