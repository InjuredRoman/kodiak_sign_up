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
        component: ActivityForm,
        isInTopbar: false,
    },
    {
        path: '/sessions',
        base: '/admin',
        name: 'Sessions',
        component: ActivitiesPage,
        isInTopbar: true
    },
    {
        path: '/update_enrollments/:token',
        base: '/',
        component: EnrollmentUpdate,
        isInTopbar: false,
    },
];
export default routes;
