import {createContext} from 'react'
import {Session} from 'next-auth'

type IUserSessionContext = {session: Session, updateSession: (session: Session) => void}
const ctx = createContext<IUserSessionContext>({session: null, updateSession: null})

export default ctx
