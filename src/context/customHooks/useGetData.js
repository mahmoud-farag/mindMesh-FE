import React, { useCallback, useEffect, useState } from 'react'
import toastService from '../../utils/toasterUtils';

export default function useGetData({ selectedField, initialState = null, serviceFunc, payload = null, showSuccessToast = true }) {

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);


  if (!serviceFunc) {
    throw new Error('Service function is messed');
  }

  if (!selectedField) {
    throw new Error('selectedField is messed');
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
            throw new Error('selectedField is not found in response data');
          }
          setData(() => dataField);
        }

        if (showSuccessToast) {
          toastService.success(
            response?.message ?? 'data Successfully imported'
          );
        }
      } else {
        toastService.error('empty response');
      }
    } catch (error) {
      toastService.error(error?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [serviceFunc, payload, showSuccessToast]);

  useEffect(() => {

    fetchData();

  }, [fetchData]);

  return { data, loading, refetchData: fetchData, setData };
}

