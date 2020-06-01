<!--
 * @Author: LionelLc
 * @Date: 2020-05-29 18:50:56
 * @LastEditors: LionelLc
--> 

# react-clock-calendar

百日打卡日历组件

<div align="center">
  <img width="436" heigth="398" src="https://user-gold-cdn.xitu.io/2020/6/1/1726ddd9ff93d65c?w=1640&h=1626&f=png&s=116892">
</div>

## how to use

```jsx
import React from 'react';
import Calendar from 'react-clock-calendar';
import 'react-clock-calendar/dist/main/index.min.css';

const App = () => {
  const CalendarProps = {
    today: '2020-05-20',
    durationDay: ['2020-04-28', '2020-06-03'],
    initData: {
      '2020-04-28': 1,
      '2020-04-29': 1,
      '2020-04-30': 1,
      '2020-05-01': 1,
      '2020-05-02': 1,
      '2020-05-03': 1,
      '2020-05-04': 1,
      '2020-05-05': 0,
      '2020-05-06': 1,
      '2020-05-07': 1,
      '2020-05-08': 1,
      '2020-05-09': 1,
      '2020-05-10': 1,
      '2020-05-11': 1,
      '2020-05-12': 1,
      '2020-05-13': 0,
      '2020-05-14': 0,
      '2020-05-15': 1,
      '2020-05-16': 1,
      '2020-05-17': 1,
      '2020-05-18': 1,
      '2020-05-19': 1,
      '2020-05-20': 2,
    },
    prevImg: {
      active: 'https://user-gold-cdn.xitu.io/2020/6/1/1726dd5044b5b708?w=72&h=72&f=png&s=1556',
      unActive: 'https://user-gold-cdn.xitu.io/2020/6/1/1726dd580a69917a?w=72&h=72&f=png&s=1452',
    },
    nextImg: {
      active: 'https://user-gold-cdn.xitu.io/2020/6/1/1726dd5d09e9b149?w=72&h=72&f=png&s=1572',
      unActive: 'https://user-gold-cdn.xitu.io/2020/6/1/1726dd6312f7941e?w=72&h=72&f=png&s=1433',
    },
    handleCurrentDay: () => {},
  };
  return (
    <div>
      <Calendar {...CalendarProps} />
    </div>
  );
};

export default App;
```

## Props

| 属性             | 说明           | 类型 | 默认值 |
| ---------------- | -------------- | ---- | ------ |
| prevImg          | prevImg        | 必填 | 无     |
| nextImg          | nextImg        | 必填 | 无     |
| today            | 今天日期       | 必填 | 无     |
| durationDay      | 活动时间范围   | 必填 | 无     |
| initData         | 初始化日期数据 | 必填 | 无     |
| handleCurrentDay | 点击回调       | 必填 | 无     |

## 介绍

rem 布局
