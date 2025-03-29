import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "./api";
import { Product } from "./interfaces";

export function useProducts() :UseQueryResult<Product[]> {
    return useQuery({ queryKey: ['products'], queryFn: () => apiClient.get('/products').then(res => res.data) })
}

export function useProperties(propType : string) :UseQueryResult<string[]> {
    return useQuery({ queryKey: ['properties'], queryFn: () => apiClient.get('/products/filter/' + propType).then(res => res.data) })
}