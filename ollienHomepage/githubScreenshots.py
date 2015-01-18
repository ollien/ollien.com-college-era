import requests
import json

class GithubScreenshots(object):
    def __init__(self):
        self.header = {"Accept:":"application/vnd.github.v3+json"}
    def getRepos(self,user):
        r = requests.get("https://api.github.com/users/%s/repos"%(user,),headers=self.header)
        if r.status_code==200:
            return json.loads(r.text)
        return r.status_code

    def getFile(self,fileName,user,repoName):
        r = requests.get("https://api.github.com/repos/%s/%s/contents/%s"%(user,repoName,fileName),headers=self.header)
        if r.status_code==200:
            return json.loads(r.text)
        return r.status_code
    
    def getCommits(self,user,repoName):
        r = requests.get("https://api.github.com/repos/%s/%s/commits"%(user,repoName),headers=self.header)
        if r.status_code==200:
            return json.loads(r.text)
        return r.status_code
        
    def getCommit(self,user,repoName,hash):
        r = requests.get("https://api.github.com/repos/%s/%s/commits/%s"%(user,repoName,hash),headers=self.header)
        if r.status_code==200:
            return json.loads(r.text)
        return r.status_code
    def getChangedFiles(self,commitLog=None,user=None,repoName=None,hash=None):
        if commitLog != None:
            return [item['filename'] for item in commitLog['files']]
        elif user != None and repoName != None and hash !=None:
            r = requests.get("https://api.github.com/repos/%s/%s/commits/%s"%(user,repoName,hash),headers=self.header)
            if r.status_code==200:
                result = json.loads(r.text)
                return [item['filename'] for item in result['files']]
            return r.status_code
        return None            
        