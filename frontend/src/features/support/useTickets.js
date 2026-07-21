// src/features/support/useTickets.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as supportService from '../../api/services/support.service';

const TICKETS_QUERY_KEY = ['support', 'tickets'];

export function useTickets() {
  const qc = useQueryClient();

  const query = useQuery(TICKETS_QUERY_KEY, async () => {
    const data = await supportService.getTickets();
    return data;
  });

  const mutation = useMutation(
    (payload) => supportService.createTicket(payload),
    {
      onSuccess(created) {
        // Update query cache so the UI shows the new ticket immediately
        qc.setQueryData(TICKETS_QUERY_KEY, (old = []) => [created, ...old]);
      },
    }
  );

  return {
    tickets: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    createTicket: mutation.mutateAsync,
    creating: mutation.isLoading,
  };
}
