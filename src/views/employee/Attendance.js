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
  const [totalTime, setTotalTime] = useState('')
  const [inTime, setInTime] = useState('')
  const [outTime, setOutTime] = useState('')
  const [date, setDate] = useState(new Date())

  //setTotalTime(console.log(inTime, 'inTime'))

  const handleSubmit = (event) => {
    console.log(moment(date).format('yyyy-MM-DD'), "date")
    const attendanceDetail = {
      employee_id: employeeID,
      month: moment(date).format('yyyy-MM-DD'),
      in_time: moment(inTime).format('HH:MM:SS'),
      out_time: moment(outTime).format('HH:MM:SS'),
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
        <CFormLabel>Date</CFormLabel>
        <div>
          <ReactDatePicker selected={date} onChange={(date) => setDate(date)} maxDate={date} />
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel>In Time</CFormLabel>
        <div>
          <ReactDatePicker
            selected={inTime}
            onChange={setInTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Out Time</CFormLabel>
        <div className="col-md-4">
          <ReactDatePicker
            selected={outTime}
            onChange={setOutTime}
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
