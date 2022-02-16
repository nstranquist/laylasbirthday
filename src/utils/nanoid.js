import { customAlphabet } from 'nanoid'

const ID_LENGTH = 4

export const nanoid = customAlphabet('1234567890abcdef', ID_LENGTH)