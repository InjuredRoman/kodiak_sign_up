import SessionsPage from 'components/Admin/Session/SessionsPage';
import SessionForm from 'components/Admin/Session/SessionForm';
import EnrollmentsPage from 'components/Admin/EnrollmentsPage';
import Dashboard from 'components/Admin/Dashboard';
import EnrollmentUpdate from 'components/Parent/EnrollmentUpdate';

const routes = [
    {
        path: '/dashboard',
        base: '/admin',
        name: 'Dashboard',
        component: Dashboard,
        isInTopbar: true
    },
    {
        path: '/enrollments',
        base: '/admin',
        name: 'Enrollments',
        component: EnrollmentsPage,
        isInTopbar: true
    },
    {
        path: '/new_session',
        base: '/admin',
        name: 'Create Session',
        component: SessionForm,
        isInTopbar: false,
    },
    {
        path: '/sessions',
        base: '/admin',
        name: 'Sessions',
        component: SessionsPage,
        isInTopbar: true
    },
    // {
    //     path: '/sessions/:session_id',
    //     base: '/admin',
    //     name: 'SessionView',
    //     component: SessionView,
    //     isInTopbar: false
    // },
    {
        path: '/update_enrollments/:token',
        base: '/',
        component: EnrollmentUpdate,
        isInTopbar: false,
    },
];
export default routes;
