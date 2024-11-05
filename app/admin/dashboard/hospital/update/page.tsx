"use client"

import React, {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const page = () => {
  const searchParams = useSearchParams();
  const [hospitalData, setHospitalData] = useState<[]>()
  
  useEffect(() => {
    const hospitalInfo = searchParams.get('hospital');
    if (hospitalInfo) {
      const parsedData = JSON.parse(decodeURIComponent(hospitalInfo));
      setHospitalData(parsedData);
    }
  }, [searchParams]);

  return (
    <div>
      update
    </div>
  )
}

export default page