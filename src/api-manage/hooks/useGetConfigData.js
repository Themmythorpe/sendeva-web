import { useQuery } from "react-query";
import MainApi from "api-manage/MainApi";
import { onSingleErrorResponse } from "api-manage/api-error-response/ErrorResponses";
import { config_api } from "api-manage/ApiRoutes";

export const getData = async () => {
  try {
    const { data } = await MainApi.get(config_api);
    return data;
  } catch (error) {
    console.error('Error fetching config data:', error);
    throw error;
  }
};

export const useGetConfigData = (handleSuccess) => {
  return useQuery("getConfig", getData, {
    enabled: false,
    onError: onSingleErrorResponse,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    cacheTime: 400,
    staleTime: 300,
    onSuccess: handleSuccess,
  });
};
