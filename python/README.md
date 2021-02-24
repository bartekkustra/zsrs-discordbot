# ZSRS Discord Bot - used purely on our Discord

## Installation

1. Once you clone this repo create `.env` file and add `DISCORD_TOKEN=` provided by the server admin.
2. Make sure you have Python 3 installed (min. 3.8) and present in your system $PATH.
3. Run the following commands to install necessary libraries (note: running in dedicated pyenv is recommended):

```shell
# To install all required dependencies, you can just run the following command:

python -m pip -r requirements.txt

# Otherwise, if you want to get voice support, you should run the following command:

python -m pip install -U "discord.py[voice]"
```
