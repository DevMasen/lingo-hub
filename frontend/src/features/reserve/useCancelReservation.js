import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation as cancelReservationApi } from '../../api/services/reservations.service';
import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useCancelReservation() {
  //! React Query
  const queryClient = useQueryClient();
  const { mutate: cancelReservation, isPending: isCancelingReservation } = useMutation({
    mutationFn: cancelReservationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('رزرو با موفقیت لغو شد');
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { cancelReservation, isCancelingReservation };
}
