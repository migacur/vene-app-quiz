import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


const MyGrafica = ({data}:any):React.JSX.Element => {


  return (
    <View style={styles.container}>
      {!data && <ActivityIndicator size="large" color="#F7D210" />}
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#F7D210',
          backgroundGradientFrom: '#0030AD',
          backgroundGradientTo: '#D00C27',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          formatYLabel: (yValue) => yValue.toString(),
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyGrafica;
