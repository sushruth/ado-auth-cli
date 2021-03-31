# ADO Authenticator

[![npm version](https://badge.fury.io/js/ado-auth.svg)](https://badge.fury.io/js/ado-auth)

This package `ado-auth` aims to help in authenticating with Azure DevOps npm feeds. This supports `npm`, `yarn`, `pnpm` and `yarn2`.

This tool asks the user to authorize themselves with ADO and once accepted, creates two files, `.npmrc` and `.yarnrc.yml` to their respective specifications with the user's auth token.

## How to use?

```sh
npx --registry https://registry.npmjs.org/ ado-auth
```

## Options

### `-d`, `--debug`

This option enables some logging in the CLI to help identify any issues.

