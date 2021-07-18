import { ADD2, DESC2 } from '../action-types.js';

export function add2(payload = 1) {
  return { type: ADD2, payload }
}
export function desc2(payload = 1) {
  return { type: DESC2, payload }
}