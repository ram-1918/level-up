from rest_framework import serializers
from .models import Posts
from datetime import datetime
from .utils import convert_timestamp_into_epoch, epoch_to_readable

class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Posts
        exclude = ('year', 'month', 'day')
    
    def get_created_at(self, obj):
        timestamp = convert_timestamp_into_epoch(str(obj.created_at))
        readable = epoch_to_readable(timestamp)
        return readable
    
class AllPostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ('post_count_on_the_day', 'year', 'month', 'day')
        # exclude=('image', 'title', 'notes')