import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { getErrorMessage } from '../utils/getErrorMessage';
//---

export function useError(queryError) {
  useEffect(() => {
    if (queryError) {
      console.error(queryError);
      toast.error(getErrorMessage(queryError));
    }
  }, [queryError]);
}
