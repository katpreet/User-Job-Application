import React from 'react'
import ApplicationForm from './Application'
import AdminDashboard from './AdminDashBoard'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

function App(props){
    return (
        <BrowserRouter>
        <div>
            <h1>User Job Application</h1>

            {/*For loading application form at the root we give following*/}
            <Route path="/" component={ApplicationForm} exact={true}/>
            

            {/*<Redirect to="/Admin" />*/}
            <Route path="/Admin" component={AdminDashboard} />

            
                
    
        </div>
        </BrowserRouter>
    )
}
export default App