import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // color: theme.palette.text.primary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        // color: theme.palette.text.secondary,
    },
}));

export default function Students() {
    const classes = useStyles();

    const [Students, setStudents] = useState([]);
    useEffect(() => {
        StudentsGet()
    }, [])
    const [searchName, setSearchName] = useState([]);

    const StudentsGet = (name = '') => {
        let url = "http://127.0.0.1:5000/students"
        if (name !== '') {
            url = `http://127.0.0.1:5000/studentsSearch/${name}`
        }

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setStudents(result)
                }
            )
    }

    const doSearchName = (name) => {
        StudentsGet(name)
        setSearchName(name)
    }

    const StudentsDelete = id => {
        var data = {
            'id': id
        }
        fetch(`http://127.0.0.1:5000/students/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    alert(result['message'])
                    StudentsGet();
                }
            )    
    }

return (
    // <div className={classes.root}>
    <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
            <Box display="flex">
                <Box flexGrow={1}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Students
                    </Typography>
                </Box>
                <Box align="right">
                    <Link to="/StudentsCreate">
                        <Button variant="contained" color="primary">
                            ADD NEW STUDENT
                        </Button>
                    </Link>
                </Box>
                <Box>
                    <TextField
                        variant="outlined"
                        required
                        id="searchName"
                        label="Search By Name"
                        onChange={(e) => doSearchName(e.target.value)}
                    />
                </Box>
                    
                </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Student Id</TableCell>
                            <TableCell align="left">Student Name</TableCell>
                            <TableCell align="left">Student email</TableCell>
                            <TableCell align="left">grade</TableCell>
                            <TableCell align="left">subject</TableCell>

                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell align="center">{student.id}</TableCell>
                                <TableCell align="left">{student.name}</TableCell>
                                <TableCell align="left">{student.email}</TableCell>
                                <TableCell align="left">{student.grade}</TableCell>
                                <TableCell align="left">{student.subject}</TableCell>

                                <TableCell align="center">
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button onClick={() => StudentsDelete(student.id)}>Del</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Container>
    // </div>

);
}

