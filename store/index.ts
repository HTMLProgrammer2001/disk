import {MakeStore, createWrapper, HYDRATE, Context} from 'next-redux-wrapper'
import {AnyAction, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'



export interface IStore{
	val: number
}

const initialState: IStore = {val: 0};

const reducer = (state: IStore = initialState, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return {...state, ...action.payload};

		case 'INC':
			return {...state, val: state.val + 1};

		case 'DEC':
			return {...state, val: state.val - 1};

		default:
			return state;
	}
}

//@ts-ignore
const makeStore: MakeStore<IStore> = (context: Context) => createStore(reducer, composeWithDevTools())

export default createWrapper<IStore>(makeStore, {debug: true});
