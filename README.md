#OpenEats Project

OpenEats is a recipe management site that allows users to create, share, and store recipes. This fork uses Django Rest Framework as a backend and React (with flux) as a front end. 
 
 This Code is still very much in development. Almost all the code has been rewritten; the only major thing sticking around is the database structure. If you are looking for something to use right away I suggest you use the main fork. I also have not updated the docs folder with a more complete documentation. See below if you want to use the dev version.

However if you are looking to play around with whats here so far:
* `git clone https://github.com/RyanNoelk/OpenEats.git`
* `cd openeats`
* `git checkout dev`
* Create a python virtual environment (I use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)).
* `pip install -r base/requirements.txt`

Next we need to create a `local_settings.py` file for configuring your particulate instance. Things like your secret key and database settings should go here.

Now that we have the dependencies. We need to setup the DB. The default is sqlite, which is fine for dev purposes. But if you want something a bit more robust. The current configuration should work with any database you choose to use. See the [django database docs](https://docs.djangoproject.com/en/1.10/ref/settings/#std:setting-DATABASES) for setting up your database. As a side note, please make sure that you install any additional drivers that python needs to work with the database that you choose.

Once the database is installed:
* `./manage.py makemigrations`
* `./manage.py migrate`

That should be it! you can run the dev server now to load up the api `./manage runserver`.

Load up `http://localhost:8000/api/v1/recipe/` in a browser and see the results.


The next thing we need to do is setup react. From your base dir:
* `cd frontend` 
* `npm install` (this code take a few minutes as its loading a ton of small static files)
* `npm start`
* Load `http://localhost:8080` in a browse and see the results.
