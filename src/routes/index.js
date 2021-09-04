import Home from 'containers/client/Home/Home';
import MovieDetail from 'containers/client/MovieDetail/MovieDetail';
import SeatPlan from 'containers/client/SeatPlan/SeatPlan';
import Theater from 'containers/client/Theater/Theater';
import AdminInfo from 'containers/admin/Home/AdminInfo';
import Movie from 'containers/client/Movie/Movie';
import Contact from 'components/Contact/Contact';
import UserAcount from 'containers/admin/UserAccount/UserAcount';

export const clientRoutes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/theater',
    component: Theater,
    exact: false,
  },
  {
    path: '/movie',
    component: Movie,
    exact: false,
  },
  {
    path: '/contact',
    component:Contact ,
    exact: false,
  },
  {
    path: '/movie-detail/:movieId',
    component: MovieDetail,
    exact: true,
  },
  {
    path: '/seat-plan/:showtimeId',
    component: SeatPlan,
    exact: false,
  },
  {
    path: '/admin/UserAcount',
    component: UserAcount,
    exact: false,
  },
];

export const adminRoutes = [
  {
    path: '/admin',
    component: AdminInfo,
    exact: false,
  },
];
