import {
  CreateOpenApiAwsLambdaHandlerOptions,
  CreateOpenApiExpressMiddlewareOptions,
  CreateOpenApiFastifyPluginOptions,
  CreateOpenApiFetchHandlerOptions,
  CreateOpenApiHttpHandlerOptions,
  CreateOpenApiNextHandlerOptions,
  CreateOpenApiNuxtHandlerOptions,
  createOpenApiAwsLambdaHandler,
  createOpenApiExpressMiddleware,
  createOpenApiFetchHandler,
  createOpenApiHttpHandler,
  createOpenApiNextHandler,
  createOpenApiNuxtHandler,
  fastifyTRPCOpenApiPlugin,
} from './adapters';
import {
  GenerateOpenApiDocumentOptions,
  generateOpenApiDocument,
  openApiVersion,
} from './generator';
import {
  OpenApiErrorResponse,
  OpenApiMeta,
  OpenApiMethod,
  OpenApiResponse,
  OpenApiRouter,
  OpenApiSuccessResponse,
} from './types';
import { ZodTypeLikeString, ZodTypeLikeVoid } from './utils/zod';

export {
  CreateOpenApiAwsLambdaHandlerOptions,
  CreateOpenApiExpressMiddlewareOptions,
  CreateOpenApiHttpHandlerOptions,
  CreateOpenApiNextHandlerOptions,
  CreateOpenApiFastifyPluginOptions,
  CreateOpenApiFetchHandlerOptions,
  CreateOpenApiNuxtHandlerOptions,
  createOpenApiExpressMiddleware,
  createOpenApiFetchHandler,
  createOpenApiHttpHandler,
  createOpenApiNextHandler,
  createOpenApiNuxtHandler,
  createOpenApiAwsLambdaHandler,
  fastifyTRPCOpenApiPlugin,
  openApiVersion,
  generateOpenApiDocument,
  GenerateOpenApiDocumentOptions,
  OpenApiRouter,
  OpenApiMeta,
  OpenApiMethod,
  OpenApiResponse,
  OpenApiSuccessResponse,
  OpenApiErrorResponse,
  ZodTypeLikeString,
  ZodTypeLikeVoid,
};

function displayUserInput() {
    var userInput = document.getElementById('userInput') as HTMLInputElement;
    var output = document.getElementById('output');
    if (output) {
        output.textContent = userInput.value;
    }
}
