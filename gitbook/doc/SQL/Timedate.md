# 日期函数

- GETDATE() 当前系统日期、时间
- DATE_ADD('2022-05-01', interval 1 day) 
  - --返回：2022-05-02 00:00:00.000
  - 在向指定日期加上一段时间的基础上，返回新的 datetime 值
- DATEDIFF(enddate, startdate,) 
  - --返回：1
  - datediff 返回跨两个指定日期的边界数
- DATEPART(month, '2004-10-15') 
  - --返回 10
  - datepart 返回代表指定日期的指定日期部分的整数
- DATENAME(weekday, '2004-10-15') 
  - --返回：星期五
  - datename 返回代表指定日期的指定日期部分的字符串
- day(), month(),year() 
  - --可以与datepart对照一下
- ==TIMESTAMPDIFF(MINUTE, start_time, end_time)==
- DATE_FORMAT(date, '%Y%m')
  - --返回指定格式的日期