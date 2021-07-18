import { ADD1, DESC1 } from '../action-types.js';

export function add1(payload = 1) {
  return { type: ADD1, payload }
}
export function desc1(payload = 1) {
  return { type: DESC1, payload }
}