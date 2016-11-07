#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import permissions


# TODO: this code is duplicated in other apps.
# It should be moved to a common app.

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to admins or owners.
        return obj.author == request.user or request.user.is_staff
