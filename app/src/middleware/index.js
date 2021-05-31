import { toast } from 'react-toastify'
import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const message = action.event.returnValues[1]
    toast.success(message, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}

const appMiddlewares = [ contractEventNotifier ]

const store = generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false,
})

export default store