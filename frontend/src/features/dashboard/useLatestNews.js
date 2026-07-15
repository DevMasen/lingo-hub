import { useQuery } from '@tanstack/react-query';

import { getLatestNews } from '../../api/services/news.service';
import { useError } from '../../hooks/useError';
//---

export function useLatestNews(limit) {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({ queryKey: ['news'], queryFn: () => getLatestNews(limit) });

  useError(error);

  return { news, isLoading, error };
}
