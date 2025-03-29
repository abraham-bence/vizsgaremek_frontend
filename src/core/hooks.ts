import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "./api";
import { Product } from "./interfaces";
import { useSearchParams } from "react-router-dom";

export function useProducts(): UseQueryResult<Product[]> {
    const [search] = useSearchParams()

    return useQuery({
        queryKey: ['products', search.toString()],
        queryFn: () =>
            apiClient
                .get('/products/search', {
                    params: {
                        search: search
                    }
                })
                .then(res => res.data),
        staleTime: 1000 * 60 * 2, // 2 minutes
    })
}

export function useProperties(propType: string): UseQueryResult<string[]> {
    return useQuery({ queryKey: [propType], queryFn: () => apiClient.get('/products/filter/' + propType).then(res => res.data) })
}

export function usePropertiesWhere(propType: string, where: string): UseQueryResult<string[]> {
    return useQuery({ queryKey: ['properties'], queryFn: () => apiClient.get('/products/filter/' + propType + '/' + where).then(res => res.data) })
}
