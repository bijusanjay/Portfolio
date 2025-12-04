import { Route } from 'react-router-dom'
import Home from '../views/home'
import CreateForm from '../views/create-form'
import Portfolio from '../views/portfolio'
import Navbar from '../components/authorisation/navbar'

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    withNavbar: true,
  },
  {
    path: '/create',
    component: CreateForm,
    withNavbar: true,
  },
  {
    path: '/portfolio/:id',
    component: Portfolio,
    withNavbar: false,
  },
]

export const renderRoutes = () => {
  return routes.map((route) => (
    <Route 
      key={route.path} 
      exact={route.exact} 
      path={route.path}
      render={() => (
        <>
          {route.withNavbar && <Navbar />}
          <route.component />
        </>
      )}
    />
  ))
}

