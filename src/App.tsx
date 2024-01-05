import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route) => {
            if (route.route === undefined) {
              return <Route path={route.path} element={route.element} />;
            } else {
              return (
                <Route path={route.path} element={route.element}>
                  {route.route.map((subRoute) => {
                    return <Route path={subRoute.path} element={subRoute.element} />;
                  })}
                </Route>
              );
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
