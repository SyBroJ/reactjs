import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { emitter } from "../../../utils/emitter";
import dayjs from "dayjs";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEvent: "",
      description: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        nameEvent: "",
        description: "",
      });
    });
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
    let arrInput = ["nameEvent", "description"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("欠けているパラメータ: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewEvent = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // Call the API to create a new event
      const formattedDate = dayjs(this.props.date).format("ddd MMM D YYYY");
      const eventData = {
        ...this.state,
        date: formattedDate,
      };
      this.props.createNewEvent(eventData);
      // Clear the input fields after adding the event
      this.setState({
        nameEvent: "",
        description: "",
      });
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
          イベントを追加
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>イベント名</label>
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
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "description")
                    }
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
              this.handleAddNewEvent();
            }}
          >
            追加する
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

export default AddEvent;
