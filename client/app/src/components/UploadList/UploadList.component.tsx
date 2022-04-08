import { Dialog, DialogContent, TextField, DialogActions, Button, DialogProps, DialogTitle, Box } from '@mui/material';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

export interface UploadListValues {
    listName: string;
    domains: string[];
}

export type UploadListComponentProps = Omit<DialogProps, 'onSubmit'> & {
    onSubmit: (values: UploadListValues) => void;
    submitting?: boolean;
};

interface DomainFiled {
    id: string;
    value: string;
    error?: boolean;
}

// TODO move to utils
const isValidUrl = (url: string) => {
    try {
        return Boolean(new URL(url));
    } catch (_ex) {
        return false;
    }
};

const UploadListComponent = ({ open: openProp, onSubmit, submitting = false, onClose, ...rest }: UploadListComponentProps) => {
    const [open, setOpen] = useState(openProp);

    const [listName, setListName] = useState('');
    const [listNameEmpty, setListNameEmpty] = useState(false);
    const [domains, setDomains] = useState<DomainFiled[]>([
        {
            id: `${Math.random()}`,
            value: '',
        },
    ]);

    useEffect(() => setOpen(openProp), [openProp]);

    const handleClose = useCallback(() => {
        setListName('');
        setDomains([
            {
                id: `${Math.random()}`,
                value: '',
            },
        ]);
        setListNameEmpty(false);
        setOpen(false);

        if (onClose) {
            onClose({}, 'backdropClick');
        }
    }, [onClose]);

    const onListNameChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        setListName(e.target.value);
    }, []);

    const onDomainChange = useCallback<(index: number) => ChangeEventHandler<HTMLInputElement>>(
        (index: number) => (e) => {
            setDomains((prevValue) => prevValue.map((d, i) => (i === index ? { ...d, value: e.target.value } : d)));
        },
        [],
    );

    const onAddDomainHandler = useCallback(() => {
        setDomains((prevValue) =>
            prevValue.concat({
                id: `${Math.random()}`,
                value: '',
            }),
        );
    }, []);

    const onClearAllDomainsHandler = useCallback(() => {
        setDomains([
            {
                id: `${Math.random()}`,
                value: '',
            },
        ]);
    }, []);

    const onSubmitHandler = useCallback(() => {
        let isValid = true;

        if (!listName.trim()) {
            setListNameEmpty(true);
            isValid = false;
        }

        if (domains.some((d) => !isValidUrl(d.value))) {
            setDomains((prevDomains) => prevDomains.map((d) => ({ ...d, error: !isValidUrl(d.value) })));
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        onSubmit({
            listName: listName.trim(),
            domains: domains.map((d) => d.value),
        });
    }, [listName, domains, onSubmit]);

    return (
        <Dialog fullWidth maxWidth="sm" scroll="paper" open={open} {...rest} onClose={handleClose}>
            <DialogTitle sx={{ pt: 6, pb: 3, textAlign: 'center' }}>New URL List</DialogTitle>
            <Box sx={{ px: 10 }}>
                <TextField
                    fullWidth
                    disabled={submitting}
                    value={listName}
                    onChange={onListNameChange}
                    label="List Name"
                    error={listNameEmpty}
                    helperText={listNameEmpty ? 'List Name is required' : undefined}
                />
            </Box>
            <DialogContent sx={{ pt: 0, pl: 10, pr: 7, pb: 4 }}>
                {domains.map((domain, index) => (
                    <Box sx={{ width: 'calc(100% - 24px)', pt: 3 }} key={domain.id}>
                        <TextField
                            fullWidth
                            disabled={submitting}
                            value={domain.value}
                            onChange={onDomainChange(index)}
                            label="URL"
                            placeholder="input URL"
                            error={domain.error}
                            helperText={domain.error ? 'URL is invalid' : undefined}
                        />
                    </Box>
                ))}
            </DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 10 }}>
                <Button disabled={submitting} variant="text" onClick={onAddDomainHandler} color="primary">
                    + ADD MORE URLs
                </Button>
                <Button disabled={submitting} variant="text" onClick={onClearAllDomainsHandler} color="secondary">
                    Clear all
                </Button>
            </Box>
            <DialogActions sx={{ justifyContent: 'center', px: 10, pt: 4, pb: 7 }}>
                <Button size="large" disabled={submitting} onClick={onSubmitHandler} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadListComponent;
