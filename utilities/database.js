import Database from '../state/db'

const instance = new Database()
Object.freeze(instance)

export default instance
