from rest_framework import serializers
from .models import Posts
from datetime import datetime

def convert_timestamp_into_epoch(created_at):
    # converts iso string object to datetime object
    dt_object = datetime.fromisoformat(created_at)
    return dt_object.timestamp()


def epoch_to_readable(epoch, format="%dth %B %Y, at %H:%M %p"):
    # This method takes epoch and return datetime object
    dt_object = datetime.fromtimestamp(epoch)
    return dt_object.strftime(format)

class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Posts
        exclude = ('year', 'month', 'day')
    
    def get_created_at(self, obj):
        timestamp = convert_timestamp_into_epoch(str(obj.created_at))
        readable = epoch_to_readable(timestamp)
        return readable
    

