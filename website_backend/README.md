# Give Oxygen App

[Live](http://app.giveoxygen.com/)

## Amplify

https://github.com/dabit3/aws-amplify-workshop-react

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Environment

```bash
# Add new env
amplify env add
# Switch env
amplify env checkout <ENV>
# Delete env
amplify env remove <ENV>
```

### Cognito


### GraphQL

```bash
# support @auto
# https://github.com/hirochachacha/graphql-auto-transformer#4-export-node_path
export NODE_PATH=./node_modules

# compile
amplify api gql-compile
```

### Deploy

```bash
# support @auto
# https://github.com/hirochachacha/graphql-auto-transformer#4-export-node_path
export NODE_PATH=./node_modules

amplify push -y
```

### Manual Update

- Manual add `custom:role` and `custom:details` (2048) in the schema

- Manual change entry for postCofirmation Lambda to `add-to-group.index`
- Manual add permission `SecretManagerReadWrite` to postCofirmation lambda