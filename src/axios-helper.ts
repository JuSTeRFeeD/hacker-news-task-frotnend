import axios from 'axios'

interface AxiosParams {
  baseUrl: string
  headers: any
}

const config: AxiosParams = {
  baseUrl: 'https://localhost:5001',
  headers: {
    'Content-type': 'application/json'
  }
}

interface Result<T> {
  ok: boolean
  status: number
  data: T
}

export const getAPI = async <T>(url: string, params?: any): Promise<Result<T>> => {
    return await axios({
      ...config,
      method: 'get',
      url: `${config.baseUrl}/${url}`,
      params: {
        ...params
      }
    }).then((res) => {
      return {
        ok: res.status === 200,
        status: res.status,
        data: res.data as T
      }
    }).catch((e) => {
      console.log('ASDASDASD', e)
      window.location.href = '/error'
      return {
        ok: e.response.status === 200,
        status: e.response.status,
        data: null as T
      }
    })
}
