'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { Car } from '@/payload-types'

const CarPriceLabel: React.FC = () => {
  // return <p>Hello bbbbbbbbbbbbbbb</p>
  const carID = useFormFields(([fields]) => fields?.car?.value)
  const [car, setCar] = React.useState<Car>()

  React.useEffect(() => {
    if (car?.id !== carID) {
      const fetchCar = async () => {
        try {
          const carResult: Car = await fetch(`/api/cars/${carID}?depth=0`).then((res) => res.json())

          if (carResult) {
            setCar(carResult)
          }
        } catch (e) {
          console.error(e)
        }
      }
      fetchCar()
    }
  }, [car, carID])

  if (carID && typeof car === 'undefined') {
    return <span>Loading...</span>
  }

  if (!carID || !car) {
    return <span>No car selected</span>
  }

  return <span>{car.title}</span>
}

export default CarPriceLabel
