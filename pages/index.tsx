import Head from 'next/head'
import Link from 'next/link'
import {Button} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'

import {IStore} from '../redux/'


const Home = () => {
  const val = useSelector((state: IStore) => state.val),
    dispatch = useDispatch();

  return(
    <div>
      <span onClick={() => dispatch({type: 'DEC'})}>-</span>
      <span>{val}</span>
      <span onClick={() => dispatch({type: 'INC'})}>+</span>
      <br/>

      <Button variant="contained" color="primary">
        <Link href="/test">Test</Link>
      </Button>
    </div>
  )
}

export default Home;
