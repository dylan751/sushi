# Script Guide

## swagger-gen.js

We use `swagger-typescript-api` to generate APIs, types and enums from a local live instance of `ramen`.
This let's us be free of maintaing types in the frontend. We also needn't do the repetitive task of writing API calls. With this, the API call is generated and only needs to be invoked with the right parameters.

- Make your changes and have a running instance of `ramen`
- The name of the functions is decided by the `operationId` of the `ApiOperation` decorator.

```ts
@ApiOperation({
  operationId: "Get role list for organization", // getRoleListForOrganization
})

@ApiOperation({
  operationId: "getxyzzzz", // getxyzzzz
})
```

- To generate, run

```sh
yarn api-gen
```

- Use the below and fill in your function name and params to make the API call.

```ts
const { $api } = useApi()
const resp = $api.internal.yourFunctionName()
```

### Misc

- Files get generated to `__generated__/AccountifyAPI.ts`
- To quickly find what your function got named, you can also search by the return type of the function from vulcan.
- Configuration for the plugin resides in the script file itself `scripts/swagger-gen.js` right under the call `generateApi`.
