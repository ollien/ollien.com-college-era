from django.db import models

class Repo(models.Model):
	name=models.TextField()
	description=models.TextField()
	sha=models.TextField()
	imagePath=models.TextField()
	