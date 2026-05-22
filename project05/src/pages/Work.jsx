import Presentation from '../c-createfile/presentation';
import { DashboardLayout } from '../layout';

const Work = () => {
  const copy = {
    title: 'Presentations',
    subtitle: 'Create new sessions, open the editor, and share QR access with participants in your class.',
  };

  return (
    <DashboardLayout title={copy.title} subtitle={copy.subtitle}>
      <Presentation />
    </DashboardLayout>
  );
};

export default Work;
