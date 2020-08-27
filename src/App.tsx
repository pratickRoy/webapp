import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import TicTacToePage from "./tictactoe/TicTacToePage";

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {

    private static HOME_PATH = "/pratick-roy-website"

    constructor(props: AppProps) {

        super(props);
        this.state = {}
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path={App.HOME_PATH}>
                        <HomePage />
                    </Route>
                    <Route path={App.buildRoutePath("tictactoe")}>
                        <TicTacToePage />
                    </Route>
                </Switch>
            </Router>
        )
    }

    private static buildRoutePath(pagePath : string) {

        return App.HOME_PATH + "/" + pagePath;
    }
}