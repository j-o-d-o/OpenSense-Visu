import { EReduxActionTypes } from "../action_types"


export interface ISensorData {
  idx: number;
  ts: number;
  width: number;
  height: number;
  channels: number;
  imageBase64: string;
}

export default function(state: ISensorData[] = [], action: any) {
  switch (action.type) {
    case EReduxActionTypes.UPDATE_SENSOR_DATA:
      // action.data: ISensorData
      let found = false;
      for (let i = 0; i < state.length; ++i) {
        if (action.data.idx == state[i].idx) {
          state[i] = action.data;
          found = true;
          break;
        }
      }
      if (!found) {
        state.push(action.data);
      }
      return state;
    case EReduxActionTypes.RESET_SENSOR_STORAGE:
      return [];
    default:
      return state;
  }
}
