import { ETokenStateActionType, ETokenType, IAction } from '@/constants/StateManagement';

export const addToken = (type: ETokenType, token: string): IAction => {
    return {
        type: ETokenStateActionType.UPDATE_TOKEN,
        payload: {
            tokenType: type,
            token: token,
        },
    };
};

export const removeToken = (type: ETokenType) => {
    return {
        type: ETokenStateActionType.REMOVE_TOKEN,
        payload: {
            tokenType: type,
        },
    };
};
