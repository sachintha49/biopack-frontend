import post from '../AppUtil'
import API from '../../env.js'
import { from } from 'rxjs'

const headers = {
  'Access-Control-Allow-Origin': '*',
}

export function saveEmployee(empDetails) {
  return from(post(`${API.defaultPath}/employees`, empDetails, { headers: headers }))
}

export function saveAttendance(ettendanceDetails) {
  return from(post(`${API.defaultPath}/attendance`, ettendanceDetails, { headers: headers }))
}
