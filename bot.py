# bot.py
import os
import random

import discord
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
    
    # Noizer 251051662645526529
    # Nosek 253700474593607680
    # if message.author.id == 251051662645526529:
    response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif'
    msg = message.content.lower()
    arr = [
      'edyta',
      'edyte',
      'edytę',
      'edytą',
      'edytka',
      'eԁyta',
    ]
    for f in arr:
      if f in msg:
        await message.channel.send(response)
    
client.run(TOKEN)
