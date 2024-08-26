import { Route, Routes } from 'react-router';
import ChangePasswordPage from './ChangePasswordPage';
import CreateUser from './CreateUser';
import ListUser from './ListUser';
import OneUser from './OneUser';
import UserInvitePage from './UserInvitePage';

const AdminUserRoutes = () => {
    return (
        <Routes>
            <Route index element={<ListUser />} />
            <Route path="/:id" element={<OneUser />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/users-invite" element={<UserInvitePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
        </Routes>
    );
};

export default AdminUserRoutes;
