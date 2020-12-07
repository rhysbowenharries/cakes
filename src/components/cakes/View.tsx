
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
  [key: string]: any;
}

export interface IState {
  id: number,
  cake: any;
  values: IValues[];
  submitSuccess: boolean;
  loaded: boolean;
}

class View extends React.Component<RouteComponentProps<any>, IState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      cake: {},
      values: [],
      loaded: false,
      submitSuccess: false,
    }
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:5000/cakes/${this.state.id}`).then(data => {
      this.setState({ cake: data.data });

    })
  }
  public render() {
    return (
      <div className="view" >
        <img style={this.state.loaded ? {} : { display: 'none' }} onLoad={() => this.setState({ loaded: true })} src={`${this.state.cake.imageUrl}`} id="cake-view-image" alt={`${this.state.cake.name}`}></img>
        <div className="info-card">
          <h1 className="name">{this.state.cake.name}</h1>
          <h2 className="comment">{this.state.cake.comment}</h2>
          <h4 className="yumm-factor">Yumm Factor: {this.state.cake.yumFactor}</h4>
        </div>
      </div>

    )
  }
}

export default withRouter(View)