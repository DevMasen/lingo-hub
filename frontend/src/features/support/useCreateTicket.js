import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket as createTicketApi } from '../../api/services/tickets.service';
import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const { mutate: createTicket, isPending: isCreatingTicket } = useMutation({
    mutationFn: createTicketApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('تیکت با موفقیت ایجاد شد. درخواست شما در اولین فرصت بررسی خواهد شد.');
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { createTicket, isCreatingTicket };
}
