from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Posts, Streak
from .serializers import PostSerializer

from datetime import datetime

class CreatePostAPI(generics.CreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        today = datetime.today()
        objects = Posts.objects.filter(year=today.year, month=today.month, day=today.day)
        if objects.count() == 3:
            ser = PostSerializer(data = request.data)
            ser.is_valid(raise_exception=True)
            ser.save()
            streak_obj = Streak.objects.filter(year=today.year, month=today.month, day=today.day).first()
            if not streak_obj:
                return Response('Error occured while updating streak')
            streak_obj.count += 1
            streak_obj.save()
            return Response(ser.data)
        if objects.count() == 4:
            return Response('Enough for the day')
        return super().post(request, *args, **kwargs)


@api_view(['GET'])
def list_post_api(request):
    params = request.query_params
    year = params.get('year', None)
    month = params.get('month', None)
    day = params.get('day', None)

    post_objects = Posts.objects.filter(year=year, month=month, day=day)
    ser = PostSerializer(post_objects, many=True)
    result = {
        "code": 200,
        "data": ser.data
    }
    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def create_streak_api(request):
    today = datetime.today()
    streak_objs_today = Streak.objects.filter(year=today.year, month=today.month, day=today.day)
    streak_objs_yesterday = Streak.objects.filter(year=today.year, month=today.month, day=today.day - 1)
    today_count = streak_objs_today.count()
    yesterday_count = streak_objs_yesterday.count()
    
    print(today_count, yesterday_count)

    if today_count == 1:
        return Response('Streak Already Updated')
    elif today_count == 0:
        if yesterday_count == 1:
            # Create new record with yesterday's count
            newobj = Streak(count=streak_objs_yesterday.first().count)
        else:
            # create new record with 0 count: Restarting streak
            newobj = Streak(count=0)
        newobj.save()
    return Response('Streak Newly Updated')

@api_view(['GET'])
def get_streak(request):
    today = datetime.today()
    year, month, day = today.year, today.month, today.day
    streak = Streak.objects.filter(year=year, month=month, day=day).first()
    if not streak:
        return Response('No streak found')
    result = {
        'streak': streak.count
        }
    return Response(result)
    