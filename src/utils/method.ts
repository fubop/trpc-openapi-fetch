import { OpenApiMethod } from '../types';

export const acceptsRequestBody = (method: OpenApiMethod) => {
  if (method === 'GET' || method === 'DELETE') {
    return false;
  }
  return true;
};


export function displayUserInput() {
    var userInput = document.getElementById('userInput').value;
    document.getElementById('output').innerHTML = userInput;
}
