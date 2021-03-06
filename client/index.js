import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";

// Router
import { Route, Router, Redirect } from "react-router-dom";
import {PrivateRoute} from "./components/Utilites/PrivateRoute.js";
import { history } from "./store/history";
import RouteTable from "./Routes";

// Redux
import { Provider, connect } from "react-redux";
import { store } from "./store";

// @ts-ignore
import styles from "./styles/style.scss";
import Header from "./components/Header/Header.jsx";
import { InitialAuthComponent } from "./components/Utilites/InitialAuthCompoment";
import { Layout } from "./components/Layout/Layout";
import Modal from "./components/Utilites/Modal";

import LogginDayComponent from "./components/Logging/LogginDayComponent";

const Homepage = (props) => (
    <Layout>
        <div>Homepage</div>
    </Layout>
);

render(
    <Router history={history}>
        <Provider store={store}>
            <InitialAuthComponent>
                <Header />
                <Route exact path="/" component={Homepage} />
                <Route path="/login" component={RouteTable["Login Page"]} />
                <PrivateRoute path="/log" component={LogginDayComponent} />
                <Modal />
            </InitialAuthComponent>
        </Provider>
    </Router>,
    document.querySelector("#appContainer")
);