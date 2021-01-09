
class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            resources2: []
        };
    }

    componentDidMount() {
        var self = this;
        $.getJSON("data.json", function(data) {
            self.setState(data);
            self.setState({'resources2': data.resources});
        });
    }

    subComponent() {
        return (<div>Hello World</div>);
      }
    
    render() {
        let parentId;
        let requestData = this.state.resources2
        return this.state.resources.map(function (item) {
            if (item.parentId == null) {
                parentId = item._id
            }

            if (item._type == "request_group") {
                let menu =  <li>
							<a href={"#"+item._id} data-toggle="collapse" class="collapsed"><span>{item.name}</span> <i
									class="icon-submenu lnr lnr-chevron-left"></i></a>
							<div id={item._id} class="collapse ">
								<ul class="nav">
                                    {requestData.map(function(obj, i){
                                        if (obj.parentId == item._id && obj.method) {
                                            return <li>
                                            <a href={"#mainCon"+obj._id} class="">
                                                <span class={"m m-"+obj.method.toString().toLowerCase()}>{obj.method}</span>
                                                {obj.name} &nbsp; </a>
                                        </li>
                                        }
                                    })}
								</ul>
							</div>
						</li>
            return menu
            }
        })
    }
}

ReactDOM.render(<Sidebar/>, document.getElementById("menu"));