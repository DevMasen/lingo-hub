import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitReservation as submitReservationApi } from '../../api/services/reservations.service';
import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useSubmitReservation() {
  //! React Query
  const queryClient = useQueryClient();
  const { mutate: submitReservation, isPending: isSubmittingReservation } = useMutation({
    mutationFn: submitReservationApi,
    onSuccess: () => {
      toast.success('رزرو با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { submitReservation, isSubmittingReservation };
}
