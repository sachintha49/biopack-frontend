/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react'
import { saveAttendance } from 'src/core/config/employeeConfig'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const Attendance = () => {
  const [validated, setValidated] = useState(false)
  const [employeeID, setEmployeeID] = useState('')
  const [totalTime, setTotalTime] = useState(0)
  const [inTime, setInTime] = useState('')
  const [outTime, setOutTime] = useState('')
  const [inDate, setInDate] = useState(new Date())
  const [outDate, setOutDate] = useState(new Date())

  //setTotalTime(console.log(inTime, 'inTime'))

  const handleSubmit = (event) => {
    console.log(moment(inTime).format('HH:mm'), 'date')

    const attendanceDetail = {
      employee_id: employeeID,
      inDate: moment(inDate).format('yyyy-MM-DD'),
      in_time: moment(inTime).format('HH:mm'),
      outDate: moment(outDate).format('yyyy-MM-DD'),
      out_time: moment(outTime).format('HH:mm'),
      total_ot: totalTime,
    }

    console.log(attendanceDetail, 'attendanceDetail')

    saveAttendance(attendanceDetail).subscribe({
      next: (response) => {
        alert('okay')
      },
      error: (error) => {
        alert('error eka awa')
        console.log(attendanceDetail, 'attendanceDetail')
        console.log(error)
      },
    })
    event.preventDefault()
    setValidated(true)
  }

  const calculateInTime = (intime) => {
    setInTime(intime)
    if (outTime === '') {
      setTotalTime(0)
    }
  }

  const calculateOutTime = (outtime) => {
    if (inTime === '') {
      alert('Please select In time')
    } else {
      setOutTime(outtime)
      let calcInTime = moment(inTime).format('HH:mm')
      let calcOutTime = moment(outtime).format('HH:mm')
      calcOutTime = calcOutTime.replace(':','.')
      calcInTime = calcInTime.replace(':','.')
      let calcTotalTime = parseFloat(parseFloat(calcOutTime) - parseFloat(calcInTime)).toFixed(2);
      setTotalTime(calcTotalTime)
    }
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={4}>
        <CFormLabel>Employee</CFormLabel>
        <CFormSelect
          size="sm"
          aria-label="Default select example"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
        >
          <option>Select Employee</option>
          <option value="1">1 - Saman</option>
          <option value="2">2 - Gune</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormLabel>In Date</CFormLabel>
        <div>
          <ReactDatePicker
            showTimeSelect
            selected={inDate}
            onChange={(date) => setInDate(date)}
            maxDate={inDate}
          />
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel>In Time</CFormLabel>
        <div>
          <ReactDatePicker
            selected={inTime}
            onChange={(inTime) => calculateInTime(inTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Out Date</CFormLabel>
        <div>
          <ReactDatePicker
            showTimeSelect
            selected={outDate}
            onChange={(date) => setOutDate(date)}
            calculateOutTime
            maxDate={outDate}
          />
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Out Time</CFormLabel>
        <div className="col-md-4">
          <ReactDatePicker
            selected={outTime}
            onChange={(outTime) => calculateOutTime(outTime)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Total Time</CFormLabel>
        <CFormInput type="text" id="totTime" disabled size="sm" value={totalTime} />
      </CCol>
      <CCol xs={10} />
      <CCol xs={2}>
        <CButton color="primary" type="submit">
          Add Attendance
        </CButton>
      </CCol>
    </CForm>
  )
}

const Validation = () => {
  return (
    <CCard>
      <CCardHeader>
        <strong>Add Attendance</strong>
      </CCardHeader>
      <CCardBody>{Attendance()}</CCardBody>
    </CCard>
  )
}

export default Validation
