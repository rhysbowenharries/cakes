import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
  name: string;
  comment: string;
  imageUrl: string;
  yumFactor: number;

}
export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      name: '',
      comment: '',
      imageUrl: '',
      yumFactor: '',
      values: [],
      loading: false,
      submitSuccess: false,
    }
  }

  private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {
      name: this.state.name,
      comment: this.state.comment,
      imageUrl: this.state.imageUrl,
      yumFactor: this.state.yumFactor,
    }
    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
    axios.post(`http://localhost:5000/cakes`, formData).then(data => [
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500)
    ]);
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div>
        <div className={"col-md-12 form-wrapper"}>
          <h2> Post A Cake! </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to post a yummy cake
            </div>
          )}
          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
            </div>
          )}
          <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
            <div className="form-group col-md-12">
              <label htmlFor="name"> Name </label>
              <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control" placeholder="What's the cake called?" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="comment"> Comment </label>
              <input type="text" id="lcomment" onChange={(e) => this.handleInputChanges(e)} name="comment" className="form-control" placeholder="Tell us something funky about this gorgeous cake" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="imageUrl"> Image URL </label>
              <input type="imageUrl" id="imageUrl" onChange={(e) => this.handleInputChanges(e)} name="imageUrl" className="form-control" placeholder="Post an image address here" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="yumFactor"> yumFactor </label>
              <input type="number" id="yumFactor" onChange={(e) => this.handleInputChanges(e)} name="yumFactor" className="form-control" placeholder="How Yummy is your cake on a scale from 1 to AMAZING!" />
            </div>
            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create Cake
                        </button>
              {loading &&
                <span className="fa fa-circle-o-notch fa-spin" />
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(Create)