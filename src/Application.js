import React from 'react'
import axios from './config/axios'
import AdminDashBoard from './AdminDashBoard'


class ApplicationForm extends React.Component {
    constructor() {
        super () 
        this.state = {
            name: ' ',
            email: ' ',
            contact:' ',
            job: ' ',
            experience: ' ',
            skills: ' '
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.contact,
            jobTitle: this.state.job,
            experience: this.state.experience,
            skills: this.state.skills
        }
        //console.log(formData)

        axios.post('/users/application-form',formData)
        .then((response) => {
            console.log('resolve',response.data)
            if (response.data.hasOwnProperty('errors')){
                alert(response.datamessage)
            }
            else
            {
                alert('your application has been submitted')
                this.setState({
                    name: '',
                    email: '',
                    contact: '',
                    job: '',
                    experience: '',
                    skills:''
                })
            }
         })
        .catch((err) => {
            console.log('reject',err)
        })
        {/*redirect */}
        }

    render(){
        return (
       
        <div> 
            <h2>Apply for Job</h2>
            <form onSubmit={this.handleSubmit}>
                {/*the htmlFor tag needs a corresponding name which should have the state value*/}
                <label htmlFor="FullName">FullName</label>
                <input type="text" id="FullName" name="name" 
                value={this.state.name} onChange={this.handleChange} /><br />

                <label htmlFor="email">Email Address</label>
                <input type="text" id="email" name="email" placeholder="example@example.com"
                value={this.state.email} onChange={this.handleChange}  />  <br />

                <label htmlFor="contact">Contact Number</label>
                <input type="text" id="contact" name="contact" placeholder= " +91 909090909"
                value={this.state.contact} onChange={this.handleChange} />  <br />
                 
                 {/*the htmlFor tag needs a corresponding name which should have the state value*/}
                <label htmlFor="Applying For Job">Applying for Job</label>
                <select value = {this.state.job} name="job" onChange={this.handleChange} >
                 {/*each option in the drop down will come from option tag and all options
                 should be enclosed within select tag*/}      
                 <option value="">-Select-</option>
                 <option value="Front-End Developer">Front-End Developer</option>
                 <option value="Node.js Developer">Node.js Developer</option>
                 <option value="MEAN Stack Developer">MEAN Stack Developer</option>
                 <option value="FULL Stack Developer">FULL Stack Developer</option>
                 </select><br />
                 
                <label htmlFor="Experience">Experience</label>
                <input type="text" id="experience" name="experience" placeholder="Experience (2 years, 3 months)"
                value={this.state.experience} onChange={this.handleChange} />  <br />
                 
                 <label htmlFor="skills">Technical skills</label>
                <textarea id="skills" name="skills" placeholder="technical skills" 
                value={this.state.skills} onChange={this.handleChange} />  <br />
                                 
                <input type="submit" value="Send Application" />
            </form>
            
        </div>
        )
    }
}

export default ApplicationForm
