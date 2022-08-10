import React, { Component } from "react";
import logo from './bus-icon.png';

    // import {
    //   Button,
    //   Modal,
    //   ModalHeader,
    //   ModalBody,
    //   ModalFooter,
    //   Form,
    //   FormGroup,
    //   Input,
    //   Label
    // } from "reactstrap";
    // // import './style.scss';

    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem
        };
      }
      handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
      render() {
        const { toggle, onSave } = this.props;
        return (
      <div class="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
      <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg" >


      <div class="w-full flex justify-start text-gray-600 mb-3">
      <img class="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" src={logo} alt="Logo" />;
                      
        </div>
        <div className="p-4 rounded-lg border shadow-md bg-zinc-900 border-gray-700 overflow-y-scroll	max-h-full">
        
        <input
                    class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James"
                    type="text"
                    name="title"
                    value={this.state.activeItem.title}
                    onChange={this.handleChange}
                    placeholder="Enter stop here"
                  />
        <input
                    type="text"
                    class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James"
                    defaultValue="My default value"
                    name="description"
                    value={this.state.activeItem.description}
                    onChange={this.handleChange}
                    placeholder="Enter Reason"
                  />
          <label for="default-checkbox" class="ml-2 text-sm font-medium text-white dark:text-gray-300">Favorites only</label>
                    <input
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      name="completed"
                      checked={this.state.activeItem.completed}
                      onChange={this.handleChange}
                    />
                  <br></br>
                  <br></br>
                    
                  
                  <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" color="success" onClick={() => onSave(this.state.activeItem)}>
                Save
              </button>
              <div className="float-right">
              <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-red-700 rounded text-white px-8 py-2 text-sm float-right" color="success" onClick={() => onSave(this.state.activeItem)}>
                Cancel
              </button>
              </div>
              
          

          
        </div>
      </div>
    









{/* 
          // <div className='local-bootstrap'>
          // <div className="z-10 max-h-64 overflow-y-scroll absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-28 md:top-40 mt-6 overflow-hidden w-8/12 md:w-6/12 md:max-w-sm">
          // <Modal isOpen={true} toggle={toggle} animation={false}>
          //   <ModalHeader toggle={toggle}> Fav Item </ModalHeader>
          //   <ModalBody>
          //     <Form>
          //       <FormGroup>
          //         <Label for="title">Title</Label>
                  
                  
          //       </FormGroup>
          //       <FormGroup>
          //         <Label for="description">Reason</Label>
                  
          //       </FormGroup>
          //       <FormGroup check>
                  
          //       </FormGroup>
          //     </Form>
          //   </ModalBody>
          //   <ModalFooter>
              
          //   </ModalFooter>
          // </Modal>
          // </div>
          // </div> */}

          </div>
        );
      }
    }