from django.core.management.base import BaseCommand, CommandError
from ... import githubScreenshots
class Command(BaseCommand):
    help = "Runs a script that grabs screenshots from github.com/ollien/"
    def __init__(self):
        super(Command,self).__init__()
        self.github = githubScreenshots.GithubScreenshots()
    def handle(self,*args,**kwargs):
        print "Running!"