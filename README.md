# ZSRS Discord Bot - used purely on our Discord

## Installation

1. Once you clone this repo create `.env` file and add `DISCORD_TOKEN=` provided by the server admin.
2. Make sure you have Node.js installed (min. 14.0) and present in your system $PATH.
3. Open folder in your terminal window or IDE and run the following commands to install necessary libraries (note: running in dedicated pyenv is recommended):

```shell
npm install
```

4. Always make sure to push features to new branch with `git checkout -b branch-name`
5. To run local development server use `npm run start:dev` (please note that it'll keep the main bot running!)
6. Always create Pull Requests and make sure to get a code review from somebody
7. It's recommended to use IDE that has ESLint enabled. You can do `npm run lint` to check for errors and warnings. This command will also try to fix your code issues.