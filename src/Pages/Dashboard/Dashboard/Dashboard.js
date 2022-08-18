import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';
import DashboardHome from '../DashboardHome/DashboardHome';
import Payment from '../Payment/Payment';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import MyOrders from '../MyOrders/MyOrders';
import ManageOrders from '../ManageOrders/ManageOrders';
import PostReview from '../PostReview/PostReview';
import AddProduct from '../AddProduct/AddProduct';
import ManageProducts from '../ManageProducts/ManageProducts';

const Dashboard = () => {
    const { admin } = useAuth();
    let { path, url } = useRouteMatch();
    return (
        <div className="d-flex">
            <div className="col-4 col-lg-2">
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
                    <Navbar.Brand as={Link} className="d-flex align-items-center m-0 p-0 link-dark text-decoration-none fs-3" to={`${url}`}>Dashboard</Navbar.Brand>
                    <hr></hr>
                    <ul className="nav nav-pills flex-column mb-auto">

                        {/* <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/payment`}>Payment</Nav.Link> */}

                        {admin && <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/admin`}>Make Admin</Nav.Link>}

                        <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/my_orders`}>My Orders</Nav.Link>

                        {admin && <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/manage_orders`}>Manage Orders</Nav.Link>}

                        <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/review`}>Review Product</Nav.Link>

                        {admin && <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/manage_products`}>Manage Products</Nav.Link>}

                        {admin && <Nav.Link as={HashLink} className="nav-link link-dark" to={`${url}/add_product`}>Add Product</Nav.Link>}
                    </ul>
                </div>
            </div>
            <div className="col-8 col-lg-10">
                <Switch>
                    <Route exact path={path}>
                        <DashboardHome></DashboardHome>
                    </Route>
                    <Route path={`${path}/payment/:orderId`}>
                        <Payment></Payment>
                    </Route>
                    <Route exact path={`${path}/admin`}>
                        <MakeAdmin></MakeAdmin>
                    </Route>
                    <Route exact path={`${path}/my_orders`}>
                        <MyOrders></MyOrders>
                    </Route>
                    <Route exact path={`${path}/manage_orders`}>
                        <ManageOrders></ManageOrders>
                    </Route>
                    <Route exact path={`${path}/review`}>
                        <PostReview></PostReview>
                    </Route>
                    <Route exact path={`${path}/manage_products`}>
                        <ManageProducts></ManageProducts>
                    </Route>
                    <Route exact path={`${path}/add_product`}>
                        <AddProduct></AddProduct>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;