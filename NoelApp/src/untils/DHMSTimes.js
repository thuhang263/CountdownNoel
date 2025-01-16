import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import NumberCard from "./NumberCard";

function DHMSTimer({ startDate, onTimerFinished }) {
  const targetTime = new Date(startDate).getTime();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const timeBetween = useMemo(() => targetTime - currentTime, [currentTime, targetTime]);

  const days = Math.max(Math.floor(timeBetween / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.floor((timeBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeBetween % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeBetween % (1000 * 60)) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeBetween <= 0) {
        clearInterval(interval);
        onTimerFinished();
      } else {
        setCurrentTime(Date.now());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeBetween, onTimerFinished]);

  return (
    <View style={styles.container}>
      <NumberCard number={days} label="DAYS" />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={hours} label="HOURS" />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={minutes} label="MINUTES" />
      <Text style={styles.colorDivider}>:</Text> 
      <NumberCard number={seconds} label="SECONDS" />
    </View>
  );
}

function EventCountdown() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();

  const handleTimerFinished = () => {
    alert("Event has started!");
  };

  const getEventDate = (month, day) => {
    let eventDate = new Date(currentYear, month - 1, day);

    if (eventDate < new Date()) {
      eventDate.setFullYear(currentYear + 1);
    }
    return eventDate.toISOString();
  };

  const isChristmasPassed = currentDate >= new Date(currentYear, 11, 25);
  return (
    <View style={styles.eventContainer}>
      {!isChristmasPassed && (
        <View style={styles.event}>
          <Text style={styles.eventName}>Countdown</Text>
          <DHMSTimer
            startDate={getEventDate(12, 25)}
            onTimerFinished={handleTimerFinished}
          />
        </View>
        
      )}
      {isChristmasPassed && (
        <>
          <View style={styles.event}>
            <Text style={styles.eventName}>Tết Nguyên Đán</Text>
            <DHMSTimer
              startDate={getEventDate(2, 10)}
              onTimerFinished={handleTimerFinished}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,  
  },
  colorDivider: {
    fontSize: 20,
    fontWeight: "bold", 
  },
  eventContainer: {
    padding: 20,   
  },
  event: {
    marginBottom: 40,
    alignItems: "center"
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:'#740000'
  },
  itemContent:{
    alignItems: "center"
  }
});

export default EventCountdown;
