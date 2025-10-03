import { useQuery } from "@tanstack/react-query";
import { unifiedSearch } from "../api/searchApi";

export const useUnifiedSearch = (q) => {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () => unifiedSearch(q),
    enabled: !!q,
  });
};
