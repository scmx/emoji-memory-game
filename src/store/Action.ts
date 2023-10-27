type FlipAction = { type: "FLIP"; payload: number };
type ResetAction = { type: "RESET" };

export type Action = FlipAction | ResetAction;
