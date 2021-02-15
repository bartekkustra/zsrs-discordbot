# bot.py
import os
import random

import discord
import validators
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client()

@client.event
async def on_ready():
  print(f'{client.user.name} has connected to Discord!')

@client.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm_channel.send(
        f'Hi {member.name}, welcome to my Discord server!'
    )

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    
    # edyta
    response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif'
    edyta_msg = message.content.lower()
    arr = [
      'edyta',
      'edyte',
      'edytę',
      'edytą',
      'edytka',
      'eԁyta',
    ]
    for f in arr:
      if f in edyta_msg:
        await message.channel.send(response)

    # url
    url_msg = message.content
    msgArr = url_msg.split()
    for x in msgArr:
      if validators.url(x):
        y = x.split('?')
        if len(y) > 1 and 'youtube' not in y[0] and 'google' not in y[0]:
          await message.delete()
          await message.channel.send(content="wrzuc url bez tracking id (wyjeb wsio po ?)")
  

    
client.run(TOKEN)
