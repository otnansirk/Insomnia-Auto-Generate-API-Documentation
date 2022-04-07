
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
            $('html, body').animate({
                scrollTop: $("#"+ids.pop()).offset().top
            }, 500);
        }
    }

    getMarkdown(data) {
        var rawMarkup = marked.parse(data);
        return { __html: rawMarkup }; 
    }

    
    render() {
        
        return this.state.resources.map( (item) => {
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
                                { (item.body.params != undefined && item.body.mimeType == 'multipart/form-data') ? 
                                    <div>
                                        <h3 class="panel-title"><strong>Request form data</strong></h3>
                                        <table class="table table-hover">
                                            <FormData data={item.body.params}/>
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

                        <div class="panel-documentation">
                            {(item.description != "") ? 
                                <div dangerouslySetInnerHTML={this.getMarkdown(item.description)} />: 
                                "No Docs"
                            }
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
            </div>
            }
        })
    }
}

class FormData extends React.Component{
    render() {
        return <tbody> 
            {this.props.data.map(function(item){
                return <tr>
                            <td>{item.name}</td>
                            <td><code>{item.value}</code></td>
                            <td><code>{item.type}</code></td>
                            <td>{item.fileName}</td>
                            <td>{item.description}</td>
                        </tr>
            })}
        </tbody>
    }
}

ReactDOM.render(<Main/>, document.getElementById("mainContent"));