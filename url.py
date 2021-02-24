# bot.py
import os
import random
import validators

import discord
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client()

@client.event
async def on_ready():
  print(f'{client.user.name} has connected to Discord!')

@client.event
async def on_message(message):
  if message.author == client.user:
    return
  
  # if validators.url(message.content):
  msg = message.content
  msgArr = msg.split()
  for x in msgArr:
    if validators.url(x):
      y = x.split('?')
      if len(y) > 1 and 'youtube' not in y[0]:
        await message.delete()
        await message.channel.send(content="wrzuc url bez tracking id (wyjeb wsio po ?)")

client.run(TOKEN)
