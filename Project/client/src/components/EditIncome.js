import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import "./form.css"
function withParams(Component) {
  return props => <Component params={useParams()} />
}

class EditIncome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      finance: [],
      date: '',
      category: '',
      remarks: '',
      amount: '',
      status:''
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id
    axios.get(`/IncomeList/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          finance: res.data.post
        });
        console.log(this.state.finance);
      }

    });
  }


  //edit 
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const id = this.state.id

    const {date, category, remarks, amount, status  } = this.state;

    let data =  this.state.finance;  
    data = {
      date: date.length != 0 ? date : data.date,
      category: category.length != 0 ? category : data.category,
      remarks: remarks.length != 0 ? remarks : data.remarks,
      amount: amount.length != 0 ? amount : data.amount,
      status: status.length != 0 ? status : data.status
    }


    axios.put(`/EditIncome/post/${id}`, data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        alert("Updated Successfully");
        var id = res.data.success._id
        window.location.href=`/IncomeList`;

        this.setState(
          {
                date: '',
                category: '',
                remarks: '',
                amount: '',
                status: ''
          }
        )
      }
    })

  }



  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`/contact/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };


  render() {
    
    const { _id, date, category, type, remarks, amount, status  } = this.state.finance;
    return (
        <div className='container'>
        <a href="/IncomeList"><button className='backBtn'>Income List</button></a>
        
        <form className="create" >
        <h3>Add New Income</h3>

        
        {/* <label>ID: </label>
        <input type="text" name="_id" value={this.state._id}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={_id}  /> */}



        <label>Date </label>
        <input type="date" name="report id" value={this.state.repor}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={date}  />
       

        <label>Category: </label>
        <input type="text" name="category" value={this.state.category}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={category} />

        <label>Type: </label>
        <input type="text" name="type" value={this.state.type}
                     onChange={this.handleChange} id="formGroupExampleInput"placeholder={type}  />

        <label>Remarks: </label>
        <input type="text" name="remarks" value={this.state.remarks}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={remarks}  />

        <label>Amount: </label>
        <input type="number" name="amount" value={this.state.amount}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={amount} />


        <label>Status: </label>
        <input type="text" name="status" value={this.state.status}
                     onChange={this.handleChange} id="formGroupExampleInput" placeholder={status} />
        

        

     
        <center><a href='/IncomeList'><button className='formBtn' type="submit" onClick={this.onSubmit}>Update Income</button></a></center>

        
        
    </form>
    </div>

     





    )
  }
}



export default withParams(EditIncome);