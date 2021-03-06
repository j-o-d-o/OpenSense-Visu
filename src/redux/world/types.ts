import { Vector3, Vector2 } from 'babylonjs'


export enum ECLass {
  CAR = 0,
  TRUCK,
  MOTORBIKE,
  BICYCLE,
  PED,
  UNKOWN,
  SIZE,
}

export interface ITrack {
  trackId: string;
  class: ECLass;
  position: Vector3; // [m] center bottom point
  rotation: Vector3; // [rad]
  height: number; // [m]
  width: number; // [m]
  depth: number; // [m] can be 0, then it is just a 2D plane in a 3D world
  ttc: number; // [s]
}

export interface IOpticalFlow {
  endTs: number; // in [us]
  deltaTime: number; // in [ms]
  flowTracks: {start: Vector2, end: Vector2}[];
}

export interface IObject2D {
  cx: number;
  cy: number;
}

export interface ICamSensor {
  idx: number;
  key: string;
  position: Vector3; // [m]
  rotation: Vector3; // pitch, yaw, roll in [rad]
  fovHorizontal: number; // [rad]
  fovVertical: number; // [rad]
  imageData: ImageData;
  timestamp: number; // timestamp of the image [us]
  focalLength: Vector2; // (x, y) in pixel
  principalPoint: Vector2; // (x, y) in pixel

  opticalFlow: IOpticalFlow;
  semsegImg: ImageData;
  depthImg: ImageData;
  objects2D: IObject2D[];
}

export interface IReduxWorld {
  camSensors: ICamSensor[];
  timestamp: number; // timestamp of the algo [us]
  frameCount: number; // current number of the frame
  frameStart: number; // timestamp of the start of the frame [us] (including pause time during recordings)
  plannedFrameLength: number; // planned length of frame in [ms]

  tracks: ITrack[];
  obstacles: Vector3[]; // Points in the 3D world in [m]
  laneMarkings: Vector3[]; // Points in the 3D world in [m]
}
