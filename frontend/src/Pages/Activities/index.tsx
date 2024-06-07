import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getActivities } from '@/apis/activities/get';
import { Activity } from '@/types/Activity';


const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const location = useLocation();

  useEffect(() => {
    getActivities()
      .then((data) => {
        if (data) {
          setActivities(data); 
        } else {
          toast.error('Unexpected response format');
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Error fetching activities');
      });
  }, [location]);

  return (
    <div>
      <h1>Activities</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>You {activity.action} a {activity.task}.</li> 
        ))}
      </ul>
    </div>
  );
};

export default Activities;
