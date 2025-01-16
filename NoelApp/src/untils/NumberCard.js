import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NumberCard({ number = 0, label = '' }) {
  function numberText() {
    if (number && Math.sign(number) >= 0) {
      if (number.toString().length === 1) {
        return ("0" + number).slice(-2);
      } else {
        return number;
      }
    } else {
      return "00";
    }
  }

  const renderNumber = () => <Text style={styles.number}>{numberText()}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.numberContainer}>
          {renderNumber()}
        </View>
        <Text style={styles.label}>{label}</Text> {/* Hiển thị label */}
      </View>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D5239",
    margin: 4,
    borderRadius: 8,
    width: 60,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between", // Tách phần số và nhãn
  },
  timeContainer: {
    alignItems: 'center',
  },
  numberContainer: {
    flex: 1,
    justifyContent: "center",
  },
  number: {
    color: "#fff",
    fontSize: 30,
    top:10,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: '#740000',
    top:20
  },
});

export default NumberCard;
