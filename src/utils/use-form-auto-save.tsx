import React, { useCallback, useState } from 'react';
import { useFormikContext } from 'formik';

import { debounce } from './function';

export interface FormAutoSaveProps {
  debounceMs: number;
}

export const useFormAutoSave = ({ debounceMs }: FormAutoSaveProps) => {
  const formik = useFormikContext();
  const [_, setLastSaved] = useState<Date | undefined>();

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm().then(() => setLastSaved(new Date())), debounceMs),
    [debounceMs, formik.values]
  );

  React.useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);
};
