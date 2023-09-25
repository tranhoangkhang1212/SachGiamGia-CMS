import { ETokenStateActionType, IAction, ITokenType } from '@/constants/StateManagement';

const initialState: ITokenType = {
    data: new Map(),
};

const tokenReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ETokenStateActionType.UPDATE_TOKEN:
            initialState.data.set(action.payload.tokenType, action.payload.token);
            return {
                data: initialState.data,
            };
        case ETokenStateActionType.REMOVE_TOKEN: {
            initialState.data.delete(action.payload.tokenType);
            return initialState.data;
        }
        default:
            return state;
    }
};

export default tokenReducer;
