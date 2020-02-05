from rest_framework.routers import SimpleRouter
from .endpoints.hosts_endpoint import HostView

api_router = SimpleRouter()

api_router.register('hosts', HostView)
