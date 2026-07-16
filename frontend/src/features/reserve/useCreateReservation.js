import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservation as createReservationApi } from '../../api/services/reservations.service';
import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useCreateReservation() {
  //! React Query
  const queryClient = useQueryClient();
  const { mutate: createReservation, isPending: isCreatingReservation } = useMutation({
    mutationFn: createReservationApi,
    onSuccess: () => {
      toast.success('رزرو با موفقیت ایجاد شد.');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { createReservation, isCreatingReservation };
}
