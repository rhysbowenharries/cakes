import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
  cakes: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { cakes: [] }
  }
  public componentDidMount(): void {
    axios.get(`http://localhost:5000/cakes`).then(data => {
      this.setState({ cakes: data.data })
    })
  }
  public deleteCake(id: number) {
    axios.delete(`http://localhost:5000/cakes/${id}`).then(data => {
      const index = this.state.cakes.findIndex(cake => cake.id === id);
      this.state.cakes.splice(index, 1);
      this.props.history.push('/');
    })
  }
  public render() {
    const cakes = this.state.cakes;
    return (
      <div>
        {cakes.length === 0 && (
          <div className="text-center">
            <h2>No cake found at the moment</h2>
          </div>
        )}
        <div className="table-container">
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Comment</th>
                </tr>
              </thead>
              <tbody>
                {cakes && cakes.map(cake =>
                  <tr key={cake.id} >
                    <td>{cake.name}</td>
                    <td>{cake.comment}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to={`view/${cake.id}`} id="button" className="btn btn-sm btn-outline-secondary">Check that cake!</Link>
                        <div className="btn-group" style={{ marginBottom: "20px" }}>
                          <button className="btn btn-sm btn-outline-secondary" id="button" onClick={() => this.deleteCake(cake.id)}>Delete that Cake!</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}