import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from "react-redux"
import { addItem } from "../store/actions/itemAction";

class ItemModal extends Component {
  state = {
    modal: false,
    name:''
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    }
    // add item to state with addItem
    this.props.addItem(newItem);

    //close modal
    this.toggle();

  }

  onChange = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  render() {
    return (
      <div>
        <Button
          color='primary'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        > Add Item
      </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toogle}
        >
        <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Add Item To Shopping Cart"
                onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop:"3rem"}}
                  >Add Item
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
  item: state.item
})

export default connect(
  mapStateToProps,
  {addItem}
)(ItemModal);