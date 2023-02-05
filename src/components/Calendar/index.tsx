import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState } from 'react'
import { getWeekDays } from '../../utils/getWeekDays'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviusMonth() {
    const previusMonthData = currentDate.subtract(1, 'month')
    setCurrentDate(previusMonthData)
  }
  function handleNextMonth() {
    const nextMonthData = currentDate.add(1, 'month')
    setCurrentDate(nextMonthData)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviusMonth} title="Previus month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <CalendarDay>1</CalendarDay>
          </td>
          <td>
            <CalendarDay disabled>2</CalendarDay>
          </td>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
