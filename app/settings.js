export const Routes = {
  home: '/',
  registration: '/registration',
  login: '/login',
  dashboard: {
    main: '/dashboard',
    new: '/dashboard/new',
    edit: '/dashboard/:slug'
  },
  news: {
    list: '/news',
    one: '/news/:slug'
  }
};
