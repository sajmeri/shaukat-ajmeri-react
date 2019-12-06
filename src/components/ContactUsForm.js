import React from "react";
import { string } from "prop-types";

class ContactUsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            emailID: "",
            purpose: "Purpose of your writing"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
    }
    handleChange(event){
        const name = event.target.name;
        this.setState({
            [name] : event.target.value
        })
    }
    handleSubmit(event){
        console.log("Form submitted");
        event.preventDefault();
    }
    render(){
        return (
            <form id="contactUs"  onSubmit={this.handleSubmit}>
                <label>Your Name: </label>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                <label>Your Email: </label>
                <input type="text" name="emailID" value={this.state.emailID} onChange={this.handleChange} />
                <label>Purpose of your Writing: </label>
                <textarea name="purpose" value={this.state.purpose}  onChange={this.handleChange} />
                <input type="submit" value="submit" />
            </form>
        )
        
    }
}
export default ContactUsForm;