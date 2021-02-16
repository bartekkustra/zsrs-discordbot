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
  print
  for x in msgArr:
    if validators.url(x):
      y = x.split('?')
      if len(y) > 1 and 'youtube' not in y[0] and 'google' not in y[0] and 'wolfram' not in y[0] and 'stackoverflow' not in y[0]:
        # https://www.gazeta.pl/?fbid=1234
        await message.delete()
        desc = "Please make sure to remove tracking ids if necessary from the url"
        embed=discord.Embed(title="Possible Tracking ID in the url", description=desc, color=0x33CC33)
        embed.set_author(name=message.author, icon_url=message.author.avatar_url)
        embed.add_field(name="Clear link", value=y[0], inline=False)
        msgAuthor = "Original message (from: " + message.author.name + ")"
        embed.add_field(name=msgAuthor, value=url_msg, inline=False)
        embed.add_field(name="Report the issue", value="https://github.com/bartekkustra/zsrs-discordbot/issues/new", inline=False)
        await message.channel.send(embed=embed)

client.run(TOKEN)
