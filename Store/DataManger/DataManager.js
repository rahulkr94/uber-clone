import { useState } from 'react';
export const useDataManager = (initialValue = null) => {
    const [data, setData] = useState(initialValue);
    return [data, setData];
}