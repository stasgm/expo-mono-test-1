import { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, DeviceEventEmitter, ToastAndroid, Platform, TouchableOpacity } from 'react-native'

import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { selectStatus, selectError } from '../features/todos/store';
import { useAppSelector } from '../store';

const SHOW_TOAST_MESSAGE = "TEST";

interface Props {
  children: React.ReactNode
}

const colors = {
  info: '#343a40',
  success: '#28a745',
  danger: '#dc3545',
};

const Notification = () => {
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [messageType, setMessageType] = useState<keyof typeof colors>('danger');

  const timeOutRef = useRef<NodeJS.Timer | null>(null);

  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  }, []);

  const [timeOutDuration, setTimeOutDuration] = useState(5000);

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!error) {
      return;
    }

    setMessage(error);
  }, [error])

  const closeToast = useCallback(() => {
    setMessage(null);
    setTimeOutDuration(5000);
    animatedOpacity.value = withTiming(0);
    if (timeOutRef.current) {
      clearInterval(timeOutRef.current);
    }
  }, [animatedOpacity]);

  useEffect(() => {
    if (message) {
      timeOutRef.current = setInterval(() => {
        if (timeOutDuration === 0) {
          closeToast();
        } else {
          setTimeOutDuration(prev => prev - 1000);
        }
      }, 1000) ;
    }

    return () => {
      if (timeOutRef.current) {
        clearInterval(timeOutRef.current);
      }
    };
  }, [closeToast, message, timeOutDuration]);

  useEffect(() => {
    if (message) {
      animatedOpacity.value = withTiming(1, { duration: 1000 });
    }
  }, [message, animatedOpacity]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: '6%',
          left: '4%',
          right: '4%',
          backgroundColor: colors[messageType],
          zIndex: 1,
          elevation: 1,
          borderRadius: 10,
        },
        animatedStyle,
      ]}>
      <TouchableOpacity onPress={closeToast}>
        <Text
          style={{
            padding: 20,
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
          }}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Notification;
