from datetime import datetime, timedelta, time
import pytz
import math

# Sample data: [(timezone_name, weight, working_hour_start, working_hour_end)]
people = [
    ('US/Eastern', 1, time(8, 0), time(16, 0)),
    ('Europe/London', 2, time(8, 0), time(16, 0)),
    ('Asia/Tokyo', 1.5, time(8, 0), time(16, 0)),
]

tp = sum(p[1] for p in people)

def time_to_minutes(t: time):
    return t.hour * 60 + t.minute

def inaccuracy(local_time_min, w_start, w_end):
    start_min = time_to_minutes(w_start)
    end_min = time_to_minutes(w_end)
    if start_min <= local_time_min <= end_min:
        return 0
    elif local_time_min < start_min:
        return start_min - local_time_min
    else:
        return local_time_min - end_min

def evaluate_flaw(utc_time_min):
    utc_base = datetime(2024, 1, 1) + timedelta(minutes=utc_time_min)
    total_flaw = 0
    for tz_name, p, w_start, w_end in people:
        tz = pytz.timezone(tz_name)
        local_time = utc_base.astimezone(tz).time()
        local_min = time_to_minutes(local_time)
        i = inaccuracy(local_min, w_start, w_end)
        total_flaw += (i ** 2) * p
    return total_flaw

# Try all 288 5-minute intervals in a day
best_flaw = float('inf')
best_time = None

for t in range(0, 1440, 5):  # 1440 minutes/day
    flaw = evaluate_flaw(t)
    if flaw < best_flaw:
        best_flaw = flaw
        best_time = t

# Convert best_time in minutes to UTC time
best_utc_time = time(best_time // 60, best_time % 60)
print(f"Best UTC time: {best_utc_time}, Flaw Score: {best_flaw:.2f}")
