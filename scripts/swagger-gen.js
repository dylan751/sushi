/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const { generateApi } = require('swagger-typescript-api')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function fixTypesWorkaround() {
  // removes HeadersDefaults which doesn't exist in the version of axios we use
  const occurances = [', HeadersDefaults', ' as keyof HeadersDefaults']
  let content = fs.readFileSync(path.resolve(process.cwd(), './__generated__/AccountifyAPI.ts'), 'utf8')
  occurances.forEach(occurance => {
    content = content.replace(occurance, '')
  })
  fs.writeFileSync(path.resolve(process.cwd(), './__generated__/AccountifyAPI.ts'), content)
}

// ChatGPT generated code, convert camelCase case to snake_case
// and keeps snake_case as is
const CamelAndSnakeCaseToSnakeCase = str => str.replace(/((?<=[a-z0-9])[A-Z]|(?!^)[A-Z](?=[a-z]))/g, '_$1')

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: 'AccountifyAPI.ts',

  // set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), './__generated__'),
  url: 'http://localhost:4000/api/docs/v1-json',

  // input: path.resolve(process.cwd(), "./v1-json.json"),
  httpClientType: 'axios',
  extractEnums: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  codeGenConstructs: _ => ({
    EnumField: (key, value) => `${CamelAndSnakeCaseToSnakeCase(key).toUpperCase()} = ${value}`

    /**
     * $A0.key = $A0.value,
     * $A1.key = $A1.value,
     * $AN.key = $AN.value,
     */
  }),
  prettier: {
    // By default prettier config is load from your project
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'all',
    parser: 'typescript'
  }
})
  .then(fixTypesWorkaround)
  // eslint-disable-next-line no-console
  .catch(e => console.error(e))
