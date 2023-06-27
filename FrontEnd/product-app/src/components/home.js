import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom'
import { GET_ALL_PRODUCTS, DELETE_PRODUCT_ID } from '../api/apiService';
import ConfirmModal from './deleteProductModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        width: '100%',
        margin: 'auto'
    },
    removeLink: {
        textDecoration: 'none'
    }
}));
export default function Home() {
    const classes = useStyles();
    const [products, setProducts] = useState({});
    const [checkDeleteProduct, setCheckDeleteProduct] = useState(false);
    const [close, setClose] = React.useState(false);
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [value, setValue] = useState("important note");

    useEffect(() => {
        /* GET ALL PRODUCTS */
        GET_ALL_PRODUCTS(`product`).then(item => {
            setProducts(item?.data)
        })

    }, [])
    /* Show body HTML */
    const RawHTML = (body, className) =>
        <div className={className} dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} />

    /* DELETE PRODUCT ID */
    const deleteProductID = (id) => {
        setIsOpenModal(true)
        // DELETE_PRODUCT_ID(`product/${id}`).then(item => {
        //     if (item.data === 1) {
        //         setCheckDeleteProduct(true);
        //         /* UPDATE PRODUCTS */
        //         setProducts(products.filter(key => key.productId !== id))
        //     }
        // })
    }

    const handleSubmit = () => {
        setValue("deleted");
    };
    const handleCancel = () => {
        setIsOpenModal(false)
    };

    const buildModal = () => {
        return (
            isOpenModal ?
                <ConfirmModal
                    title="Delete product"
                    description="Are you sure to delete this product?"
                    callbackFunction={handleSubmit}
                    handleCancel={handleCancel}
                >
                </ConfirmModal>
                : ''
        )
    }

    return (
        <div className={classes.root}>
            {buildModal()}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {checkDeleteProduct && <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setClose(true);
                                        setCheckDeleteProduct(false)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >Detele successfuly</Alert>}
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="center">Body</TableCell>
                                        <TableCell align="center">Slug</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Modify</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.length > 0 && products.map((row) => (
                                        <TableRow key={row.productId}>
                                            <TableCell component="th" scope="row">{row.title}</TableCell>
                                            <TableCell align="left">{RawHTML(row.body, "body")}</TableCell>
                                            <TableCell align="center">{row.slug}</TableCell>
                                            <TableCell align="center">{row.category.name}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`/edit/product/${row.productId}`} className={classes.removeLink}>
                                                    <Button size="small" variant="contained" color="primary">Edit</Button></Link>
                                            </TableCell>
                                            <TableCell align="center">

                                                <Button size="small" variant="contained" color="secondary" onClick={() => deleteProductID(row.productId)}>Remove</Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}
