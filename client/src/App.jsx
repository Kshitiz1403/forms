import { useDispatch, useSelector } from 'react-redux'
import AppRoutes from './Pages/Routes'
import { Alert, Snackbar } from '@mui/material'
import { TOGGLE_SNACKBAR_CLOSE } from './store/reducers/snackbarSlice'

function App() {

  const dispatch = useDispatch()
  const snackbarState = useSelector(state => state.snackbar)

  return (
    <>
      <Snackbar open={snackbarState.isShown} autoHideDuration={snackbarState.autoHideDuration} onClose={() => dispatch(TOGGLE_SNACKBAR_CLOSE())}>
        <Alert severity={snackbarState.severity} onClose={() => dispatch(TOGGLE_SNACKBAR_CLOSE())} variant='filled'>
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <AppRoutes />
    </>
  )
}

export default App
