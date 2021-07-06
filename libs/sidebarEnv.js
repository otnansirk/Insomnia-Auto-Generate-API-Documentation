
class SidebarEnv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: []
        };
    }

    componentDidMount() {
        var self = this;
        $.getJSON("data.json", function(data) {
            self.setState({'resources': data.resources.filter(item => item._type == 'environment')});
        });
    }

    ucfirst(str) {
        var firstLetter = str.toString().slice(0,1);
        return firstLetter.toUpperCase() + str.toString().toLowerCase().substring(1);
    }
    emoji(key){
        const emoji = ['🥳','👅','🫀','🧜‍♀️','👩‍❤️‍💋‍👨','🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍'
        ];
        if (key > 24 || key < 0) {
            return emoji[20];
        }
        return emoji[key];
    }

    render() {
        return (
            <li>
                <a href="#env" data-toggle="collapse" class="collapsed"><span>Environments</span> <i
                        class="icon-submenu lnr lnr-chevron-left"></i></a>
                <div id="env" class="collapse ">
                    <ul class="nav">
                        {
                            this.state.resources.map((item, index) => {
                                return <li>
                                    <a href={"#"+item._id} class="">
                                        <span>{this.emoji(index)}</span>&nbsp;&nbsp;&nbsp;  
                                        {this.ucfirst(item.name).replace('environment', '')} &nbsp; 
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </li>
        );
    }
}

ReactDOM.render(<SidebarEnv/>, document.getElementById("menu_env"));