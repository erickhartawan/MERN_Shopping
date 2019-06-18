import React,{Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name:'',
    email:'',
    password:'',
    msg: null
  };

  static propTypes ={
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    //register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  // if authed close modal


  toggle = () => {
    //Clear Errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    //close modal
    this.toggle();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toogle}
        >
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className='mb-3'
                onChange={this.onChange}
                />
              <Label for="email">email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className='mb-3'
                onChange={this.onChange}
                />
              <Label for="password">Passworc</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="enter 6 char password"
                className='mb-3'
                onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop:"3rem"}}
                  block
                  >Register
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { clearErrors }
)(RegisterModal);