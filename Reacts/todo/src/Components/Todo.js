import React, { Component } from 'react'

export default class Todo extends Component {
 
    constructor() {
        super();
        this.state = {
            tasks: [
                { id: 1, task: "Revise JS" },
                { id: 2, task: "Revise DSA Level-1" },

            ],
            curTask: "",
        };
    }

    handleChange = (e) => {
      console.log(e.target.value);
      this.setState({           // setState jab bhi change hota ha use curTask me update krta hai usle baad render ko aapne aap call kr dete hai
        curTask: e.target.value,
      })
    }

    handleSubmit = () => {
      this.setState({
        tasks:[...this.state.tasks,{task: this.state.curTask,id: this.state.tasks.length+1},],
        curTask: "",
      })
   
    }

    handleDelete = (id) => {
      // filter
      let narr = this.state.tasks.filter((taskObj) =>{
          return taskObj.id !== id;
      });
      this.setState({
          tasks: [...narr],
      });
    };
    render() {
      console.log("render method called");
    return (
      <div>
        <input type="text" 
        value={this.setState.curTask}
        onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        {
            this.state.tasks.map((taskObj)=>{
                return (
                    <li key = {taskObj.id}>
                      <p>{taskObj.task}</p>
                      <button onClick = {() => this.handleDelete(taskObj.id)}>Delete</button>
                    </li>
                );
            })
        }
      </div>
    )
  }
}
