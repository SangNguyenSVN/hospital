import Schedule from '@/app/src/components/screen/home/schedule/Schedule'
import GridView from '@/app/src/components/shared/GridView/GridView'
import Slider from '@/app/src/components/shared/Slider/Slider'
import React from 'react'
const page = () => {
  return (
    <div>
      <Slider dot={true}/>
      <Schedule/>
      <GridView/>
    </div>
  )
}

export default page