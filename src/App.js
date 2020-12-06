import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import appConfig from './appConfig';
import services from './services/services'
import {connect} from 'react-redux';
import updateMovies from './store/actions/actionLogin';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pwd: '',
      userType: 'admin'
    };
  }
  submitForm = (event) => {
    event.preventDefault();
    console.log(this.state);
    if(this.state.userType === 'admin' && this.state.uname === 'admin' && this.state.pwd === 'admin') {
      localStorage.setItem('userInfo', JSON.stringify(this.state));
      localStorage.setItem('isAuth', true);
      this.props.updateMovies();
      this.props.history.push("/book");
    } else {
      console.log('Non Admin');
    }
  }
  userType = (event, data) => {
    event.preventDefault();
    this.setState({
      userType: data
    });
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidMount() {
    axios.all([services.getAuthors(), services.getPublishers()])
      .then(axios.spread((...response) => {
        console.log(response);
    }));
  }
  render() {
    // console.log(this.props.isAuth);
    return (<React.Fragment>
      <div className="col-sm-12 flex-ai">
        <div className="col-sm-6">
          <img className="lmsImage" src="assets/1_2LbaxRdkpqJsx_jPRtcLng.jpeg" />
        </div>
        <div className="col-sm-6">
          <form className="flex-jc" onSubmit={this.submitForm}>
            <div className="loginDiv">
              {this.state.userType === 'admin' ? 
              <div className="form-group adminCredential">
                <label>Admin Credential (admin/admin)</label>
              </div> : '' }
              <div className="form-group">
                <label htmlFor="uname">User Name</label>
                <input id="uname" name="uname" className="form-control" type="text" value={this.state.uname} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password</label>
                <input id="pwd" name="pwd" className="form-control" type="password" value={this.state.pwd} onChange={this.handleChange} />
              </div>
              <div className="form-group flex-sb marginBZero">
                  {this.state.userType !== 'admin' ?
                  <a className="defaultFS hLink" onClick={(event) => this.userType(event, 'admin')}>Goto Admin Login</a>
                  : <a className="defaultFS hLink" onClick={(event) => this.userType(event, 'user')}>Goto User Login</a>}
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>);
  }
}

const MapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};
const MapDispatchToProps = (dispatch) => {
  return {
    updateMovies: () => dispatch(updateMovies(true))
  }
};

// export default App;
export default connect(MapStateToProps, MapDispatchToProps)(App);

