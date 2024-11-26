import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import MatchGame from '../components/MatchGame/MatchGame';
import ImageForm from '../components/ImageForm/ImageForm'
import SpaceStationHub from '../components/SpaceStationHub/SpaceStationHub';
import CreatePlanet from '../components/Planet/CreatePlanet';
import ManagePlanets from '../components/Planet/ManagePlanets';
import ViewPlanet from '../components/Planet/ViewPlanet'
import CreateCard from '../components/Card/CreateCard'
import ViewAllCards from '../components/Card/ViewAllCards';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SpaceStationHub />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"mission",
        element: <MatchGame />,
      },
      {
        path:"images",
        element: <ImageForm />,
      },
      {
        path:"planets",
        element: <ManagePlanets />,
      },
      {
        path:"planets/new",
        element: <CreatePlanet />,
      },
      {
        path:"planets/:planetId",
        element: <ViewPlanet />,
      },
      {
        path:"cards",
        element: <ViewAllCards />,
      },
      {
        path:"cards/new",
        element: <CreateCard />,
      },
      {
        path: "*",
        element: <SpaceStationHub />,
      },
    ],
  },
]);