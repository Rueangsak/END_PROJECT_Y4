import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  AppButton,
  AppCard,
  AppEmptyState,
  AppInput,
  AppLoader,
  AppModal,
  AppTable,
  useAppFeedback,
} from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';
import { auth, db } from '../firebase/firebase';
import serviceApi from '../firebase/serviceApi';

const AddTodoForm = () => {
  const { confirm, notifyError, notifySuccess } = useAppFeedback();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [creating, setCreating] = useState(false);

  const handleDialogOpen = (form) => {
    setSelectedForm(form);
    setNewValue(form.nameWork);
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleUpdate = () => {
    if (!selectedForm) return;
    updateDoc(doc(db, 'Form', selectedForm.id), { nameWork: newValue });
    handleDialogClose();
  };

  const addNewForm = () => {
    if (name.trim() === '') {
      setLoadError('Please enter a presentation name.');
      return;
    }
    setLoadError('');
    setCreating(true);
    serviceApi.addFormToDB(
      auth.currentUser.uid,
      name,
      () => {
        setCreating(false);
        setName('');
        notifySuccess('Presentation created');
      },
      () => {
        setCreating(false);
        notifyError('Could not create presentation');
      }
    );
  };

  const deleteform = async (form) => {
    const ok = await confirm({
      title: 'Delete presentation?',
      message: `"${form.nameWork}" and all its slides will be removed permanently.`,
      confirmLabel: 'Delete',
      destructive: true,
    });
    if (!ok) return;
    deleteDoc(doc(db, 'Form', form.id)).catch(() => notifyError('Could not delete presentation'));
  };

  const getSuccess = (data) => {
    setForms(data);
    setLoading(false);
    setLoadError('');
  };

  useEffect(() => {
    const unsub = serviceApi.getForm(getSuccess, () => {
      setLoadError('Could not load presentations.');
      setLoading(false);
    });
    return () => unsub?.();
  }, []);

  if (loading) {
    return <AppLoader message="Loading presentations..." />;
  }

  const columns = [
    { id: 'name', label: 'Presentation' },
    { id: 'actions', label: 'Actions', align: 'right' },
  ];

  const tableRows = forms.map((form) => ({
    id: form.id,
    name: form.nameWork,
    actions: (
      <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
        <AppButton component={Link} to={`/Open/${form.id}`} variant="contained" size="small">
          Open
        </AppButton>
        <AppButton variant="outlined" size="small" onClick={() => handleDialogOpen(form)}>
          Rename
        </AppButton>
        <AppButton variant="outlined" color="error" size="small" onClick={() => deleteform(form)}>
          Delete
        </AppButton>
      </Stack>
    ),
  }));

  return (
    <Stack spacing={layoutSpacing.section}>
      <AppCard padding="md">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={layoutSpacing.form}
          alignItems={{ xs: 'stretch', sm: 'flex-end' }}
        >
          <AppInput
            label="New presentation name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewForm())}
            error={Boolean(loadError)}
            helperText={loadError || ' '}
          />
          <AppButton variant="contained" onClick={addNewForm} loading={creating} disabled={creating} sx={{ flexShrink: 0 }}>
            Create
          </AppButton>
        </Stack>
      </AppCard>

      {forms.length === 0 ? (
        <AppEmptyState
          title="No presentations yet"
          description="Create your first session to start building slides and engaging students."
        />
      ) : isMobile ? (
        <Stack spacing={2}>
          {forms.map((form) => (
            <AppCard key={form.id} title={form.nameWork} padding="md">
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <AppButton component={Link} to={`/Open/${form.id}`} variant="contained" size="small">
                  Open
                </AppButton>
                <AppButton variant="outlined" size="small" onClick={() => handleDialogOpen(form)}>
                  Rename
                </AppButton>
                <AppButton variant="outlined" color="error" size="small" onClick={() => deleteform(form)}>
                  Delete
                </AppButton>
              </Stack>
            </AppCard>
          ))}
        </Stack>
      ) : (
        <AppTable columns={columns} rows={tableRows} />
      )}

      <AppModal open={dialogOpen} onClose={handleDialogClose} title="Rename presentation" maxWidth="xs">
        <AppInput label="Name" value={newValue} onChange={(e) => setNewValue(e.target.value)} autoFocus />
        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 3 }}>
          <AppButton variant="outlined" onClick={handleDialogClose}>
            Cancel
          </AppButton>
          <AppButton variant="contained" onClick={handleUpdate}>
            Save
          </AppButton>
        </Stack>
      </AppModal>
    </Stack>
  );
};

export default AddTodoForm;
