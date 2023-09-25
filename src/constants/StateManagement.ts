export enum ETokenStateActionType {}

export enum ETokenType {}

export interface ITokenType {
    data: Map<ETokenType, string>;
}

interface IPayloadType {
    tokenType: ETokenType;
    token: string;
}

export interface IAction {
    type: ETokenStateActionType;
    payload: IPayloadType;
}

export interface IGlobalStateType {
    tokens: ITokenType;
}
