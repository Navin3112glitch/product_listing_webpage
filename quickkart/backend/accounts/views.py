from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status

from .serializers import RegisterSerializer


# User Registration
class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# User Login
class LoginView(ObtainAuthToken):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'message': 'Login successful'
        })


# User Logout
class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        request.user.auth_token.delete()

        return Response({
            'message': 'Logout successful'
        })


# Protected User Profile
class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({
            'user_id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'message': 'You are authenticated!'
        })