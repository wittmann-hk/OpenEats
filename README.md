# OpenEats Project

[![Build Status](https://travis-ci.org/RyanNoelk/OpenEats.svg?branch=master)](https://travis-ci.org/RyanNoelk/OpenEats)

OpenEats is a recipe management site that allows users to create, share, and store recipes. This fork uses Django Rest Framework as a backend and React (with flux) as a front end. 

The main goals of this project are twofold. One, I wanted a place to store my personal collection of recipes and share them with close friends and family. Two, I wanted to learn React :). I went digging around for a starting point and gathering ideas when I came across open eats. It had some cool ideas and was well documented for the most part. 

I have a lot of ideas as far as features go. But since I moved the whole UI to React and the backend to a pure API, I'm currently working on getting the core of the project stable.  The Core, in my mind, consists of a few things.

- Creating, viewing, and editing recipes.
- Browsing and searching for recipes.
- A simple homepage and about page.
 
# Running the App

The recommended way to run this app is with docker. you can install docker [here](https://www.docker.com/products/overview). If you are not familiar with docker you can read more about it on there [website](https://www.docker.com/what-docker).

If you are looking to run the app without docker, see the instructions [here](docs/Running_without_Docker.md)

### Running the app with docker for production

If you are looking to run this in production, there is no need to clone the repo. 

First, create two files:
- docker-prod.yml - This file can be found in the in the repo.
- env_prod.list - The settings file `env_stg.list` can be used as an example.

The `docker-prod.yml` contains the list of images and commands to run the app. It come with an nginx reverse proxy that by default will run on port 80. You will most likely want to change the port that nginx runs on as well as use a fix tag for the image. By default all are set to latest.

Most of the settings in your `env_prod.list` can stay the same as `env_stg.list` that is in this repo. It is highly recommended to change the django secret key when running this app. Once the files have been created run:

```bash
docker-compose -f docker-prod.yml up -d
```

### Running the app with docker for development
```bash
git clone https://github.com/RyanNoelk/OpenEats.git
cd openeats
git checkout dev
docker-compose build
docker-compose up -d
```

### First Time Setup

Regardless of if your running the app in production or development, you need to seed the database.

Run `docker-compose run --rm api bash` to open a bash shell to the API. 
```bash
./manage.py migrate
./manage.py collectstatic
./manage.py createsuperuser
./manage.py loaddata course_data.json
./manage.py loaddata cuisine_data.json
```

If you want to add some test data we can load a few recipes and some news data. This data isn't really needed unless you just wanna see how the app looks and if its working.
* `./manage.py loaddata news_data.json`
* `./manage.py loaddata recipe_data.json`
* `./manage.py loaddata ing_data.json`
* `./manage.py loaddata direction_data.json`

# Running tests

## API

API tests run in their own container with the following command (`-p tests` is to use a different prefix
from the normal containers to avoid overlap):

```bash
docker-compose -f docker-compose-test.yml -p test up -d
```

And then either see the result of the tests

```bash
docker-compose -f docker-compose-test.yml -p test logs api
````

Or to just get the response code (`0` for success/no errors):

```bash
docker wait tests_api_1
```

To avoid the docker startup overhead or for more fine-grained control of which tests to run:

```bash
docker-compose -f docker-compose-test.yml -p test run --rm api bash
./tests.sh # Optional DB reset
./manage.py test -k
```

# Contributing

All contributions are welcome! If you are are having an problem or find a bug please create an issue in github. If you would like to contribute, feel free to grab any unassigned issue with github issues.
