import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import withNavigation from "./WithNavigation";
import withParams from "./withParams";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx"
import ListTodosComponent from "./ListComponent.jsx"
import HeaderComponent from "./HeadComponent"
import FooterComponent from "./FooterComponent"
import LogoutComponent from "./LogoutComponent"
import WelcomeComponent from "./WelcomeComponent"
import TodoComponent from "./TodoComponent"


class TodoApp extends Component {

    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent))

        return (<div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/login" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/welcome/:name" element={<AuthenticatedRoute>
                            <WelcomeComponentWithParams/>
                        </AuthenticatedRoute>}/>
                        <Route path="/todos" element={<AuthenticatedRoute>
                            <ListTodosComponentWithNavigation/>
                        </AuthenticatedRoute>}/>
                        <Route path="/todos/:id" element={<AuthenticatedRoute>
                            <TodoComponentWithParamsAndNavigation/>
                        </AuthenticatedRoute>}/>
                        <Route path="/logout" element={<AuthenticatedRoute>
                            <LogoutComponent/>
                        </AuthenticatedRoute>}/>
                        <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>)
    }
}


function ErrorComponent() {
    return <div> An Error occurred. I don't know what to do.</div>
}

// function ShowInvalidCredentials(props) {
//     if(props.hasLoginFailed) return <div>Invalid Credentials</div>
//     else return null
// }

// function ShowLoginSuccessMessage(props) {
//     if(props.showSuccessMessage) return <div>Login Successful</div>
//     else return null
// }
export default TodoApp;