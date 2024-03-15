import { Route, Routes, BrowserRouter} from "react-router-dom";
import { isAuthenticated } from "./Auth.js";
 
import Home from './pages/Home/Home.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Products from './pages/Products/Products.jsx';
import Purchase from './pages/Home/Purchase.jsx';
import History from './pages/History/History.jsx';
import Login from './pages/Login/Login.jsx';
 
const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component={ Home } path="/" />
                {isAuthenticated() == true ?
                <>
                    <Route Component={ Categories } path="/categories" />
                    <Route Component={ Products } path="/products" />
                </>
                :
                null
                }
                {isAuthenticated() != null ?
                <>
                    <Route Component={ Purchase } path="/purchase"/>
                    <Route Component={ History } path="/history" />
                </>
                :
                null
                }
                <Route Component={ Login } path="/login" />
            </Routes>
        </BrowserRouter>
    )
}
 
export default Router;