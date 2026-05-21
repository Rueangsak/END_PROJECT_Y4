import { Outlet, useLocation } from 'react-router-dom';
import { PageTransition } from '../design-system/motion';

/** Wraps nested routes with a subtle fade on navigation. */
export default function PageTransitionLayout() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Outlet />
    </PageTransition>
  );
}
