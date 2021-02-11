import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './_Layout/Admin/AdminLogin';
import Routes, {Routers} from './Routes/AdminRoutes';
import 'antd/dist/antd.css';
import './style.css';

function App() {
  return (
    <div className="App">
        
          <Routes/>
    </div>
  );
}

export default App;
