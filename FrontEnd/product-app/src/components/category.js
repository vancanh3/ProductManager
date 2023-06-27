import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import { POST_ADD_CATEGORY, GET_ALL_CATEGORIES, DELETE_CATEGORY_ID } from '../api/apiService';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    link: {
        padding: 10,
        display: 'inline-block'
    },
    txtInput: {
        width: '98%',
        margin: '1%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function Category() {
    const classes = useStyles();
    const [name, setName] = useState(null)
    const [slug, setSlug] = useState(null)
    const [categories, setCategories] = useState({});
    const [actionName, setActionName] = useState('Add');
    const [category, setCategory] = useState(null);

    useEffect(() => {
        /* GET API CATEGORIES */
        GET_ALL_CATEGORIES('category').then(item => {
            setCategories(item.data);
        });

    }, [])

    /* EVENT CHANGE TEXTFIELD IN FORM */
    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeSlug = (event) => {
        setSlug(event.target.value)
    }

    const addCategory = (event) => {
        event.preventDefault();
        if (name !== "" && slug !== "") {
            let category = {
                Name: name,
                SlugCategory: slug,
            }
            POST_ADD_CATEGORY(`category`, category).then(item => {
                if (item.data === 1) {
                    toast.success('Add category succeedd!')
                }
            })
        }
        else {
            toast.warning('All fields are required')
        }
    }

    const deleteCategoryId = (id) => {
        DELETE_CATEGORY_ID(`category/${id}`).then(item => {
            console.log(item)
            if (item.data === 1) {
                /* UPDATE PRODUCTS */
                setCategory(categories.filter(key => key.categoryId !== id))
            }
        })
    }

    const handleEditCategory = (category) => {
        setActionName('Edit')
        setCategory(category)
    }

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.title} variant="h4">
                                {actionName} Category
                            </Typography>
                            <Grid item xs={12} sm container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Category Name
                                    </Typography>
                                    <TextField value={category?.name} onChange={handleChangeName} placeholder="Name" variant="outlined" className={classes.txtInput} size="small" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Slug Category Name
                                    </Typography>
                                    <TextField value={category?.slugCategory} onChange={handleChangeSlug} placeholder="Slug" variant="outlined" className={classes.txtInput} size="small" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="button" onClick={addCategory} fullWidth variant="contained" color="primary" className={classes.submit} >
                                        {actionName} Category
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <h1>Category List</h1>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Category Name</TableCell>
                            <TableCell align="center">Slug</TableCell>
                            <TableCell align="center">Modify</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 && categories.map((row) => (
                            <TableRow key={row.categoryId}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="center">{row.slugCategory}</TableCell>
                                <TableCell align="center">
                                    <Button size="small" variant="contained" color="primary" onClick={() => handleEditCategory(row)}>Edit</Button>
                                </TableCell>
                                <TableCell align="center">

                                    <Button size="small" variant="contained" color="secondary" onClick={() => deleteCategoryId(row.categoryId)}>Remove</Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}