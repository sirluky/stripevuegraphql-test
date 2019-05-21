# vue-graphql-basic-preset

// edited nodemodules/eslint loader/index.js no-console error -> false
<ApolloQuery :query="gql => gql`
      query   {
        hello
      }
    `">
<template v-slot="{ result: { loading, error, data } }">

<div v-if="data">{{ data.hello}}</div>
</template>
</ApolloQuery>

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
