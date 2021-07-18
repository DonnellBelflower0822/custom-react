import { actionType } from './actions-type';

export function add(payload = 1) {
  return {
    type: actionType.ADD,
    payload
  }
}

export function desc(payload = 1) {
  return {
    type: actionType.DESC,
    payload
  }
}