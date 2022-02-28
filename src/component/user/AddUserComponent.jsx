import React, { Component } from "react";
import ApiService from "../../ApiService";
import { getNavigate } from "./UseNavigateComponent";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class AddUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveUser = (navigation) => {
        let user = {
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            salary: this.state.salary
        }

        ApiService.addUser(user)
            .then(response => {
                this.setState({
                    message: user.userName + '님이 성공적으로 등록되었습니다.'
                });
                console.log(this.state.message);
                navigation('/users');
            })
            .catch(error => {
                console.log('saveUser() Error:', error);
            })
    }

    render() {
        const { navigation } = this.props;
        return (
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                    <TextField type="text" placeholder="please input your user name" name="userName"
                        fullWidth value={this.state.userName} onChange={this.onChange} />

                    <TextField type="password" placeholder="please input your password" name="password"
                        fullWidth value={this.state.password} onChange={this.onChange} />

                    <TextField type="text" placeholder="please input your first name" name="firstName"
                        fullWidth value={this.state.firstName} onChange={this.onChange} />

                    <TextField type="text" placeholder="please input your last name" name="lastName"
                        fullWidth value={this.state.lastName} onChange={this.onChange} />

                    <TextField type="number" placeholder="please input your age" name="age"
                        fullWidth value={this.state.age} onChange={this.onChange} />

                    <TextField type="number" placeholder="please input your salary" name="salary"
                        fullWidth value={this.state.salary} onChange={this.onChange} />
                </form>
                <Button variant="contained" color="primary" onClick={() => this.saveUser(navigation)}> Save </Button>
            </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default getNavigate(AddUserComponent);