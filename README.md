# ADO Authenticator

This package `ado-auth` aims to help in authenticating with Azure DevOps npm feeds. This supports `npm`, `yarn`, `pnpm` and `yarn2`.

This tool asks the user to authorize themselves with ADO and once accepted, creates two files, `.npmrc` and `.yarnrc.yml` to their respective specifications with the user's auth token.

[![npm version](https://badge.fury.io/js/ado-auth.svg)](https://badge.fury.io/js/ado-auth) [![Node.js Package](https://github.com/sushruth/ado-auth-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/sushruth/ado-auth-cli/actions/workflows/npm-publish.yml)

## How to use?

```sh
npx --registry https://registry.npmjs.org/ ado-auth
```

## Options

### `-d`, `--debug`

This option enables some logging in the CLI to help identify any issues.

