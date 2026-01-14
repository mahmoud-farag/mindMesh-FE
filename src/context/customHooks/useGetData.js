import React, { useCallback, useEffect, useState } from 'react'
import toastService from '../../utils/toasterUtils';

export default function useGetData({ selectedField, initialState = null, serviceFunc, payload = null, showSuccessToast = true }) {

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);


  if (!serviceFunc) {
    throw new Error('Service function is missing.');
  }

  if (!selectedField) {
    throw new Error('selectedField is missing.');
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = payload
        ? await serviceFunc(payload)
        : await serviceFunc();

      if (response?.success) {

        if (response?.data) {
          const dataField = response.data[selectedField];

          if (!dataField) {
            throw new Error('The selected field was not found in the response data.');
          }
          setData(() => dataField);
        }

        if (showSuccessToast) {
          toastService.success(
            response?.message ?? 'Data imported successfully.'
          );
        }
      } else {
        toastService.error('Received an empty response.');
      }
    } catch (error) {
      toastService.error(error?.message ?? 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [serviceFunc, payload, showSuccessToast]);

  useEffect(() => {

    fetchData();

  }, [fetchData]);

  return { data, loading, refetchData: fetchData, setData };
}

