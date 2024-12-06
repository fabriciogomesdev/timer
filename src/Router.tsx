import { Routes, Route} from 'react-router-dom'
import { Home } from './pages/home/index';
import { History } from './pages/history/index';
import { DefaultLayout } from './layouts/DefaultLayout/Index';

export function Router(){
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout/>}>
                <Route path='/' element={<Home />}/>
                <Route path='/history' element={<History />}/>
            </Route>  
        </Routes>
    );
}