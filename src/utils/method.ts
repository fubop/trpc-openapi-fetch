import { OpenApiMethod } from '../types';

export const acceptsRequestBody = (method: OpenApiMethod) => {
  if (method === 'GET' || method === 'DELETE') {
    return false;
  }
  return true;
};


export function displayUserInput() {
    var userInput = (document.getElementById('userInput') as HTMLInputElement).value;
    var outputElement = document.getElementById('output');
    if (outputElement) {
        outputElement.textContent = userInput;
    }
}
