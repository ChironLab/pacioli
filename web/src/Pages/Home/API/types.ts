export type Entry = {
  id: string
  amount: number
  accountId: number
  journalId: string
}

export type Journal = {
  id: string
  type: string
  createdAt: Date
  postedOn: Date
  entries: Entry[]
}

export type Transaction = {
  id: string
  name: string
  meta: string
  type: string
  journal: Journal
}

export type Transactor = {
  id: string
  name: string
  type: string
  meta: string
  transactions: Transaction[]
}

export type Account = {
  id: number
  name: number
  entries: Entry[]
  type: string
  active: boolean
  entryIds: string[]
  value: number
}
