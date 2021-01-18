import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RecommendedVideos from "./RecommendedVideos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import Subscription from "./Subscription";
import ChannelDetails from "./ChannelDetails";
import PlayVideos from "./PlayVideos";
// https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY] HTTP/1.1
// 
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
            <Route path="/channel/:channelID">
              <Sidebar />
              <ChannelDetails />
            </Route>
            <Route path="/play/:type/:playID/:cID">
              <Sidebar />
              <PlayVideos />
            </Route>
            <Route path="/subscription">
              <Sidebar />
              <Subscription/>
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
