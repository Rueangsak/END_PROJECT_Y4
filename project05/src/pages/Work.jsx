import Presentation from '../c-createfile/presentation';
import { DashboardLayout } from '../layout';

const Work = () => (
  <DashboardLayout
    title="Presentations"
    subtitle="Create sessions, open the editor, and share QR codes with your class."
  >
    <Presentation />
  </DashboardLayout>
);

export default Work;
