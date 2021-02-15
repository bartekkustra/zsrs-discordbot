# ZSRS Discord Bot - used purely on our Discord

## Installation

1. Once you clone this repo create `.env` file and add `DISCORD_TOKEN=` provided by the server admin.
2. Make sure you have Python installed and up to date
3. Run the following commands to install necessary libraries:

```shell
# To install the library without full voice support, you can just run the following command:

# Linux/macOS
python3 -m pip install -U discord.py

# Windows
py -3 -m pip install -U discord.py


# Otherwise to get voice support you should run the following command:

# Linux/macOS
python3 -m pip install -U "discord.py[voice]"

# Windows
py -3 -m pip install -U discord.py[voice]
```
