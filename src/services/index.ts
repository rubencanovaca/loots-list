import axios from 'axios'
import { Loot } from '../models'

const httpClient = axios.create({
  baseURL: 'http://localhost:3030'
})

export async function fetchLoots(start: number, limit: number): Promise<Array<Loot>> {
  const response = await httpClient.get<Array<Loot>>(`/loots?_start=${start}&_limit=${limit}`)
  return response.data
}

export async function fetchLootById(id: string): Promise<Loot> {
  const response = await httpClient.get<Loot>(`/loots/${id}`)
  return response.data
}