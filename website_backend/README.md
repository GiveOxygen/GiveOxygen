# giveoxygen

## Features

1. Identify hospitals - get hospital admins to signup/login
1. Identify hospital needs
1. Identify ventilator quantities and locations
1. Coordinate filling needs
1. Coordinate generating these "Backup Ventilators" if the numbers spike as they're projected to do in 2 weeks

## Reference

- https://www.nytimes.com/2020/03/22/opinion/health/ventilator-shortage-coronavirus-solution.html
- https://www.fda.gov/media/136318/download
- https://youtu.be/0386hOgcQTA
- https://www.3dnatives.com/en/3d-printed-respirator-230320205/
- https://www.cnn.com/2020/03/26/tech/dyson-ventilators-coronavirus/index.html?utm_medium=social&utm_source=fbCNN&utm_content=2020-03-26T18%3A16%3A06&utm_term=link&fbclid=IwAR16KlEndwHknso2-JGW5gzi0l4onSiSQpm7Pd4qP9U0aNKTwz8MgYpA2ZQ&fbclid=IwAR3IiqpQsQXvOixXDKe0KS-Tz_WT50mhDaNC3nZMlMWci9aVc8NjR9CGEsI

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

- Manual add `custom:role` and `custom:details` (2048) in the schema

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