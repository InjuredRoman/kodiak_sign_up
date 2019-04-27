import ActivitiesPage from 'components/Admin/ActivitiesPage';
import ActivityForm from 'components/Admin/ActivityForm';
import EnrollmentsPage from 'components/Admin/EnrollmentsPage';
import Homepage from 'components/Admin/Homepage';
import EnrollmentUpdate from 'components/Parent/EnrollmentUpdate';

const routes = [
    {
        path: '/dashboard',
        base: '/admin',
        name: 'Dashboard',
        component: Homepage,
    },
    {
        path: '/enrollments',
        base: '/admin',
        name: 'Enrollments',
        component: EnrollmentsPage,
    },
    {
        path: '/new_session',
        base: '/admin',
        name: 'Create Session',
        component: ActivityForm,
    },
    {
        path: '/sessions',
        base: '/admin',
        name: 'Sessions',
        component: ActivitiesPage,
    },
    {
        path: '/update_enrollments/:token',
        base: '/',
        component: EnrollmentUpdate,
    },
];
export default routes;
