from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .models import *
from .serializers import *
# Create your views here.


@api_view(['GET', 'POST'])
def students_list(request):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        paginator.page_size = request.GET['amount']
        students = Student.objects.all()
        paginated_students = paginator.paginate_queryset(students, request)
        seializer = StudentSerializer(
            paginated_students, context={'request': request}, many=True)
        return paginator.get_paginated_response(seializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def students_update(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = StudentSerializer(student, data=request.data)

    if request.method == 'PUT':
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
