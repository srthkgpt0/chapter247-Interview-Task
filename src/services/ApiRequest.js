import axios from 'axios'
// import modalNotification from '../utilities/notifications'
import {
  getSessionStorageToken,
  removeSessionStorageToken
} from '../utilities/common'
import config from '../components/config'

// import momentTimezone from 'moment-timezone'

const APIrequest = async ({
  method,
  url,
  queryParams,
  bodyData,
  formHeaders,
  editData
}) => {
  const apiToken = getSessionStorageToken()

  try {
    const axiosConfig = {
      method: method || 'GET',
      baseURL: config.API_BASE_URL,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        // timezone: momentTimezone.tz.guess(true)
      }
    }

    if (formHeaders) {
      axiosConfig.headers = Object.assign({}, axiosConfig.headers, formHeaders)
    }

    if (url) {
      axiosConfig.url = url
    }
    if (editData) {
      axiosConfig.data = editData
    }
    if (queryParams) {
      const queryParamsPayload = {}
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key]
          if (typeof element === 'string') {
            element = element.trim()
          }
          if (!['', null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element
          }
        }
      }
      axiosConfig.params = queryParamsPayload
    }

    if (bodyData) {
      const bodyPayload = {}
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key]
          if (typeof element === 'string') {
            element = element.trim()
          }
          if (!['', null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element
          }
        }
      }
      axiosConfig.data = bodyPayload
    }

    if (apiToken) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `Bearer ${apiToken}`
      }
    }

    const res = await axios(axiosConfig)
    return res.data
  } catch (error) {
    const errorRes = error.response

    if (
      'error' in errorRes.data &&
      Object.keys(errorRes.data.error).length &&
      [400, 401].includes(errorRes.data.error.status)
    ) {
      removeSessionStorageToken()
    }
    throw new Error(errorRes.data.message)
  }
}

export default APIrequest
