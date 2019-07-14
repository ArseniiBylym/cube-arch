import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './routes/Home/Home';
import {Spinner} from './components/shared';

const Layout = lazy(() => import('./routes/Layout/Layout'));
const Admin = lazy(() => import('./routes/Admin/Admin'));

function App() {
    return (
        <div>
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/" component={Layout} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
