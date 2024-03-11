import { Route, Routes, BrowserRouter} from "react-router-dom";
 
import Home from './pages/Home/Home.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Products from './pages/Products/Products.jsx';
import Purchase from './pages/Home/Purchase.jsx';
import History from './pages/History/History.jsx';
 
const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component={ Home } path="/" />
                <Route Component={ Purchase } path="/purchase"/>
                <Route Component={ Categories } path="/categories" />
                <Route Component={ Products } path="/products" />
                <Route Component={ History } path="/history" />
            </Routes>
        </BrowserRouter>
    )
}
 
export default Router;