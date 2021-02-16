import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from 'react-router-dom';
import AdminRoutes from './Routes/AdminRoutes';
import DoctorRoutes from './Routes/DoctorRoutes';
import 'antd/dist/antd.css';
import './style.css';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
function App() {
  const history = createBrowserHistory({
    basename: '/'
    });
  return (
    <div className="App">
      <Router history={history}>
          <AdminRoutes />
          <DoctorRoutes />
      </Router>
    </div>
  );
}

export default App;
