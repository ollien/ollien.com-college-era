from django.core.management.base import BaseCommand,  CommandError
from ... import githubScreenshots
from ...models import Repo
from ... import configReader
import requests
from shutil import copyfileobj
import os.path
from os import listdir
import titlecase

BASE_DIR = os.path.dirname(__file__)

exceptions = {
	"Bittorrent": "BitTorrent"
}

class Command(BaseCommand):
	help = "Runs a script that grabs screenshots from github.com/ollien/"
	def __init__(self):
		super(Command, self).__init__()
		self.config = configReader.ConfigReader(os.path.join(BASE_DIR, "../../config.txt"))
		self.keys = self.config.getKeys() 
		self.github = githubScreenshots.GithubScreenshots(self.keys['token'])
	def handle(self, *args, **kwargs):
		repos = self.github.getRepos('ollien')
		if type(repos)!=list:
			raise Exception("Github returned statuscode "+str(repos))
		for repo in repos:
			repoName = titlecase.titlecase(repo['name'])
			for word in repoName:
				if word in exceptions:
					repoName = repoName.replace(word, exceptions[word])
			repoDesc = repo['description']
			repoUrl = repo['html_url']
			screenshot = self.github.getFile("README_SCREENSHOT.png", 'ollien', repoName)
			if (type(screenshot)!=dict):
				if screenshot==404:
					continue
				raise Exception("Github returned status code "+str(screenshot))
			try:
				repo = Repo.objects.get(name=repoName)
			except Repo.DoesNotExist:
				repo = None
			screenshotUrl = screenshot['download_url']
			sha = screenshot['sha']					
			if repo != None:
				if repo.description!=repoDesc:
					repo.description=repoDesc
				if repo.sha==sha:
					continue
				else:
					repo.sha=sha
					self.downloadToPath(screenshotUrl, os.path.join(self.keys['saveLocation'], sha+".png"))
					repo.imagePath=os.path.join(self.keys['webLocation'], sha+".png")
					repo.save()
			else:
				self.downloadToPath(screenshotUrl, os.path.join(self.keys['saveLocation'], sha+".png"))
				Repo(name=repoName, description=repoDesc, sha=sha, imagePath=os.path.join(self.keys['webLocation'], sha+".png"), url=repoUrl).save()				

	def downloadToPath(self, url, path):
		r = requests.get(url, stream=True)
		with open(path, 'wb') as f:
			r.raw.decode_content=True
			copyfileobj(r.raw, f)
		r.close()
