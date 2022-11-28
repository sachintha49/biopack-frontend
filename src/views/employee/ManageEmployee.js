import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { saveEmployee } from 'src/core/config/employeeConfig'

const ManageEmployee = () => {
  const [validated, setValidated] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')

  const [employeeNumber, setEmployeeNumber] = useState('')
  const [epfNumber, setEpfNumber] = useState('')
  const [nic, setNic] = useState('')

  const [employeeType, setEmployeeType] = useState('')
  const [department, setDepartment] = useState('')
  const [contactNo, setContactNo] = useState([])

  const [address, setAddress] = useState([])
  const [eligibleOT, setEligibleOT] = useState('')
  const [eligibleTransport, setEligibleTransport] = useState('')
  const [eligibleProductiveIncentive, setEligibleProductiveIncentive] = useState('')

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    const employeeType1 = {
      name: 'HR Employee',
      description: 'descritption',
    }

    const branch1 = {
      name: 'Kandy Branch',
      description: '',
    }

    const department1 = {
      name: 'HR',
      description: 'HR Department',
      branch: branch1,
    }

    const empDetail = {
      firstName: firstName,
      lastName: middleName,
      middleName: lastName,
      employeeNumber: employeeNumber,
      epfNumber: epfNumber,
      nic: nic,
      employeeType: employeeType1,
      department: department1,
      addresses: [],
      contacts: [],
      hasOt: false,
      hasTransport: true,
      hasProductIncentive: false,
    }

    saveEmployee(empDetail).subscribe({
      next: (response) => {
        alert('okay')
      },
      error: (error) => {
        alert('error eka awa')
        console.log(error)
      },
    })
    // const headers = {
    //   'Access-Control-Allow-Origin': '*',
    // }
    // console.log(JSON.stringify(empDetail))
    // axios
    //   .post('http://localhost:8080/employees', empDetail, {
    //     headers: headers,
    //   })
    //   .then((response) => {
    //     alert('okay')
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     alert('error eka awa')
    //     console.log(error)
    //   })

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
        <CFormLabel>First Name</CFormLabel>
        <CFormInput
          type="text"
          id="firstName"
          size="sm"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormLabel>Middle Name</CFormLabel>
        <CFormInput
          type="text"
          id="middleName"
          size="sm"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormLabel>Last Name</CFormLabel>
        <CFormInput
          type="text"
          id="lastName"
          size="sm"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </CCol>
      {/* ********** */}
      <CCol md={4}>
        <CFormLabel>Employee Number</CFormLabel>
        <CFormInput
          type="text"
          id="employeeNumber"
          size="sm"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormLabel>EPF Number</CFormLabel>
        <CFormInput
          type="text"
          id="epfNumber"
          size="sm"
          value={epfNumber}
          onChange={(e) => setEpfNumber(e.target.value)}
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormLabel>NIC Number</CFormLabel>
        <CFormInput
          type="text"
          id="nic"
          size="sm"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          required
        />
      </CCol>
      {/* eeee */}
      <CCol md={4}>
        <CFormLabel>Employee Type</CFormLabel>
        <CFormSelect
          size="sm"
          aria-label="Default select example"
          value={employeeType}
          onChange={(e) => setEmployeeType(e.target.value)}
        >
          <option>Select a Department</option>
          <option value="1">Full Time</option>
          <option value="2">Contract</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Select Department</CFormLabel>
        <CFormSelect
          size="sm"
          aria-label="Default select example"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>Select a Department</option>
          <option value="1">HR Department</option>
          <option value="2">Packing Department</option>
          <option value="3" disabled>
            Finance Department
          </option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Contact Number</CFormLabel>
        <CFormInput
          type="text"
          id="nic"
          size="sm"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormTextarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="personalAddress"
          label="Personal Address"
          rows="1"
          /* text="Must be 8-20 words long." */
        ></CFormTextarea>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Eligible OverTime</CFormLabel>
        <CFormSelect
          size="sm"
          aria-label="Default select example"
          value={eligibleOT}
          onChange={(e) => setEligibleOT(e.target.value)}
        >
          <option>Select YES or NO</option>
          <option value="1">YES</option>
          <option value="2">NO</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Eligible Transport</CFormLabel>
        <CFormSelect
          size="sm"
          value={eligibleTransport}
          onChange={(e) => setEligibleTransport(e.target.value)}
        >
          <option>Select YES or NO</option>
          <option value="1">YES</option>
          <option value="2">NO</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormLabel>Eligible Productive Incentive</CFormLabel>
        <CFormSelect
          size="sm"
          value={eligibleProductiveIncentive}
          onChange={(e) => setEligibleProductiveIncentive(e.target.value)}
        >
          <option>Select YES of NO</option>
          <option value="1">YES</option>
          <option value="2">NO</option>
        </CFormSelect>
      </CCol>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={10}/>
      <CCol xs={2}>
        <CButton color="primary" type="submit">
          Add Employee
        </CButton>
      </CCol>
    </CForm>
  )
}

const Validation = () => {
  return (
    <CCard>
      {/* <CRow>
        <CCol xs={6}>
          <CCardHeader>Employee</CCardHeader>
        </CCol>
        <CCol xs={6}>
          <CButton color="primary">Add Employee</CButton>
        </CCol>
      </CRow> */}
      <CCardHeader>
        <strong>Add Employee</strong>
      </CCardHeader>
      <CCardBody>{ManageEmployee()}</CCardBody>
    </CCard>
  )
}

export default Validation
