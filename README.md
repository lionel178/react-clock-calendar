<!--
 * @Author: your name
 * @Date: 2020-05-29 18:50:56
 * @LastEditTime: 2020-05-29 19:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-calendar2/README.md
-->

# react-clock-calendar

百日打卡日历组件

## how to use

```jsx
import React from 'react';
import Calendar from 'react-clock-calendar';

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
      active: 'https://ccms-up-img.gymbo-online.com/up/img/sWrxeEgqdfdW6A3wEgKOi.png',
      unActive: 'https://ccms-up-img.gymbo-online.com/up/img/_KyyEoTQP27vll7rYnZPT.png',
    },
    nextImg: {
      active: 'https://ccms-up-img.gymbo-online.com/up/img/FCiRi2049wYwkJEdv8l2g.png',
      unActive: 'https://ccms-up-img.gymbo-online.com/up/img/eUjnQeoBQ1RAb_9JVJxu5.png',
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

## 展示

![demo](https://cdn.nlark.com/yuque/0/2020/png/236488/1590750286976-46cf8a4a-1d48-4617-a74b-874b458ea99c.png)