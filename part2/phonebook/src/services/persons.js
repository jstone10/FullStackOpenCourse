import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log('get all persons')
    const request = axios.get(baseUrl)
    return request.then(response => {
        console.log("success!", response)
        return response.data
    })
}

const create = newObj => {
    console.log('posting', newObj)
    const request = axios.post(baseUrl, newObj)
    return request.then(response => {
        console.log('success!', response)
        return response.data
    })
}

const remove = id => {
    console.log(`deleting person with id ${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log('delete success!', response)
        return response.data
    })
}

const update = (id, newObj) => {
    console.log(`updating person ${id}`)
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => {
        console.log('put success!', response)
        return response.data
    })
}

export default {getAll, create, remove, update}