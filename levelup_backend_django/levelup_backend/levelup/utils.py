from datetime import datetime

def convert_timestamp_into_epoch(created_at):
    # converts iso string object to datetime object
    dt_object = datetime.fromisoformat(created_at)
    return dt_object.timestamp()


def epoch_to_readable(epoch, format="%dth %B %Y, at %H:%M %p"):
    # This method takes epoch and return datetime object
    dt_object = datetime.fromtimestamp(epoch)
    return dt_object.strftime(format)
