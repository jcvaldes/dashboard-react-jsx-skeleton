import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routesAdmin from './routes/private/routes.admin'
import routesPublic from './routes/routes.public'
import './App.scss'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoutes from './routes/ProtectedRoutes'

const App = () => (
  // console.log(routes);
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/admin" exact={true} element={<AdminHome />} /> */}
        <Route element={<ProtectedRoutes />}>
          {routesAdmin.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          ))}
        </Route>

        {routesPublic.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)

export default App
