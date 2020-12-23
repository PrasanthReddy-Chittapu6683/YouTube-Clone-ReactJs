import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RecommendedVideos from "./RecommendedVideos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./SearchPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app__page">
          <Switch>
            <Route path="/search/:searchTerm">
              <Sidebar />
              <SearchPage />
            </Route>
            <Route path="/">
              <Sidebar />
              <RecommendedVideos />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
