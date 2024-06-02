import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import { toast } from "react-toastify";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameEvent: "",
      description: "",
    };
  }

  async componentDidMount() {
    let Event = this.props.currentEvent;
    if (Event && !_.isEmpty(Event)) {
      this.setState({
        id: Event.id,
        nameEvent: Event.nameEvent,
        description: Event.description,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["description", "nameEvent"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("欠けているパラメーター: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api edit user modal
      this.props.editEvent(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          イベントを編集
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>イベント</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "nameEvent");
                    }}
                    value={this.state.nameEvent}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label>詳細</label>
                  <textarea
                    className="form-control"
                    rows="12"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "description");
                    }}
                    value={this.state.description}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn px-3"
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            変更を保存
          </Button>
          <Button
            className="btn px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditEvent;
