import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import services from './services/services'
import {connect} from 'react-redux';
import updateMovies from './store/actions/actionLogin';
import appConfig from './appConfig';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@gmail.com',
      pwd: '',
      userType: 'admin',
      message: {
        class: '',
        text: ''
      }
    };
  }
  /*
    Method to submit login form
  */
  submitForm = (event) => {
    event.preventDefault();
    if(this.state.email !== '' && this.state.pwd !== '') {
      const validateEmail = () => {
        let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(this.state.email);
      }
      if(validateEmail()) {
        axios.post(appConfig.httpUrl + appConfig.loginApi.post, this.state)
        .then(response => {
          if(response.data.status === 1) {
            let userType = response.data.data;
            localStorage.setItem('userInfo', JSON.stringify(response.data.data));
            localStorage.setItem('isAuth', true);
            axios.all([services.getAuthors(), services.getPublishers()])
            .then(axios.spread((...response) => {
              localStorage.setItem('authors', JSON.stringify(response[0].data.data));
              localStorage.setItem('publishers', JSON.stringify(response[1].data.data));
              this.props.updateMovies();
              (userType.userType === 'admin') 
              ? this.props.history.push("/dashboard") 
              : this.props.history.push("/book-request");
            }));
          } else {
            this.setState({
              message: {
                class: 'error',
                text: response.data.message
              }
            });
          }
        })
        .catch(error => {
          this.setState({
            message: {
              class: 'error',
              text: error
            }
          });
        });
      } else {
        this.setState({
          message: {
            class: 'error',
            text: 'Email not valid'
          }
        });
      }
    } else {
      this.setState({
        message: {
          class: 'error',
          text: 'Fill all fields'
        }
      });
    }
  }
  /*
    Method to change the user type
  */
  userType = (event, data) => {
    event.preventDefault();
    let email = (data === 'admin') ? 'admin@gmail.com' : '';
    this.setState({
      email: email,
      pwd: '',
      userType: data,
      message: {
        class: '',
        text: ''
      }
    });
  }
  /*
    Method to handle the login form values
  */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    // console.log(this.props.isAuth);
    return (<React.Fragment>
      <div className="col-sm-12 flex-ai" data-testid="App">
        <div className="col-sm-6">
          <img className="lmsImage" src="assets/1_2LbaxRdkpqJsx_jPRtcLng.jpeg" alt="No image"/>
        </div>
        <div className="col-sm-6">
          <form className="flex-jc" onSubmit={this.submitForm}>
            <div className="loginDiv">
              {this.state.userType === 'admin' ? 
              <div className="form-group adminCredential">
                <label>Admin Credential (admin@gmail.com/admin)</label>
              </div> : '' }
              <div className="form-group">
                <label htmlFor="email">User Name</label>
                <input id="email" name="email" className="form-control" type="text" value={this.state.email} onChange={this.handleChange} disabled={this.state.userType === 'admin' ? true : false} />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password</label>
                <input id="pwd" name="pwd" className="form-control" type="password" value={this.state.pwd} onChange={this.handleChange} />
              </div>
              <div className="form-group flex-sb">
                  {this.state.userType !== 'admin' ?
                  <a className="defaultFS hLink" onClick={(event) => this.userType(event, 'admin')}>Goto Admin Login</a>
                  : <a className="defaultFS hLink" onClick={(event) => this.userType(event, 'user')}>Goto User Login</a>}
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
              {this.state.message.class !== '' ?
              <div className="form-group txtRight marginBZero">
                <label className={this.state.message.class}>{this.state.message.text}</label>
              </div>
              : ''}
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

