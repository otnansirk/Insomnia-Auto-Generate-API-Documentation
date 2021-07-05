
class Main extends React.Component {

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

    componentDidUpdate() {
        document.querySelectorAll("pre").forEach(block => {
            hljs.highlightBlock(block);
        });
        const ids = window.location.href.split('#');
		if (ids.length > 1 ) {
            if ($("#"+ids.pop()).length) {
                $('html, body').animate({
                    scrollTop: $("#"+ids.pop()).offset().top
                }, 500);
            }
        }
    }

    
    render() {
        
        return this.state.resources.map(function (item) {
            const hightlight = ("mainCon"+item._id == window.location.href.split('#').pop())? "active": "";
            if (item._type == "request") {
                return <div class="container-fluid">
                <a  href={"#mainCon"+item._id} class={"page-title "+ hightlight} id={"mainCon"+item._id} >{item.name}</a>
                <div class="row">
                    <div class="col-lg-6 col-md-12">

                        <div class="panel">
                            <div class="panel-heading">
                                <div class={"method method-"+item.method.toString().toLowerCase()}>
                                    <span class={"label l-"+item.method.toString().toLowerCase()}>{item.method}</span>
                                    &nbsp;&nbsp; {item.url}
                                </div>
                            </div>
                            <div class="panel-body">
                                <h3 class="panel-title" ><strong>Headers</strong></h3>
                                <table class="table table-hover">
                                    <tbody>
                                        {item.headers.map(function(header){
                                            if(header.name !== ""){
                                                return <tr>
                                                            <td>{header.name}</td>
                                                            <td><code><a href="#env">{header.value}</a></code></td>
                                                            <td>{header.description}</td>
                                                        </tr>
                                            }
                                        })}
                                    </tbody>
                                </table>
                                
                                { item.parameters.length ? 
                                    <div>
                                        <h3 class="panel-title"><strong>Parameters</strong></h3>
                                        <table class="table table-hover">
                                            <tbody>
                                                {item.parameters.map(function(header){
                                                    if(header.name !== ""){
                                                        return <tr>
                                                                    <td>{header.name}</td>
                                                                    <td><code>{header.value}</code></td>
                                                                    <td>{header.description}</td>
                                                                </tr>
                                                    }
                                                })}
                                                </tbody>
                                        </table>
                                    </div>
                                    :""
                                }
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <h3 class="panel-title">Request Body</h3>
                        <pre class="language-json hljs">
                            {(item.body.text && item.body.text != "") ? item.body.text: "No Request"}
                        </pre>

                        <h3 class="panel-title">Documentation</h3>
                        <pre class="language-json hljs">
                            {(item.description != "") ? item.description: "No Docs"}
                        </pre>
                    </div>
                </div>
                <div class="divider"></div>
            </div>
            }
        })
    }
}

ReactDOM.render(<Main/>, document.getElementById("mainContent"));