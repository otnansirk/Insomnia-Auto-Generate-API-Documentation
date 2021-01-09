
class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            data: []
        }
    }

    componentDidMount() {
        var self = this;
        $.getJSON("data.json", function(data) {
            self.setState(data);
        });
    }

    
    render() {
        return this.state.resources.map(function (item) {
            let data = [];
            if (item._type == "workspace") {
                return item.name
            }
        })
    }
}

ReactDOM.render(<Title/>, document.getElementById("workspaceTitle"));