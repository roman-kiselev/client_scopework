import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { SuspenseLoad } from 'src/entities';

const MainPage = lazy(() => import('./MainPage'));

const AdminNewObjectsRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <SuspenseLoad>
                        <MainPage />
                    </SuspenseLoad>
                }
            />
        </Routes>
    );
};

export default AdminNewObjectsRoutes;
