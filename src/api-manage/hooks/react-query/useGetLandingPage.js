import MainApi from "../../MainApi";
import {landing_page_api} from "../../ApiRoutes";
import {useQuery} from "react-query";
import { onSingleErrorResponse } from "api-manage/api-error-response/ErrorResponses";

const getData = async () => {
    try {
        const { data } = await MainApi.get(landing_page_api);
        return data;
    } catch (error) {
        console.error('Error fetching landing page data:', error);
        throw error;
    }
};

export default function useGetLandingPage() {
    return useQuery("landing-page-data", getData, {
        enabled: false,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        onError: onSingleErrorResponse,
        cacheTime: 400,
        staleTime: 300,
    });
}