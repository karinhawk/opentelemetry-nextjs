import client from './db'

export const db = client.db('nts-db')
export const shows = db.collection('shows')
