#!/usr/bin/env python
# encoding: utf-8

"""
WSGI config for base project.

It exposes the WSGI callable as a module-level variable named ``application``.
"""

import os
import sys

root = os.path.join(os.path.dirname(__file__), '..')
sys.path.insert(0, root)

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()

# Use for later versions of django
'''
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

application = get_wsgi_application()
'''

