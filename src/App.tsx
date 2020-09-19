import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import TicTacToePage from "./tictactoe/TicTacToePage";

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {

        super(props);
        this.state = {}
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route path={App.buildRoutePath("home")}>
                        <HomePage />
                    </Route>
                    <Route path={App.buildRoutePath("builds/tictactoe")}>
                        <TicTacToePage />
                    </Route>
                </Switch>
            </Router>
        )
    }

    private static buildRoutePath(pagePath : string) {

        return "/" + pagePath;
    }
}