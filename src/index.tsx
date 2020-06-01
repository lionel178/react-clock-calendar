import React, { useState, useMemo, memo } from 'react';
// import { nanoid } from 'nanoid';
import dayjs, { Dayjs } from 'dayjs';
import './index.less';

const YYYYMMDD = 'YYYY-MM-DD';
const androidReg = /android/;
const isAndroid = androidReg.test(window.navigator.userAgent.toLocaleLowerCase());

const nanoid = () => {
  return Math.random() + new Date().getTime();
};
export interface CalendarProps {
  prevImg: {
    active: string;
    unActive: string;
  };
  nextImg: {
    active: string;
    unActive: string;
  };
  today: string;
  durationDay: string[];
  initData: { [key: string]: 0 | 1 | 2 };
  handleCurrentDay: (item: any) => void;
}

const dayArr = ['日', '一', '二', '三', '四', '五', '六'];

const isDurationOrSame = (targetDay: Dayjs, durationDay: string[]) => {
  return (targetDay.isAfter(dayjs(durationDay[0])) && targetDay.isBefore(durationDay[1])) || targetDay.isSame(dayjs(durationDay[0])) || targetDay.isSame(dayjs(durationDay[1]));
};

const DateItem = memo(({ item, today, durationDay }: { item: number | Dayjs; today: Dayjs; durationDay: string[] }) => {
  if (typeof item === 'number') {
    return null;
  }

  return <div className={`trueStr ${!isDurationOrSame(item, durationDay) && 'outDuration'}`}>{item.isSame(today) ? '今天' : item.date()}</div>;
});

DateItem.displayName = 'dateItem';

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const { today: OriginToday, initData, durationDay, handleCurrentDay, prevImg, nextImg } = props;
  const today = dayjs(OriginToday);
  const [currentMonth, setCurrentMonth] = useState(today); // 当前显示的月份 (2020-04-01)
  const [activeDay, setActiveDay] = useState(today); // 当前选中的日期 (2020-05-01)
  const [canClickDay, setCanClickDay] = useState<boolean>(true); // 能否点击日期

  const handleActiveDate = (item: any) => {
    if (!canClickDay || typeof item === 'number' || !isDurationOrSame(item, durationDay)) return;
    setCanClickDay(false);
    setActiveDay(item);
    handleCurrentDay(item);
    setTimeout(() => {
      setCanClickDay(true);
    }, 350);
  };

  const currentMonthDays = useMemo(() => {
    const currentTotalDay = dayjs(currentMonth).daysInMonth(); // 当月总天数

    const currentMothStartWeekStr = dayjs(currentMonth) // 当月起始的日期是周几
      .startOf('month')
      .toDate()
      .getDay();

    const result: (number | Dayjs)[] = new Array(10).fill(0);

    for (let i = currentMothStartWeekStr, j = 0; j < currentTotalDay; i++, j++) {
      result[i] = dayjs(currentMonth).startOf('month').add(j, 'day');
    }

    for (let i = 0; i < currentMothStartWeekStr; i++) {
      result[i] = dayjs(currentMonth).startOf('month').toDate().getTime() + i;
    }
    return result;
  }, [currentMonth]);

  const [canPrev, canNext] = useMemo(() => {
    return [isDurationOrSame(currentMonth.startOf('month').subtract(1, 'day'), durationDay), isDurationOrSame(dayjs(currentMonth.endOf('month').add(1, 'day').format(YYYYMMDD)), durationDay)];
  }, [currentMonth, durationDay]);

  const prevMonth = () => {
    if (!canPrev) return;
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    if (!canNext) return;
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handleItemClass = (item: Dayjs, durationDay: any) => {
    if (item.isAfter(dayjs())) return null; // 今天之后的，不用处理负责样式了
    if (!isDurationOrSame(item, durationDay)) return null; // 时间范围外的也不用处理
    const actived = initData[item.format(YYYYMMDD)];
    const prevDay = item.subtract(1, 'day').format(YYYYMMDD);
    const nextDay = item.add(1, 'day').format(YYYYMMDD);
    const itemWeekNumber = dayjs(item).toDate().getDay();

    const isStart = itemWeekNumber === 0 || item.date() === 1;
    const isEnd = itemWeekNumber === 6 || item.date() === item.daysInMonth();
    if (actived === undefined) {
      return null;
    }
    if (actived === 1) {
      // 当天已打卡
      if (isStart) {
        // 周日
        if (initData[nextDay] === 1) {
          return 'signFirstDay';
        }
      } else if (isEnd) {
        // 周六
        if (initData[prevDay] === 1) {
          return 'signEndDay';
        }
      } else {
        if (initData[prevDay] === 1 && initData[nextDay] === 1) {
          return 'signNormalDay';
        }
        if (initData[prevDay] === 1 && initData[nextDay] !== 1) {
          return 'signEndDay';
        }
        if (initData[prevDay] !== 1 && initData[nextDay] === 1) {
          return 'signFirstDay';
        }
      }
      return 'signSingleDay';
    } else {
      if (isStart) {
        if (initData[nextDay] !== 1) {
          return 'unSignFirstDay';
        }
      } else if (isEnd) {
        if (initData[prevDay] !== 1) {
          return 'unSignEndDay';
        }
      } else {
        if (initData[prevDay] === 0 && initData[nextDay] === 0) {
          return 'unSignNormalDay';
        }
        if (initData[prevDay] === 0 && initData[nextDay] !== 0) {
          return 'unSignEndDay';
        }
        if (initData[prevDay] === 1 && initData[nextDay] === 0) {
          return 'unSignFirstDay';
        }
      }
      return 'unSignSingleDay';
    }
  };

  return (
    <div className='clockInCalendar'>
      <div className='calendarHeader'>
        <div className='titleCon'>
          <div className='mainTitle'>打卡日历 {currentMonth.month() + 1}月</div>
          <div className='subTitle'>
            百日打卡活动期限：
            {durationDay[0] ? `${dayjs(durationDay[0]).year()}.${dayjs(durationDay[0]).month() + 1}.${dayjs(durationDay[0]).date()}` : ''}-
            {durationDay[1] ? `${dayjs(durationDay[1]).year()}.${dayjs(durationDay[1]).month() + 1}.${dayjs(durationDay[1]).date()}` : ''}
          </div>
        </div>
        <div className='operatorCon'>
          <img className='operatorImg' onClick={prevMonth} src={canPrev ? prevImg.active : prevImg.unActive} alt='prev' />
          <img className='operatorImg' onClick={nextMonth} src={canNext ? nextImg.active : nextImg.unActive} alt='next' />
        </div>
      </div>
      <div className='calendarBodyHeader'>
        {dayArr.map((day) => (
          <div className='calendarBodyHeaderItem' key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className='calendarBody'>
        {currentMonthDays.map((item) => (
          <div
            className={`calendarBodyItemCon ${typeof item !== 'number' && item.isSame(activeDay) ? 'active' : ''} `}
            key={typeof item === 'number' ? nanoid() : item.format(YYYYMMDD)}
            onClick={() => {
              handleActiveDate(item);
            }}
          >
            <div className={`calendarBodyItem ${typeof item !== 'number' && handleItemClass(item, durationDay)}  ${isAndroid && 'android'}`}>
              <DateItem item={item} today={today} durationDay={durationDay} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
