import { useQuery } from '@tanstack/react-query';
import { useError } from '../../hooks/useError';
import { getLatestNews } from '../../api/services/news.service';
//---

export function useLatestNews(limit) {
  //! React Query
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({ queryKey: ['news'], queryFn: () => getLatestNews(limit) });

  //! Custom Hooks
  useError(error);

  return { news, isLoading, error };
}
