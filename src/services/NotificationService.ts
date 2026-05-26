import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';

export const setupNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'scheduly-default',
    name: 'Scheduly Notifikasi',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
};

export const scheduleNotification = async (
  title: string,
  body: string,
  timestamp: number,
  id: string
) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp,
    alarmManager: true,
  };
  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: { channelId: 'scheduly-default', pressAction: { id: 'default' } },
    },
    trigger
  );
};