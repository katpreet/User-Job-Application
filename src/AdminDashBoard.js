import React from 'react'
import axios from './config/axios'
import moment from 'moment'

class AdminDashBoard extends React.Component {
    constructor () {
        super () 
        this.state = {
            candidates : [],
            selectedJob: "Front-End Developer",
            JobTitles: ["Front-End Developer","Node.js Developer","FULL Stack Developer","MEAN Stack Developer"]
        }
    }

    componentDidMount () {
        axios.get('/users/application-forms')
        .then((response) => {
            const candidates = response.data
            this.setState({candidates})
                            })
        .catch((err) => {
            console.log(err)
        })
    }

    changeTitle = (Title) => {
        this.setState({selectedJob : Title})
            }

    handleViewDetails = (id) => {
        axios.get(`users/application-form/${id}`)
        .then((response => {
            const candidate = response.data
            alert(`${candidate.name} - ${candidate.email} - ${candidate.phone}`)
        }))
        .catch(err => {
            console.log(err)
        })
    }

    handleStatus = (id,status) => {
        axios.put(`users/application-form/update/${id}`,{status})
        .then((response => {
            const candidate = response.data
            alert (`candidate has been ${candidate.status}`)
            this.setState(prevState => ({
                candidates: prevState.candidates.map(cand => {
                    if(cand._id === candidate._id) 
                    {
                        return {...candidate}
                    } 
                    else
                    {
                        return {...cand}
                    }
                })}))})
        )
        .catch((err => {
            console.log(err)
        }))
    }
    
    render() {
        //console.log(this.state.candidates)
        return (
            <div>
                <h2>Admin Dashboard</h2>

                {/*To optimize the below code we can store the titles in array and loop over them
                <button onClick={ () => {this.changeTitle('Front-End Developer')}} > Front-End Developer  </button>
                <button onClick={ () => {this.changeTitle('Node.js Developer')}}   > Node.js Developer    </button>
                <button onClick={ () => {this.changeTitle('FULL Stack Developer')}}> FULL Stack Developer </button>
                <button onClick={ () => {this.changeTitle('MEAN Stack Developer')}}> MEAN Stack Developer </button>*/}
                
                {this.state.JobTitles.map((title) => {
                    return (<button onClick={ () => {this.changeTitle(title)}}> {title} </button>)
                                                     })}

                <h2>{this.state.selectedJob}s </h2>
                <p> List of candidates that applied for {this.state.selectedJob} job</p>

                <table>
                    <thead>
                    <tr><th>Name</th>
                        <th>Technical Skills</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>View Details</th>
                        <th>Update Application Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                       
                       this.state.candidates.filter(candidate => 
                        candidate.jobTitle === this.state.selectedJob).map(candidate => {
                         return ( <tr key={candidate._id}><td>{candidate.name}</td>
                                         <td>{candidate.skills}</td>
                                         <td>{candidate.experience}</td>
                                         <td>{moment(candidate.createdAt).format("DD/MM/YYYY")}</td>
                                         <td><button onClick={() => {this.handleViewDetails(candidate._id)}}>View details</button></td>
                                         <td>
                                             {/*{candidate.status} this was just to c the status */}
                                             {candidate.status === "applied" ?
                                             (<div>
                                                  <button onClick={() => {
                                                      this.handleStatus(candidate._id,'shortlisted')
                                                  }}>ShortList</button>
                                                  <button onClick={() => {
                                                      this.handleStatus(candidate._id,'rejected')
                                                  }}>Rejected</button>
                                              </div>):
                                             (<button> {candidate.status} </button>)}
                                         </td>   
                                     </tr>)
                        })

                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminDashBoard