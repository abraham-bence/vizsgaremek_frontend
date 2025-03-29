import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000'
})

const queryClient = new QueryClient();

export { apiClient, queryClient };