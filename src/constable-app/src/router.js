import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/"><App /></Route>
                <Redirect from="*" to="/"></Redirect>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;