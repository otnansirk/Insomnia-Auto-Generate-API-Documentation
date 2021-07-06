
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            description: "",
            name: ""
        }
    }

    componentDidMount() {
        var self = this;
        $.getJSON("data.json", function(data) {
            self.setState(data);
            data.resources.map(function (item) {
                    if (item._type == "workspace") {
                    self.setState({
                        name : item.name,
                        description : item.description
                    });
                }
            });
        });
    }

    render() {
        let name = this.state.name;
        let desc = this.state.description;
        
        return (
            <div>
            <div class="container-fluid">
                <div class=" col-md-12">
                    <h3 class="page-title" id="dashboard" >{name}</h3>
                    <p style={{ marginBottom:'25px'}}>{desc}</p>
                </div>
            </div>
            {
                this.state.resources.map(function (item) {
                    if (item._type == "environment") {
                        var checkProperies = !(item.dataPropertyOrder && Object.keys(item.dataPropertyOrder).length === 0);
                        
                        return <div class="container-fluid">
                                    <div class="row">
                                        <div class=" col-md-12">
                                            <div class="panel">
                                                <div class="panel-body">
                                                    <h3 class="page-title" id={item._id} ><strong>Env</strong> - {item.name}</h3>
                                                    <table class="table table-hover">
                                                        <tbody>
                                                            {checkProperies && 
                                                            item.dataPropertyOrder['&'].map(function(env){
                                                                return <tr>
                                                                            <td><b>{"{{_."+env+"}}"}</b></td>
                                                                            <td style={{ width:'100%'}}>{
                                                                                item.data[env]
                                                                            }</td>
                                                                        </tr>
                                                            })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    }
                })

            }
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("mainDashboard"));