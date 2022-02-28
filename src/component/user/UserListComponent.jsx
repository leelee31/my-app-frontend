import React, { Component } from "react";
import ApiService from "../../ApiService";
import { getNavigate } from "./UseNavigateComponent";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class UserListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: null
        }
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList = () => {
        ApiService.fetchUsers()
        .then(response => {
            this.setState({
                users: response.data
            });
        })
        .catch(error => {
            console.log('reloadUserList() Error: ', error);
        })
    }

    deleteUser = (userId) => {
        ApiService.deleteUser(userId)
        .then(response => {
            this.setState({
                message: 'User Deleted Successfully'
            });
            this.setState({
                users: this.state.users.filter( user => user.id !== userId)
            });
        })
        .catch(error => {
            console.log('deletedUser() Error:', error);
        })
    }

    editUser = (Id, navigation) => {
        window.localStorage.setItem('userId', Id);
        navigation('/edit/user');
    }

    addUser = (navigation) => {
        window.localStorage.removeItem('userId');
        navigation('/add/user');
    }

    render() {
        const { navigation } = this.props;
        return (
            <div>
                <Typography variant="h4" style={style}>User List</Typography>
                <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={() => this.addUser(navigation)}> Add User </Button>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Salary</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map( user => 
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="user">{user.id}</TableCell>
                                <TableCell align="center">{user.firstName}</TableCell>
                                <TableCell align="center">{user.lastName}</TableCell>
                                <TableCell align="center">{user.userName}</TableCell>
                                <TableCell align="center">{user.age}</TableCell>
                                <TableCell align="center">{user.salary}</TableCell>
                                <TableCell align="center" onClick={() => this.editUser(user.id, navigation)}>
                                    <CreateIcon />
                                </TableCell>
                                <TableCell align="center" onClick={() => this.deleteUser(user.id)}>
                                    <DeleteIcon />
                                </TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default getNavigate(UserListComponent);