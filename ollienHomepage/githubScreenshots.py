#!/usr/bin/env python
import requests
import json
import sys
import MySQLdb

class GithubScreenshots(object):
	def __init__(self,token):
		self.header = {"Accept:":"application/vnd.github.v3+json"}
		self.token=token
	def getRepos(self,user,per_page=1000):
		r = requests.get("https://api.github.com/users/%s/repos"%(user,),headers=self.header,auth=(self.token,'x-oauth-basic'),params={'per_page':per_page})
		if r.status_code==200:
			return json.loads(r.text)
		return r.status_code

	def getFile(self,fileName,user,repoName):
		r = requests.get("https://api.github.com/repos/%s/%s/contents/%s"%(user,repoName,fileName),headers=self.header,auth=(self.token,'x-oauth-basic'))
		if r.status_code==200:
			return json.loads(r.text)
		return r.status_code
